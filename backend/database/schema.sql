-- Foundation Database Schema
-- SQLite Database Schema voor gebruikers en donaties

-- Gebruikers tabel
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
    newsletter_subscribed INTEGER DEFAULT 0,
    email_verified INTEGER DEFAULT 0,
    oauth_provider TEXT, -- 'google', 'facebook', null
    oauth_id TEXT, -- OAuth provider user ID
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Donaties tabel
CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    donation_type TEXT NOT NULL CHECK(donation_type IN ('one-time', 'monthly', 'yearly')),
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed', 'cancelled')),
    payment_method TEXT,
    country_code TEXT,
    project_id INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Projecten tabel
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country_code TEXT NOT NULL,
    description TEXT,
    target_amount DECIMAL(10, 2),
    current_amount DECIMAL(10, 2) DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'paused', 'cancelled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Donatie transacties (voor tracking van geldstromen)
CREATE TABLE IF NOT EXISTS donation_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    donation_id INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK(transaction_type IN ('received', 'sent_to_project', 'refunded')),
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    project_id INTEGER,
    description TEXT,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Email verificatie tokens
CREATE TABLE IF NOT EXISTS email_verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sessies tabel (voor admin sessies)
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexen voor betere performance
CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donation_transactions_donation_id ON donation_transactions(donation_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Triggers voor updated_at
CREATE TRIGGER IF NOT EXISTS update_users_timestamp 
    AFTER UPDATE ON users
    BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_donations_timestamp 
    AFTER UPDATE ON donations
    BEGIN
        UPDATE donations SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_projects_timestamp 
    AFTER UPDATE ON projects
    BEGIN
        UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- View voor donatie overzicht per project
CREATE VIEW IF NOT EXISTS project_donation_summary AS
SELECT 
    p.id AS project_id,
    p.name AS project_name,
    p.country_code,
    p.target_amount,
    p.current_amount,
    COUNT(d.id) AS total_donations,
    SUM(CASE WHEN d.status = 'completed' THEN d.amount ELSE 0 END) AS total_received,
    SUM(CASE WHEN dt.transaction_type = 'sent_to_project' AND dt.project_id = p.id THEN dt.amount ELSE 0 END) AS total_sent_to_project
FROM projects p
LEFT JOIN donations d ON d.project_id = p.id
LEFT JOIN donation_transactions dt ON dt.donation_id = d.id
GROUP BY p.id, p.name, p.country_code, p.target_amount, p.current_amount;

-- View voor gebruikers donatie overzicht
CREATE VIEW IF NOT EXISTS user_donation_summary AS
SELECT 
    u.id AS user_id,
    u.email,
    u.name,
    COUNT(d.id) AS total_donations,
    SUM(CASE WHEN d.status = 'completed' THEN d.amount ELSE 0 END) AS total_donated,
    MAX(d.created_at) AS last_donation_date
FROM users u
LEFT JOIN donations d ON d.user_id = u.id
GROUP BY u.id, u.email, u.name;

