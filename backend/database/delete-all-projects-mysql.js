/**
 * Script om alle projecten uit de MySQL database te verwijderen
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Support both connection string and individual parameters
let dbConfig;

if (process.env.DB_CONNECTION_STRING) {
    dbConfig = process.env.DB_CONNECTION_STRING;
} else {
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'stichting',
        multipleStatements: true
    };
}

async function deleteAllProjects() {
    let connection;
    
    try {
        // Connect to the database
        connection = await mysql.createConnection(dbConfig);
        console.log('Verbonden met MySQL database.');

        // Delete all projects
        const [result] = await connection.query('DELETE FROM projects');
        console.log(`\n✓ ${result.affectedRows} project(en) verwijderd uit de database.`);

        console.log('\nAlle projecten zijn succesvol verwijderd!');

    } catch (error) {
        console.error('Fout bij verwijderen van projecten:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database verbinding gesloten.');
        }
    }
}

deleteAllProjects();

