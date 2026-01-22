/**
 * Foundation Backend Server
 * Express API server voor gebruikers en donaties
 */

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
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
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

// Serve frontend dist files
app.use(express.static(path.join(__dirname, '../dist')));

// Database connection
const dbPath = path.join(__dirname, 'database', 'foundation.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Helper function to generate JWT token
function generateToken(userId, role) {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '24h' });
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Middleware to check admin role
function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

// ============================================
// Authentication Routes
// ============================================

// Admin Login
app.post('/api/auth/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    db.get(
        'SELECT * FROM users WHERE email = ? AND role = ?',
        [email, 'admin'],
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

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
        }
    );
});

// User Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

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
        }
    );
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
        db.get(
            'SELECT * FROM users WHERE email = ? OR (oauth_provider = ? AND oauth_id = ?)',
            [email, 'google', id],
            (err, user) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                if (user) {
                    // Update OAuth info if needed
                    if (!user.oauth_provider) {
                        db.run(
                            'UPDATE users SET oauth_provider = ?, oauth_id = ?, email_verified = 1 WHERE id = ?',
                            ['google', id, user.id],
                            () => {}
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
                    db.run(
                        'INSERT INTO users (name, email, oauth_provider, oauth_id, email_verified, newsletter_subscribed) VALUES (?, ?, ?, ?, 1, 0)',
                        [name, email, 'google', id],
                        function(err) {
                            if (err) {
                                return res.status(500).json({ error: 'Database error' });
                            }

                            const token = generateToken(this.lastID, 'user');
                            res.json({
                                success: true,
                                token,
                                user: {
                                    id: this.lastID,
                                    email,
                                    name,
                                    role: 'user',
                                    email_verified: true
                                }
                            });
                        }
                    );
                }
            }
        );
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
        db.get(
            'SELECT * FROM users WHERE email = ? OR (oauth_provider = ? AND oauth_id = ?)',
            [email, 'facebook', id],
            (err, user) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                if (user) {
                    // Update OAuth info if needed
                    if (!user.oauth_provider) {
                        db.run(
                            'UPDATE users SET oauth_provider = ?, oauth_id = ?, email_verified = 1 WHERE id = ?',
                            ['facebook', id, user.id],
                            () => {}
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
                    db.run(
                        'INSERT INTO users (name, email, oauth_provider, oauth_id, email_verified, newsletter_subscribed) VALUES (?, ?, ?, ?, 1, 0)',
                        [name, email, 'facebook', id],
                        function(err) {
                            if (err) {
                                return res.status(500).json({ error: 'Database error' });
                            }

                            const token = generateToken(this.lastID, 'user');
                            res.json({
                                success: true,
                                token,
                                user: {
                                    id: this.lastID,
                                    email,
                                    name,
                                    role: 'user',
                                    email_verified: true
                                }
                            });
                        }
                    );
                }
            }
        );
    } catch (error) {
        console.error('Facebook OAuth error:', error.response?.data || error);
        res.status(500).json({ error: 'OAuth authentication failed' });
    }
});

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

    db.run(
        'INSERT INTO users (name, email, password_hash, newsletter_subscribed, email_verified) VALUES (?, ?, ?, ?, 0)',
        [name, email, passwordHash, newsletterSubscribed],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Email already registered' });
                }
                return res.status(500).json({ error: 'Database error' });
            }

            const userId = this.lastID;

            // Save verification token
            db.run(
                'INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)',
                [userId, verificationToken, expiresAt.toISOString()],
                async (err) => {
                    if (err) {
                        console.error('Error saving verification token:', err);
                    } else {
                        // Send verification email
                        await sendVerificationEmail(email, name, verificationToken);
                    }
                }
            );

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
        }
    );
});

// Email Verification
app.get('/api/auth/verify-email', (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'Verification token required' });
    }

    db.get(
        'SELECT * FROM email_verifications WHERE token = ? AND verified = 0',
        [token],
        (err, verification) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!verification) {
                return res.status(400).json({ error: 'Invalid or expired verification token' });
            }

            // Check if token expired
            const expiresAt = new Date(verification.expires_at);
            if (expiresAt < new Date()) {
                return res.status(400).json({ error: 'Verification token expired' });
            }

            // Mark email as verified
            db.run(
                'UPDATE users SET email_verified = 1 WHERE id = ?',
                [verification.user_id],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }

                    // Mark verification token as used
                    db.run(
                        'UPDATE email_verifications SET verified = 1 WHERE id = ?',
                        [verification.id],
                        () => {}
                    );

                    res.json({
                        success: true,
                        message: 'Email successfully verified!'
                    });
                }
            );
        }
    );
});

// Resend Verification Email
app.post('/api/auth/resend-verification', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }

    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.email_verified) {
                return res.status(400).json({ error: 'Email already verified' });
            }

            const verificationToken = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

            // Delete old tokens
            db.run(
                'DELETE FROM email_verifications WHERE user_id = ?',
                [user.id],
                () => {
                    // Save new token
                    db.run(
                        'INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)',
                        [user.id, verificationToken, expiresAt.toISOString()],
                        async (err) => {
                            if (err) {
                                return res.status(500).json({ error: 'Database error' });
                            }

                            await sendVerificationEmail(user.email, user.name, verificationToken);
                            res.json({
                                success: true,
                                message: 'Verification email sent!'
                            });
                        }
                    );
                }
            );
        }
    );
});

// ============================================
// Donation Routes
// ============================================

