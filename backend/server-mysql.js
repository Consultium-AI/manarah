/**
 * Foundation Backend Server - MySQL Version
 * Express API server voor gebruikers en donaties met MySQL database
 */

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// MySQL Database connection pool
// Support both connection string and individual parameters
let dbConfig;

if (process.env.DB_CONNECTION_STRING) {
    // Use connection string if provided (format: mysql://user:password@host:port/database)
    dbConfig = process.env.DB_CONNECTION_STRING;
} else {
    // Use individual parameters
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'stichting',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
}

const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection error:', err.message);
        process.exit(1);
    });

// Email transporter (configureer in .env)
const emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Google OAuth config
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Facebook OAuth config
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Helper function to generate JWT token
function generateToken(userId, role) {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '24h' });
}

// Middleware to verify JWT token
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

// Middleware to check admin role
function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

// Helper function to send verification email
async function sendVerificationEmail(email, name, token) {
    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@foundation.org',
        to: email,
        subject: 'Verifieer je emailadres - Foundation',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welkom bij Foundation, ${name}!</h2>
                <p>Bedankt voor je registratie. Klik op de onderstaande knop om je emailadres te verifiëren:</p>
                <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #e63946; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">Verifieer emailadres</a>
                <p>Of kopieer en plak deze link in je browser:</p>
                <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
                <p style="color: #666; font-size: 12px; margin-top: 30px;">Deze link is 24 uur geldig.</p>
            </div>
        `
    };

    try {
        await emailTransporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// ============================================
// Authentication Routes
// ============================================

// Admin Login
app.post('/api/auth/admin/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ? AND role = ?',
            [email, 'admin']
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        if (!bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id, user.role);

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Check if user has password (OAuth users don't have passwords)
        if (!user.password_hash) {
            return res.status(401).json({ error: 'Please login with your social account' });
        }

        if (!bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check email verification for non-OAuth users
        if (!user.email_verified && !user.oauth_provider) {
            return res.status(403).json({ 
                error: 'Email not verified',
                requiresVerification: true,
                email: user.email
            });
        }

        const token = generateToken(user.id, user.role);

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                email_verified: user.email_verified
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, newsletter } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const newsletterSubscribed = newsletter ? 1 : 0;
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    try {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash, newsletter_subscribed, email_verified) VALUES (?, ?, ?, ?, 0)',
            [name, email, passwordHash, newsletterSubscribed]
        );

        const userId = result.insertId;

        // Save verification token
        await pool.query(
            'INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)',
            [userId, verificationToken, expiresAt]
        );

        // Send verification email
        await sendVerificationEmail(email, name, verificationToken);

        res.status(201).json({
            success: true,
            message: 'Account aangemaakt! Controleer je email om je account te verifiëren.',
            requiresVerification: true,
            user: {
                id: userId,
                email,
                name,
                role: 'user',
                email_verified: false
            }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already registered' });
        }
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Email Verification
app.get('/api/auth/verify-email', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'Verification token required' });
    }

    try {
        const [verifications] = await pool.query(
            'SELECT * FROM email_verifications WHERE token = ? AND verified = 0',
            [token]
        );

        if (verifications.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired verification token' });
        }

        const verification = verifications[0];

        // Check if token expired
        const expiresAt = new Date(verification.expires_at);
        if (expiresAt < new Date()) {
            return res.status(400).json({ error: 'Verification token expired' });
        }

        // Mark email as verified
        await pool.query(
            'UPDATE users SET email_verified = 1 WHERE id = ?',
            [verification.user_id]
        );

        // Mark verification token as used
        await pool.query(
            'UPDATE email_verifications SET verified = 1 WHERE id = ?',
            [verification.id]
        );

        res.json({
            success: true,
            message: 'Email successfully verified!'
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Resend Verification Email
app.post('/api/auth/resend-verification', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }

    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];

        if (user.email_verified) {
            return res.status(400).json({ error: 'Email already verified' });
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Delete old tokens
        await pool.query(
            'DELETE FROM email_verifications WHERE user_id = ?',
            [user.id]
        );

        // Save new token
        await pool.query(
            'INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)',
            [user.id, verificationToken, expiresAt]
        );

        await sendVerificationEmail(user.email, user.name, verificationToken);
        res.json({
            success: true,
            message: 'Verification email sent!'
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Google OAuth - Get redirect URL
app.get('/api/auth/google/url', (req, res) => {
    if (!GOOGLE_CLIENT_ID) {
        return res.status(500).json({ error: 'Google OAuth not configured' });
    }
    
    const redirectUri = `${FRONTEND_URL}/auth/google/callback`;
    const scope = 'openid email profile';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
    
    res.json({ url });
});

// Google OAuth - Callback
app.post('/api/auth/google/callback', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code required' });
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `${FRONTEND_URL}/auth/google/callback`
        });

        const { access_token } = tokenResponse.data;

        // Get user info from Google
        const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const { id, email, name, picture } = userResponse.data;

        // Check if user exists
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR (oauth_provider = ? AND oauth_id = ?)',
            [email, 'google', id]
        );

        if (users.length > 0) {
            const user = users[0];
            // Update OAuth info if needed
            if (!user.oauth_provider) {
                await pool.query(
                    'UPDATE users SET oauth_provider = ?, oauth_id = ?, email_verified = 1 WHERE id = ?',
                    ['google', id, user.id]
                );
            }

            const token = generateToken(user.id, user.role);
            res.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    email_verified: true
                }
            });
        } else {
            // Create new user
            const [result] = await pool.query(
                'INSERT INTO users (name, email, oauth_provider, oauth_id, email_verified, newsletter_subscribed) VALUES (?, ?, ?, ?, 1, 0)',
                [name, email, 'google', id]
            );

            const token = generateToken(result.insertId, 'user');
            res.json({
                success: true,
                token,
                user: {
                    id: result.insertId,
                    email,
                    name,
                    role: 'user',
                    email_verified: true
                }
            });
        }
    } catch (error) {
        console.error('Google OAuth error:', error);
        res.status(500).json({ error: 'OAuth authentication failed' });
    }
});

// Facebook OAuth - Get redirect URL
app.get('/api/auth/facebook/url', (req, res) => {
    if (!FACEBOOK_APP_ID) {
        return res.status(500).json({ error: 'Facebook OAuth not configured' });
    }
    
    const redirectUri = `${FRONTEND_URL}/auth/facebook/callback`;
    const scope = 'email';
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
    
    res.json({ url });
});

// Facebook OAuth - Callback
app.post('/api/auth/facebook/callback', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code required' });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
            params: {
                client_id: FACEBOOK_APP_ID,
                client_secret: FACEBOOK_APP_SECRET,
                code,
                redirect_uri: `${FRONTEND_URL}/auth/facebook/callback`
            }
        });

        const { access_token } = tokenResponse.data;

        // Get user info from Facebook
        const userResponse = await axios.get('https://graph.facebook.com/v18.0/me', {
            params: {
                fields: 'id,name,email',
                access_token
            }
        });

        const { id, email, name } = userResponse.data;

        if (!email) {
            return res.status(400).json({ error: 'Email permission required' });
        }

        // Check if user exists
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR (oauth_provider = ? AND oauth_id = ?)',
            [email, 'facebook', id]
        );

        if (users.length > 0) {
            const user = users[0];
            // Update OAuth info if needed
            if (!user.oauth_provider) {
                await pool.query(
                    'UPDATE users SET oauth_provider = ?, oauth_id = ?, email_verified = 1 WHERE id = ?',
                    ['facebook', id, user.id]
                );
            }

            const token = generateToken(user.id, user.role);
            res.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    email_verified: true
                }
            });
        } else {
            // Create new user
            const [result] = await pool.query(
                'INSERT INTO users (name, email, oauth_provider, oauth_id, email_verified, newsletter_subscribed) VALUES (?, ?, ?, ?, 1, 0)',
                [name, email, 'facebook', id]
            );

            const token = generateToken(result.insertId, 'user');
            res.json({
                success: true,
                token,
                user: {
                    id: result.insertId,
                    email,
                    name,
                    role: 'user',
                    email_verified: true
                }
            });
        }
    } catch (error) {
        console.error('Facebook OAuth error:', error.response?.data || error);
        res.status(500).json({ error: 'OAuth authentication failed' });
    }
});

// ============================================
// Donation Routes
// ============================================

// Create Donation
app.post('/api/donations', authenticateToken, async (req, res) => {
    const { amount, donation_type, country_code, project_id, notes } = req.body;
    const userId = req.user.userId;

    if (!amount || !donation_type) {
        return res.status(400).json({ error: 'Amount and donation type required' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO donations (user_id, amount, donation_type, country_code, project_id, notes, status)
             VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
            [userId, amount, donation_type, country_code || null, project_id || null, notes || null]
        );

        const donationId = result.insertId;

        // Create transaction record
        await pool.query(
            `INSERT INTO donation_transactions (donation_id, transaction_type, amount, project_id, description)
             VALUES (?, 'received', ?, ?, ?)`,
            [donationId, amount, project_id || null, 'Donation received']
        );

        // Update project current_amount if project_id is provided
        if (project_id) {
            await pool.query(
                'UPDATE projects SET current_amount = current_amount + ? WHERE id = ?',
                [amount, project_id]
            );
        }

        // Update donation status to completed (in real scenario, this would be done after payment confirmation)
        await pool.query(
            'UPDATE donations SET status = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
            ['completed', donationId]
        );

        res.status(201).json({
            success: true,
            donation: {
                id: donationId,
                amount,
                donation_type,
                status: 'completed'
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get User Donations
app.get('/api/donations/my', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const [donations] = await pool.query(
            `SELECT d.*, p.name AS project_name, p.country_code AS project_country
             FROM donations d
             LEFT JOIN projects p ON d.project_id = p.id
             WHERE d.user_id = ?
             ORDER BY d.created_at DESC`,
            [userId]
        );

        res.json({ success: true, donations });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get All Donations (Admin only)
app.get('/api/donations', authenticateToken, requireAdmin, async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const [donations] = await pool.query(
            `SELECT d.*, u.name AS user_name, u.email AS user_email, p.name AS project_name
             FROM donations d
             LEFT JOIN users u ON d.user_id = u.id
             LEFT JOIN projects p ON d.project_id = p.id
             ORDER BY d.created_at DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM donations');
        const total = countResult[0].total;

        res.json({
            success: true,
            donations,
            total,
            limit,
            offset
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get Donation Statistics
app.get('/api/donations/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const [stats] = await pool.query(
            `SELECT 
                COUNT(*) as total_donations,
                SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_amount,
                SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_amount,
                SUM(CASE WHEN donation_type = 'monthly' THEN amount ELSE 0 END) as monthly_amount,
                SUM(CASE WHEN donation_type = 'yearly' THEN amount ELSE 0 END) as yearly_amount
             FROM donations`
        );

        res.json({ success: true, stats: stats[0] });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============================================
// Project Routes
// ============================================

// Get All Projects
app.get('/api/projects', async (req, res) => {
    try {
        // Simplified query - get projects first, then stats separately
        const [projects] = await pool.query(
            `SELECT * FROM projects ORDER BY created_at DESC`
        );

        // Get donation stats for each project
        const projectsWithStats = await Promise.all(
            projects.map(async (project) => {
                try {
                    // Get donation count and total received
                    const [donationStats] = await pool.query(
                        `SELECT 
                            COUNT(*) as donation_count,
                            COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_received
                         FROM donations
                         WHERE project_id = ?`,
                        [project.id]
                    );

                    // Get total sent
                    const [transactionStats] = await pool.query(
                        `SELECT 
                            COALESCE(SUM(CASE WHEN transaction_type = 'sent_to_project' THEN amount ELSE 0 END), 0) as total_sent
                         FROM donation_transactions
                         WHERE project_id = ?`,
                        [project.id]
                    );

                    const stats = donationStats[0] || { donation_count: 0, total_received: 0 };
                    const transStats = transactionStats[0] || { total_sent: 0 };

                    return {
                        ...project,
                        donation_count: parseInt(stats.donation_count) || 0,
                        total_received: parseFloat(stats.total_received) || 0,
                        total_sent: parseFloat(transStats.total_sent) || 0
                    };
                } catch (err) {
                    console.error(`Error getting stats for project ${project.id}:`, err);
                    // Return project with zero stats if there's an error
                    return {
                        ...project,
                        donation_count: 0,
                        total_received: 0,
                        total_sent: 0
                    };
                }
            })
        );

        res.json({ success: true, projects: projectsWithStats });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error', details: error.message });
    }
});

// Get Project by ID
app.get('/api/projects/:id', async (req, res) => {
    const projectId = req.params.id;

    try {
        const [projects] = await pool.query(
            `SELECT 
                p.*,
                COUNT(d.id) as donation_count,
                SUM(CASE WHEN d.status = 'completed' THEN d.amount ELSE 0 END) as total_received,
                SUM(CASE WHEN dt.transaction_type = 'sent_to_project' THEN dt.amount ELSE 0 END) as total_sent
             FROM projects p
             LEFT JOIN donations d ON d.project_id = p.id
             LEFT JOIN donation_transactions dt ON dt.donation_id = d.id AND dt.project_id = p.id
             WHERE p.id = ?
             GROUP BY p.id`,
            [projectId]
        );

        if (projects.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ success: true, project: projects[0] });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============================================
// User Routes (Admin only)
// ============================================

// Get All Users
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const [users] = await pool.query(
            `SELECT id, email, name, role, newsletter_subscribed, created_at
             FROM users
             ORDER BY created_at DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM users');
        const total = countResult[0].total;

        res.json({
            success: true,
            users,
            total,
            limit,
            offset
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await pool.end();
    console.log('Database connection pool closed.');
    process.exit(0);
});

