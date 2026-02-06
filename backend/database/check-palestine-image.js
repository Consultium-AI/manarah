/**
 * Script om te controleren welke foto URL het Palestina project heeft
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

// Check Palestina project image
db.all(
    `SELECT id, name, country_code, image_url FROM projects WHERE country_code = 'PS'`,
    [],
    function(err, rows) {
        if (err) {
            console.error('Fout bij ophalen project:', err.message);
            db.close();
            process.exit(1);
        }
        
        if (rows.length === 0) {
            console.log('\n⚠ Geen Palestina project gevonden.');
        } else {
            console.log('\n✓ Palestina project(en) gevonden:');
            rows.forEach(row => {
                console.log(`\n  ID: ${row.id}`);
                console.log(`  Naam: ${row.name}`);
                console.log(`  Country Code: ${row.country_code}`);
                console.log(`  Image URL: ${row.image_url || '(geen foto)'}`);
            });
        }
        
        db.close((err) => {
            if (err) {
                console.error('Fout bij sluiten van database:', err.message);
            } else {
                console.log('\nDatabase verbinding gesloten.');
            }
            process.exit(0);
        });
    }
);

