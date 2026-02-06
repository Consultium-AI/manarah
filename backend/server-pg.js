/**
 * Foundation Backend Server - PostgreSQL Version
 * For deployment on Render.com
 */

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
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
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://consultium-ai.github.io/manarah';

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('PostgreSQL pool error:', err);
});

// Email transporter
const emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// OAuth config
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// CORS - Allow GitHub Pages and local development
const allowedOrigins = [
    'https://consultium-ai.github.io',
    'http://localhost:5173',
    'http://localhost:3000',
    FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc)
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            return callback(null, true);
        }
        // In production, still allow for flexibility
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

// Serve frontend dist files (if available)
app.use(express.static(path.join(__dirname, '../dist')));

// ============================================
// Helper functions
// ============================================

function generateToken(userId, role) {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '24h' });
}

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

function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

async function sendVerificationEmail(email, name, token) {
    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@stichtingmanarah.nl',
        to: email,
        subject: 'Verifieer je emailadres - Stichting Manarah',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welkom bij Stichting Manarah, ${name}!</h2>
                <p>Bedankt voor je registratie. Klik op de onderstaande knop om je emailadres te verifiëren:</p>
                <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563EB; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Verifieer emailadres</a>
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
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'admin']);
        const user = result.rows[0];

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
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (err) {
        console.error('Admin login error:', err);
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
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!user.password_hash) {
            return res.status(401).json({ error: 'Please login with your social account' });
        }

        if (!bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

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
                id: user.id, email: user.email, name: user.name,
                role: user.role, email_verified: user.email_verified
            }
        });
    } catch (err) {
        console.error('Login error:', err);
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
    if (!code) return res.status(400).json({ error: 'Authorization code required' });

    try {
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `${FRONTEND_URL}/auth/google/callback`
        });

        const { access_token } = tokenResponse.data;
        const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const { id, email, name } = userResponse.data;
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR (oauth_provider = $2 AND oauth_id = $3)',
            [email, 'google', id]
        );
        const user = result.rows[0];

        if (user) {
            if (!user.oauth_provider) {
                await pool.query('UPDATE users SET oauth_provider = $1, oauth_id = $2, email_verified = 1 WHERE id = $3', ['google', id, user.id]);
            }
            const token = generateToken(user.id, user.role);
            res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name, role: user.role, email_verified: true } });
        } else {
            const insertResult = await pool.query(
                'INSERT INTO users (name, email, oauth_provider, oauth_id, email_verified, newsletter_subscribed) VALUES ($1, $2, $3, $4, 1, 0) RETURNING id',
                [name, email, 'google', id]
            );
            const newUserId = insertResult.rows[0].id;
            const token = generateToken(newUserId, 'user');
            res.json({ success: true, token, user: { id: newUserId, email, name, role: 'user', email_verified: true } });
        }
    } catch (error) {
        console.error('Google OAuth error:', error);
        res.status(500).json({ error: 'OAuth authentication failed' });
    }
});

