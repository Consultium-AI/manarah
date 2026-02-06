/**
 * Script om het Palestina project toe te voegen aan de database
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

// Check if image_url column exists and add it if needed
db.all("PRAGMA table_info(projects)", (err, columns) => {
    if (err) {
        console.error('Fout bij ophalen tabel info:', err.message);
        db.close();
        process.exit(1);
    }
    
    const hasImageUrl = columns.some(col => col.name === 'image_url');
    
    if (!hasImageUrl) {
        console.log('image_url kolom wordt toegevoegd...');
        db.run(`ALTER TABLE projects ADD COLUMN image_url TEXT`, (err) => {
            if (err) {
                console.error('Fout bij toevoegen image_url kolom:', err.message);
            } else {
                console.log('image_url kolom succesvol toegevoegd.');
            }
            insertProject();
        });
    } else {
        console.log('image_url kolom bestaat al.');
        insertProject();
    }
});

function insertProject() {
    // Palestina project data
    const palestineProject = {
        name: 'Noodhulp en wederopbouw in Palestina',
        country_code: 'PS',
        description: 'Noodhulp en wederopbouw voor gezinnen en gemeenschappen in Palestina die getroffen zijn door conflict en ontheemding. We bieden voedselpakketten, medische zorg, onderdak en onderwijsondersteuning voor kinderen. Daarnaast werken we aan wederopbouw van essentiële infrastructuur zoals scholen en gezondheidscentra. Ons project richt zich op het verlenen van directe hulp aan de meest kwetsbare gezinnen, met speciale aandacht voor kinderen, ouderen en mensen met een handicap. We werken samen met lokale partners om duurzame oplossingen te creëren die gemeenschappen helpen om weer op te bouwen en te herstellen. Door middel van voedseldistributie, medische hulp, tijdelijke onderkomens en onderwijsprogramma\'s voor kinderen, streven we ernaar om hoop en stabiliteit te brengen in deze moeilijke tijden.',
        target_amount: 125000.00,
        current_amount: 45000.00,
        status: 'active',
        image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop'
    };

    // Insert project
    db.run(
        `INSERT INTO projects (name, country_code, description, target_amount, current_amount, status, image_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            palestineProject.name,
            palestineProject.country_code,
            palestineProject.description,
            palestineProject.target_amount,
            palestineProject.current_amount,
            palestineProject.status,
            palestineProject.image_url
        ],
        function(err) {
            if (err) {
                console.error('Fout bij toevoegen van project:', err.message);
                db.close();
                process.exit(1);
            }
            
            console.log(`\n✓ Palestina project succesvol toegevoegd! (ID: ${this.lastID})`);
            console.log(`  Naam: ${palestineProject.name}`);
            console.log(`  Land: Palestina`);
            console.log(`  Doelbedrag: €${palestineProject.target_amount.toLocaleString('nl-NL')}`);
            console.log(`  Huidig bedrag: €${palestineProject.current_amount.toLocaleString('nl-NL')}`);
            console.log(`  Foto: ${palestineProject.image_url}`);
            
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
}
