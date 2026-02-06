/**
 * Script om de project_comments tabel toe te voegen aan de database
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'foundation.db');

// Initialize database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Fout bij openen van database:', err.message);
        process.exit(1);
    }
    console.log('Verbonden met SQLite database.');
});

// Create comments table
const createCommentsTable = `
CREATE TABLE IF NOT EXISTS project_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    user_id INTEGER,
    guest_name TEXT,
    guest_email TEXT,
    comment TEXT NOT NULL,
    status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
`;

// Create index for faster queries
const createIndex = `
CREATE INDEX IF NOT EXISTS idx_comments_project_id ON project_comments(project_id);
`;

db.serialize(() => {
    // Create comments table
    db.run(createCommentsTable, (err) => {
        if (err) {
            console.error('Fout bij aanmaken comments tabel:', err.message);
        } else {
            console.log('✓ project_comments tabel aangemaakt of bestaat al.');
        }
    });

    // Create index
    db.run(createIndex, (err) => {
        if (err) {
            console.error('Fout bij aanmaken index:', err.message);
        } else {
            console.log('✓ Index voor project_id aangemaakt.');
        }
    });

    // Close database
    db.close((err) => {
        if (err) {
            console.error('Fout bij sluiten van database:', err.message);
        } else {
            console.log('\nDatabase verbinding gesloten.');
            console.log('Comments tabel succesvol toegevoegd!');
        }
        process.exit(0);
    });
});