// Facebook OAuth - Get redirect URL
app.get('/api/auth/facebook/url', (req, res) => {
    if (!FACEBOOK_APP_ID) return res.status(500).json({ error: 'Facebook OAuth not configured' });
    const redirectUri = `${FRONTEND_URL}/auth/facebook/callback`;
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email&response_type=code`;
    res.json({ url });
});

// Facebook OAuth - Callback
app.post('/api/auth/facebook/callback', async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Authorization code required' });

    try {
        const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
            params: { client_id: FACEBOOK_APP_ID, client_secret: FACEBOOK_APP_SECRET, code, redirect_uri: `${FRONTEND_URL}/auth/facebook/callback` }
        });

        const { access_token } = tokenResponse.data;
        const userResponse = await axios.get('https://graph.facebook.com/v18.0/me', {
            params: { fields: 'id,name,email', access_token }
        });

        const { id, email, name } = userResponse.data;
        if (!email) return res.status(400).json({ error: 'Email permission required' });

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR (oauth_provider = $2 AND oauth_id = $3)',
            [email, 'facebook', id]
        );
        const user = result.rows[0];

        if (user) {
            if (!user.oauth_provider) {
                await pool.query('UPDATE users SET oauth_provider = $1, oauth_id = $2, email_verified = 1 WHERE id = $3', ['facebook', id, user.id]);
            }
            const token = generateToken(user.id, user.role);
            res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name, role: user.role, email_verified: true } });
        } else {
            const insertResult = await pool.query(
                'INSERT INTO users (name, email, oauth_provider, oauth_id, email_verified, newsletter_subscribed) VALUES ($1, $2, $3, $4, 1, 0) RETURNING id',
                [name, email, 'facebook', id]
            );
            const newUserId = insertResult.rows[0].id;
            const token = generateToken(newUserId, 'user');
            res.json({ success: true, token, user: { id: newUserId, email, name, role: 'user', email_verified: true } });
        }
    } catch (error) {
        console.error('Facebook OAuth error:', error.response?.data || error);
        res.status(500).json({ error: 'OAuth authentication failed' });
    }
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, newsletter } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

    const passwordHash = bcrypt.hashSync(password, 10);
    const newsletterSubscribed = newsletter ? 1 : 0;
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    try {
        const insertResult = await pool.query(
            'INSERT INTO users (name, email, password_hash, newsletter_subscribed, email_verified) VALUES ($1, $2, $3, $4, 0) RETURNING id',
            [name, email, passwordHash, newsletterSubscribed]
        );
        const userId = insertResult.rows[0].id;

        await pool.query(
            'INSERT INTO email_verifications (user_id, token, expires_at) VALUES ($1, $2, $3)',
            [userId, verificationToken, expiresAt.toISOString()]
        );

        await sendVerificationEmail(email, name, verificationToken);

        res.status(201).json({
            success: true,
            message: 'Account aangemaakt! Controleer je email om je account te verifiëren.',
            requiresVerification: true,
            user: { id: userId, email, name, role: 'user', email_verified: false }
        });
    } catch (err) {
        if (err.code === '23505') { // PostgreSQL unique violation
            return res.status(400).json({ error: 'Email already registered' });
        }
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Email Verification
app.get('/api/auth/verify-email', async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Verification token required' });

    try {
        const result = await pool.query('SELECT * FROM email_verifications WHERE token = $1 AND verified = 0', [token]);
        const verification = result.rows[0];

        if (!verification) return res.status(400).json({ error: 'Invalid or expired verification token' });

        if (new Date(verification.expires_at) < new Date()) {
            return res.status(400).json({ error: 'Verification token expired' });
        }

        await pool.query('UPDATE users SET email_verified = 1 WHERE id = $1', [verification.user_id]);
        await pool.query('UPDATE email_verifications SET verified = 1 WHERE id = $1', [verification.id]);

        res.json({ success: true, message: 'Email successfully verified!' });
    } catch (err) {
        console.error('Verify email error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Resend Verification
app.post('/api/auth/resend-verification', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.email_verified) return res.status(400).json({ error: 'Email already verified' });

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await pool.query('DELETE FROM email_verifications WHERE user_id = $1', [user.id]);
        await pool.query('INSERT INTO email_verifications (user_id, token, expires_at) VALUES ($1, $2, $3)', [user.id, verificationToken, expiresAt.toISOString()]);

        await sendVerificationEmail(user.email, user.name, verificationToken);
        res.json({ success: true, message: 'Verification email sent!' });
    } catch (err) {
        console.error('Resend verification error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============================================
// Donation Routes
// ============================================

// Create Donation (supports both authenticated and guest)
app.post('/api/donations', async (req, res) => {
    const { amount, donation_type, country_code, project_id, notes, guest_name, guest_email } = req.body;

    // Check for auth token (optional for guest donations)
    let userId = null;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.userId;
        } catch (e) {
            // Token invalid, treat as guest
        }
    }

    if (!amount || !donation_type) {
        return res.status(400).json({ error: 'Amount and donation type required' });
    }

    try {
        const insertResult = await pool.query(
            `INSERT INTO donations (user_id, guest_name, guest_email, amount, donation_type, country_code, project_id, notes, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending') RETURNING id`,
            [userId, guest_name || null, guest_email || null, amount, donation_type, country_code || null, project_id || null, notes || null]
        );
        const donationId = insertResult.rows[0].id;

        // Create transaction record
        await pool.query(
            `INSERT INTO donation_transactions (donation_id, transaction_type, amount, project_id, description)
             VALUES ($1, 'received', $2, $3, $4)`,
            [donationId, amount, project_id || null, 'Donation received']
        );

        // Update project amount
        if (project_id) {
            await pool.query('UPDATE projects SET current_amount = current_amount + $1 WHERE id = $2', [amount, project_id]);
        }

        // Mark as completed
        await pool.query('UPDATE donations SET status = $1, completed_at = CURRENT_TIMESTAMP WHERE id = $2', ['completed', donationId]);

        res.status(201).json({
            success: true,
            donation: { id: donationId, amount, donation_type, status: 'completed' }
        });
    } catch (err) {
        console.error('Donation error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get User Donations
app.get('/api/donations/my', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT d.*, p.name AS project_name, p.country_code AS project_country
             FROM donations d
             LEFT JOIN projects p ON d.project_id = p.id
             WHERE d.user_id = $1
             ORDER BY d.created_at DESC`,
            [req.user.userId]
        );
        res.json({ success: true, donations: result.rows });
    } catch (err) {
        console.error('Get donations error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get All Donations (Admin)
app.get('/api/donations', authenticateToken, requireAdmin, async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const result = await pool.query(
            `SELECT d.*, u.name AS user_name, u.email AS user_email, p.name AS project_name
             FROM donations d
             LEFT JOIN users u ON d.user_id = u.id
             LEFT JOIN projects p ON d.project_id = p.id
             ORDER BY d.created_at DESC
             LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        const countResult = await pool.query('SELECT COUNT(*) as total FROM donations');
        res.json({ success: true, donations: result.rows, total: parseInt(countResult.rows[0].total), limit, offset });
    } catch (err) {
        console.error('Get all donations error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Donation Stats (Admin)
app.get('/api/donations/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                COUNT(*) as total_donations,
                COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_amount,
                COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_amount,
                COALESCE(SUM(CASE WHEN donation_type = 'monthly' THEN amount ELSE 0 END), 0) as monthly_amount,
                COALESCE(SUM(CASE WHEN donation_type = 'yearly' THEN amount ELSE 0 END), 0) as yearly_amount
            FROM donations
        `);
        res.json({ success: true, stats: result.rows[0] });
    } catch (err) {
        console.error('Donation stats error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============================================
// Project Routes
// ============================================

// Get All Projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        const projects = result.rows;

        if (projects.length === 0) {
            return res.json({ success: true, projects: [] });
        }

        // Get stats for each project
        const projectsWithStats = await Promise.all(projects.map(async (project) => {
            const donationStats = await pool.query(
                `SELECT COUNT(*) as donation_count,
                 COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_received
                 FROM donations WHERE project_id = $1`,
                [project.id]
            );
            const transStats = await pool.query(
                `SELECT COALESCE(SUM(CASE WHEN transaction_type = 'sent_to_project' THEN amount ELSE 0 END), 0) as total_sent
                 FROM donation_transactions WHERE project_id = $1`,
                [project.id]
            );

            return {
                ...project,
                donation_count: parseInt(donationStats.rows[0].donation_count) || 0,
                total_received: parseFloat(donationStats.rows[0].total_received) || 0,
                total_sent: parseFloat(transStats.rows[0].total_sent) || 0
            };
        }));

        res.json({ success: true, projects: projectsWithStats });
    } catch (err) {
        console.error('Get projects error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

// Get Project by ID
app.get('/api/projects/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
        const project = result.rows[0];

        if (!project) return res.status(404).json({ error: 'Project not found' });

        const donationStats = await pool.query(
            `SELECT COUNT(*) as donation_count,
             COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_received
             FROM donations WHERE project_id = $1`,
            [project.id]
        );
        const transStats = await pool.query(
            `SELECT COALESCE(SUM(CASE WHEN transaction_type = 'sent_to_project' THEN amount ELSE 0 END), 0) as total_sent
             FROM donation_transactions WHERE project_id = $1`,
            [project.id]
        );

        res.json({
            success: true,
            project: {
                ...project,
                donation_count: parseInt(donationStats.rows[0].donation_count) || 0,
                total_received: parseFloat(donationStats.rows[0].total_received) || 0,
                total_sent: parseFloat(transStats.rows[0].total_sent) || 0
            }
        });
    } catch (err) {
        console.error('Get project error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============================================
// Comment Routes
// ============================================

app.get('/api/projects/:id/comments', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT c.*, u.name as user_name
             FROM project_comments c
             LEFT JOIN users u ON c.user_id = u.id
             WHERE c.project_id = $1 AND c.status = 'approved'
             ORDER BY c.created_at DESC`,
            [req.params.id]
        );

        const comments = result.rows.map(c => ({
            id: c.id, project_id: c.project_id,
            name: c.user_name || c.guest_name || 'Anoniem',
            comment: c.comment, created_at: c.created_at
        }));

        res.json({ success: true, comments });
    } catch (err) {
        console.error('Get comments error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/projects/:id/comments', authenticateToken, async (req, res) => {
    const { comment } = req.body;
    if (!comment || comment.trim().length === 0) return res.status(400).json({ error: 'Comment is required' });
    if (comment.length > 1000) return res.status(400).json({ error: 'Comment too long (max 1000 characters)' });

    try {
        const project = await pool.query('SELECT id FROM projects WHERE id = $1', [req.params.id]);
        if (project.rows.length === 0) return res.status(404).json({ error: 'Project not found' });

        const insertResult = await pool.query(
            `INSERT INTO project_comments (project_id, user_id, comment, status) VALUES ($1, $2, $3, 'approved') RETURNING id`,
            [req.params.id, req.user.userId, comment.trim()]
        );

        const userResult = await pool.query('SELECT name FROM users WHERE id = $1', [req.user.userId]);

        res.status(201).json({
            success: true,
            comment: {
                id: insertResult.rows[0].id,
                project_id: parseInt(req.params.id),
                name: userResult.rows[0]?.name || 'Gebruiker',
                comment: comment.trim(),
                created_at: new Date().toISOString()
            }
        });
    } catch (err) {
        console.error('Add comment error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/projects/:id/comments/guest', async (req, res) => {
    const { name, email, comment } = req.body;
    if (!comment || comment.trim().length === 0) return res.status(400).json({ error: 'Comment is required' });
    if (!name || name.trim().length === 0) return res.status(400).json({ error: 'Name is required' });
    if (comment.length > 1000) return res.status(400).json({ error: 'Comment too long (max 1000 characters)' });

    try {
        const project = await pool.query('SELECT id FROM projects WHERE id = $1', [req.params.id]);
        if (project.rows.length === 0) return res.status(404).json({ error: 'Project not found' });

        const insertResult = await pool.query(
            `INSERT INTO project_comments (project_id, guest_name, guest_email, comment, status) VALUES ($1, $2, $3, $4, 'approved') RETURNING id`,
            [req.params.id, name.trim(), email?.trim() || null, comment.trim()]
        );

        res.status(201).json({
            success: true,
            comment: {
                id: insertResult.rows[0].id,
                project_id: parseInt(req.params.id),
                name: name.trim(),
                comment: comment.trim(),
                created_at: new Date().toISOString()
            }
        });
    } catch (err) {
        console.error('Add guest comment error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============================================
// User Routes (Admin)
// ============================================

app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const result = await pool.query(
            'SELECT id, email, name, role, newsletter_subscribed, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        const countResult = await pool.query('SELECT COUNT(*) as total FROM users');
        res.json({ success: true, users: result.rows, total: parseInt(countResult.rows[0].total), limit, offset });
    } catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ============================================
// Health Check
// ============================================

app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
    } catch (err) {
        res.json({ status: 'error', database: 'disconnected', timestamp: new Date().toISOString() });
    }
});

// SPA catch-all
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../dist', 'index.html');
    const fs = require('fs');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.json({ message: 'Stichting Manarah API is running. Frontend not built.' });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API endpoints available at /api`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await pool.end();
    console.log('Database pool closed.');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await pool.end();
    console.log('Database pool closed.');
    process.exit(0);
});