// Create Donation
app.post('/api/donations', authenticateToken, (req, res) => {
    const { amount, donation_type, country_code, project_id, notes } = req.body;
    const userId = req.user.userId;

    if (!amount || !donation_type) {
        return res.status(400).json({ error: 'Amount and donation type required' });
    }

    db.run(
        `INSERT INTO donations (user_id, amount, donation_type, country_code, project_id, notes, status)
         VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
        [userId, amount, donation_type, country_code || null, project_id || null, notes || null],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            const donationId = this.lastID;

            // Create transaction record
            db.run(
                `INSERT INTO donation_transactions (donation_id, transaction_type, amount, project_id, description)
                 VALUES (?, 'received', ?, ?, ?)`,
                [donationId, amount, project_id || null, 'Donation received'],
                (err) => {
                    if (err) {
                        console.error('Error creating transaction:', err);
                    }
                }
            );

            // Update project current_amount if project_id is provided
            if (project_id) {
                db.run(
                    'UPDATE projects SET current_amount = current_amount + ? WHERE id = ?',
                    [amount, project_id],
                    (err) => {
                        if (err) {
                            console.error('Error updating project amount:', err);
                        }
                    }
                );
            }

            // Update donation status to completed (in real scenario, this would be done after payment confirmation)
            db.run(
                'UPDATE donations SET status = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
                ['completed', donationId],
                (err) => {
                    if (err) {
                        console.error('Error updating donation status:', err);
                    }
                }
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
        }
    );
});

// Get User Donations
app.get('/api/donations/my', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    db.all(
        `SELECT d.*, p.name AS project_name, p.country_code AS project_country
         FROM donations d
         LEFT JOIN projects p ON d.project_id = p.id
         WHERE d.user_id = ?
         ORDER BY d.created_at DESC`,
        [userId],
        (err, donations) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ success: true, donations });
        }
    );
});

// Get All Donations (Admin only)
app.get('/api/donations', authenticateToken, requireAdmin, (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    db.all(
        `SELECT d.*, u.name AS user_name, u.email AS user_email, p.name AS project_name
         FROM donations d
         LEFT JOIN users u ON d.user_id = u.id
         LEFT JOIN projects p ON d.project_id = p.id
         ORDER BY d.created_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, donations) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            db.get(
                'SELECT COUNT(*) as total FROM donations',
                [],
                (err, count) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }

                    res.json({
                        success: true,
                        donations,
                        total: count.total,
                        limit,
                        offset
                    });
                }
            );
        }
    );
});

// Get Donation Statistics
app.get('/api/donations/stats', authenticateToken, requireAdmin, (req, res) => {
    db.all(
        `SELECT 
            COUNT(*) as total_donations,
            SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_amount,
            SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_amount,
            SUM(CASE WHEN donation_type = 'monthly' THEN amount ELSE 0 END) as monthly_amount,
            SUM(CASE WHEN donation_type = 'yearly' THEN amount ELSE 0 END) as yearly_amount
         FROM donations`,
        [],
        (err, stats) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ success: true, stats: stats[0] });
        }
    );
});

// ============================================
// Project Routes
// ============================================

// Get All Projects
app.get('/api/projects', (req, res) => {
    // Get all projects first
    db.all(
        `SELECT * FROM projects ORDER BY created_at DESC`,
        [],
        (err, projects) => {
            if (err) {
                console.error('Error fetching projects:', err);
                return res.status(500).json({ error: 'Database error', details: err.message });
            }

            if (!projects || projects.length === 0) {
                return res.json({ success: true, projects: [] });
            }

            // Get stats for each project
            const projectsWithStats = [];
            let processed = 0;

            projects.forEach((project) => {
                // Get donation stats
                db.get(
                    `SELECT 
                        COUNT(*) as donation_count,
                        COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_received
                     FROM donations
                     WHERE project_id = ?`,
                    [project.id],
                    (err, donationStats) => {
                        if (err) {
                            console.error(`Error getting donation stats for project ${project.id}:`, err);
                            donationStats = { donation_count: 0, total_received: 0 };
                        }

                        // Get transaction stats
                        db.get(
                            `SELECT 
                                COALESCE(SUM(CASE WHEN transaction_type = 'sent_to_project' THEN amount ELSE 0 END), 0) as total_sent
                             FROM donation_transactions
                             WHERE project_id = ?`,
                            [project.id],
                            (err, transStats) => {
                                if (err) {
                                    console.error(`Error getting transaction stats for project ${project.id}:`, err);
                                    transStats = { total_sent: 0 };
                                }

                                projectsWithStats.push({
                                    ...project,
                                    donation_count: donationStats.donation_count || 0,
                                    total_received: donationStats.total_received || 0,
                                    total_sent: transStats.total_sent || 0
                                });

                                processed++;
                                if (processed === projects.length) {
                                    res.json({ success: true, projects: projectsWithStats });
                                }
                            }
                        );
                    }
                );
            });
        }
    );
});

// Get Project by ID
app.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;

    db.get(
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
        [projectId],
        (err, project) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json({ success: true, project });
        }
    );
});

// ============================================
// User Routes (Admin only)
// ============================================

// Get All Users
app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    db.all(
        `SELECT id, email, name, role, newsletter_subscribed, created_at
         FROM users
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, users) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            db.get(
                'SELECT COUNT(*) as total FROM users',
                [],
                (err, count) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }

                    res.json({
                        success: true,
                        users,
                        total: count.total,
                        limit,
                        offset
                    });
                }
            );
        }
    );
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes (SPA catch-all)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});

