/**
 * Script om alle projecten uit de SQLite database te verwijderen
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

// Delete all projects
db.run('DELETE FROM projects', function(err) {
    if (err) {
        console.error('Fout bij verwijderen van projecten:', err.message);
        db.close();
        process.exit(1);
    }
    
    console.log(`\n✓ ${this.changes} project(en) verwijderd uit de database.`);
    console.log('\nAlle projecten zijn succesvol verwijderd!');
    
    db.close((err) => {
        if (err) {
            console.error('Fout bij sluiten van database:', err.message);
        } else {
            console.log('Database verbinding gesloten.');
        }
        process.exit(0);
    });
});

