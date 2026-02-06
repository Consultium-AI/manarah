/**
 * Script om Ramadan projecten toe te voegen aan de database
 * - Ramadan 2025: Voltooid project
 * - Ramadan 2026: Actief project
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
            insertProjects();
        });
    } else {
        console.log('image_url kolom bestaat al.');
        insertProjects();
    }
});

function insertProjects() {
    // Ramadan 2025 project data (VOLTOOID)
    const ramadan2025 = {
        name: 'Ramadan Project 2025',
        country_code: 'NL',
        description: 'Het Ramadan Project 2025 is succesvol afgerond! Met jullie steun hebben we €1.900 opgehaald en 675 warme familiemaaltijden uitgedeeld tijdens de gezegende maand Ramadan. Gezinnen in nood ontvingen voedselpakketten, iftar-maaltijden en steun om deze heilige maand waardig door te komen. Dankzij de generositeit van onze donateurs hebben we dit jaar meer families kunnen bereiken dan ooit tevoren. We zijn ontzettend dankbaar voor ieders bijdrage.',
        target_amount: 1900.00,
        current_amount: 1900.00,
        status: 'completed',
        image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1920&q=80'
    };

    // Ramadan 2026 project data (ACTIEF)
    const ramadan2026 = {
        name: 'Ramadan Project 2026',
        country_code: 'NL',
        description: 'Help ons dit jaar nog meer gezinnen te bereiken tijdens de heilige maand Ramadan. Met jouw donatie kunnen we voedselpakketten, iftar-maaltijden en essentiële hulpgoederen leveren aan families in nood. Ons doel is om 1000 warme maaltijden uit te delen en gezinnen te ondersteunen die het moeilijk hebben. Elke bijdrage, groot of klein, maakt een verschil. Samen kunnen we ervoor zorgen dat niemand met een lege maag hoeft te vasten.',
        target_amount: 2500.00,
        current_amount: 350.00,
        status: 'active',
        image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1920&q=80'
    };

    // Insert Ramadan 2025 (completed)
    db.run(
        `INSERT INTO projects (name, country_code, description, target_amount, current_amount, status, image_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            ramadan2025.name,
            ramadan2025.country_code,
            ramadan2025.description,
            ramadan2025.target_amount,
            ramadan2025.current_amount,
            ramadan2025.status,
            ramadan2025.image_url
        ],
        function(err) {
            if (err) {
                console.error('Fout bij toevoegen van Ramadan 2025 project:', err.message);
            } else {
                console.log(`\n✓ Ramadan 2025 project succesvol toegevoegd! (ID: ${this.lastID})`);
                console.log(`  Naam: ${ramadan2025.name}`);
                console.log(`  Status: VOLTOOID`);
                console.log(`  Doelbedrag: €${ramadan2025.target_amount.toLocaleString('nl-NL')}`);
                console.log(`  Opgehaald: €${ramadan2025.current_amount.toLocaleString('nl-NL')}`);
            }
            
            // Insert Ramadan 2026 (active)
            db.run(
                `INSERT INTO projects (name, country_code, description, target_amount, current_amount, status, image_url) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    ramadan2026.name,
                    ramadan2026.country_code,
                    ramadan2026.description,
                    ramadan2026.target_amount,
                    ramadan2026.current_amount,
                    ramadan2026.status,
                    ramadan2026.image_url
                ],
                function(err) {
                    if (err) {
                        console.error('Fout bij toevoegen van Ramadan 2026 project:', err.message);
                    } else {
                        console.log(`\n✓ Ramadan 2026 project succesvol toegevoegd! (ID: ${this.lastID})`);
                        console.log(`  Naam: ${ramadan2026.name}`);
                        console.log(`  Status: ACTIEF`);
                        console.log(`  Doelbedrag: €${ramadan2026.target_amount.toLocaleString('nl-NL')}`);
                        console.log(`  Huidig bedrag: €${ramadan2026.current_amount.toLocaleString('nl-NL')}`);
                    }
                    
                    console.log('\n✓ Alle Ramadan projecten succesvol toegevoegd!');
                    
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
    );
}

