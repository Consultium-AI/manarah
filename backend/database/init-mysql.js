/**
 * MySQL Database Initialization Script
 * Creates database and initial data
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Support both connection string and individual parameters
let dbConfig;

if (process.env.DB_CONNECTION_STRING) {
    // Use connection string if provided (format: mysql://user:password@host:port/database)
    dbConfig = process.env.DB_CONNECTION_STRING;
} else {
    // Use individual parameters
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'stichting',
        multipleStatements: true
    };
}

async function initDatabase() {
    let connection;
    let databaseName;
    
    try {
        // Extract database name from config
        if (typeof dbConfig === 'string') {
            // Parse connection string: mysql://user:password@host:port/database
            const url = new URL(dbConfig);
            databaseName = url.pathname.substring(1); // Remove leading /
            
            // Connect without database first to create it
            const tempConnection = await mysql.createConnection({
                host: url.hostname,
                port: url.port || 3306,
                user: url.username,
                password: url.password
            });
            
            // Create database if it doesn't exist
            await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
            console.log(`Database '${databaseName}' created or already exists.`);
            await tempConnection.end();
        } else {
            databaseName = dbConfig.database;
            
            // Connect without database first to create it
            const tempConnection = await mysql.createConnection({
                host: dbConfig.host,
                user: dbConfig.user,
                password: dbConfig.password
            });

            // Create database if it doesn't exist
            await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
            console.log(`Database '${databaseName}' created or already exists.`);
            await tempConnection.end();
        }

        // Connect to the database
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database.');

        // Read schema file
        const schemaPath = path.join(__dirname, 'schema-mysql.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Execute schema
        await connection.query(schema);
        console.log('Database schema created successfully.');

        // Insert initial admin user
        const adminEmail = 'admin1@test.com';
        const adminPassword = 'admin123!';
        const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);

        const [existingAdmin] = await connection.query(
            'SELECT id FROM users WHERE email = ?',
            [adminEmail]
        );

        if (existingAdmin.length === 0) {
            await connection.query(
                `INSERT INTO users (email, password_hash, name, role, email_verified) 
                 VALUES (?, ?, ?, ?, 1)`,
                [adminEmail, adminPasswordHash, 'Admin User', 'admin']
            );
            console.log('Admin user created:', adminEmail);
        } else {
            console.log('Admin user already exists.');
        }

        console.log('\nDatabase initialization completed successfully!');
        console.log('\nAdmin credentials:');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('\nYou can now start the server with: npm start');

    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed.');
        }
    }
}

initDatabase();

