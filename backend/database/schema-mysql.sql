-- Foundation Database Schema
-- MySQL Database Schema voor gebruikers en donaties

-- Gebruikers tabel
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    newsletter_subscribed TINYINT(1) DEFAULT 0,
    email_verified TINYINT(1) DEFAULT 0,
    oauth_provider VARCHAR(50) NULL, -- 'google', 'facebook', null
    oauth_id VARCHAR(255) NULL, -- OAuth provider user ID
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
);

-- Projecten tabel (moet eerst bestaan voor foreign keys)
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    description TEXT,
    target_amount DECIMAL(10, 2),
    current_amount DECIMAL(10, 2) DEFAULT 0,
    status ENUM('active', 'completed', 'paused', 'cancelled') DEFAULT 'active',
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Donaties tabel
CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'EUR',
    donation_type ENUM('one-time', 'monthly', 'yearly') NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    country_code VARCHAR(10),
    project_id INT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    INDEX idx_donations_user_id (user_id),
    INDEX idx_donations_status (status),
    INDEX idx_donations_created_at (created_at)
);

-- Donatie transacties (voor tracking van geldstromen)
CREATE TABLE IF NOT EXISTS donation_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donation_id INT NOT NULL,
    transaction_type ENUM('received', 'sent_to_project', 'refunded') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'EUR',
    project_id INT NULL,
    description TEXT,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    INDEX idx_donation_transactions_donation_id (donation_id)
);

-- Email verificatie tokens
CREATE TABLE IF NOT EXISTS email_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    verified TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_email_verifications_token (token),
    INDEX idx_email_verifications_expires_at (expires_at)
);

-- Sessies tabel (voor admin sessies)
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_sessions_token (token),
    INDEX idx_sessions_expires_at (expires_at)
);

-- View voor donatie overzicht per project
CREATE OR REPLACE VIEW project_donation_summary AS
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
CREATE OR REPLACE VIEW user_donation_summary AS
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




