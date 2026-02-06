/**
 * Script om de foto van het Palestina project te fixen
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

// First, show current Palestine project
db.all(`SELECT id, name, country_code, image_url FROM projects WHERE country_code = 'PS' OR name LIKE '%Palestina%'`, (err, rows) => {
    if (err) {
        console.error('Fout:', err.message);
    } else {
        console.log('\nHuidige Palestina projecten:');
        rows.forEach(row => {
            console.log(`  ID: ${row.id}, Naam: ${row.name}, Image: ${row.image_url}`);
        });
    }
    
    // Update with absolute URL path
    const newImageUrl = '/assets/Al_Aqsa.jpg';
    
    db.run(
        `UPDATE projects SET image_url = ? WHERE country_code = 'PS' OR name LIKE '%Palestina%'`,
        [newImageUrl],
        function(err) {
            if (err) {
                console.error('Fout bij updaten:', err.message);
            } else {
                console.log(`\n✓ ${this.changes} project(en) geüpdatet met image_url: ${newImageUrl}`);
            }
            
            db.close();
        }
    );
});

