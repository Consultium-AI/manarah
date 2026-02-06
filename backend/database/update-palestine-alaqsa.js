/**
 * Script om de foto van het Palestina project te updaten naar Al-Aqsa
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'foundation.db');

// Al-Aqsa foto URL (lokaal bestand)
const alAqsaImageUrl = '/assets/Al_Aqsa.jpg';

// Initialize database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Fout bij openen van database:', err.message);
        process.exit(1);
    }
    console.log('Verbonden met SQLite database.');
});

// Update Palestina project image
db.run(
    `UPDATE projects 
     SET image_url = ? 
     WHERE country_code = 'PS' OR name LIKE '%Palestina%'`,
    [alAqsaImageUrl],
    function(err) {
        if (err) {
            console.error('Fout bij updaten van foto:', err.message);
            db.close();
            process.exit(1);
        }
        
        if (this.changes === 0) {
            console.log('\n⚠ Geen Palestina project gevonden om te updaten.');
        } else {
            console.log(`\n✓ Foto van Palestina project succesvol geüpdatet naar Al-Aqsa!`);
            console.log(`  ${this.changes} project(en) geüpdatet`);
            console.log(`  Nieuwe foto: ${alAqsaImageUrl}`);
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

