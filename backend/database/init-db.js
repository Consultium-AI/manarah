/**
 * Database Initialization Script
 * Creates database and initial data
 */

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'foundation.db');
const schemaPath = path.join(__dirname, 'schema.sql');

// Read schema file
const schema = fs.readFileSync(schemaPath, 'utf8');

// Initialize database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database.');
});

// Execute schema
db.exec(schema, (err) => {
    if (err) {
        console.error('Error executing schema:', err.message);
        db.close();
        process.exit(1);
    }
    console.log('Database schema created successfully.');
    
    // Insert initial admin user
    const adminEmail = 'admin1@test.com';
    const adminPassword = 'admin123!';
    const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);
    
    // Check if email_verifications table exists, if not create it
    db.run(`
        CREATE TABLE IF NOT EXISTS email_verifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            expires_at DATETIME NOT NULL,
            verified INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating email_verifications table:', err.message);
        }
    });

    db.run(
        `INSERT OR IGNORE INTO users (email, password_hash, name, role) 
         VALUES (?, ?, ?, ?)`,
        [adminEmail, adminPasswordHash, 'Admin User', 'admin'],
        function(err) {
            if (err) {
                console.error('Error creating admin user:', err.message);
            } else {
                if (this.changes > 0) {
                    console.log('Admin user created:', adminEmail);
                } else {
                    console.log('Admin user already exists.');
                }
            }
            
            db.close((err) => {
                if (err) {
                        console.error('Error closing database:', err.message);
                    } else {
                        console.log('Database initialization complete!');
                        process.exit(0);
                    }
            });
        }
    );
});
