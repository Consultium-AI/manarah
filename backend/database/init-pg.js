/**
 * PostgreSQL Database Initialization Script
 * For Render.com deployment
 * Usage: node database/init-pg.js
 */

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable is not set.');
    console.error('Set it in your .env file or Render environment variables.');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDatabase() {
    const client = await pool.connect();

    try {
        console.log('Connected to PostgreSQL database.');

        // Read and execute schema
        const schemaPath = path.join(__dirname, 'schema-pg.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        await client.query(schema);
        console.log('Database schema created successfully.');

        // Insert initial admin user (if not exists)
        const adminEmail = 'admin1@test.com';
        const adminPassword = 'admin123!';
        const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);

        const existing = await client.query('SELECT id FROM users WHERE email = $1', [adminEmail]);

        if (existing.rows.length === 0) {
            await client.query(
                'INSERT INTO users (email, password_hash, name, role, email_verified) VALUES ($1, $2, $3, $4, 1)',
                [adminEmail, adminPasswordHash, 'Admin User', 'admin']
            );
            console.log('Admin user created:', adminEmail);
        } else {
            console.log('Admin user already exists.');
        }

        // Insert sample projects (if none exist)
        const projectCount = await client.query('SELECT COUNT(*) as count FROM projects');
        if (parseInt(projectCount.rows[0].count) === 0) {
            await client.query(`
                INSERT INTO projects (name, country_code, description, target_amount, current_amount, status, image_url) VALUES
                ('Noodhulp Palestina', 'PS', 'Directe noodhulp voor gezinnen in Gaza: voedselpakketten, medische hulp en onderdak voor ontheemde families.', 50000, 12500, 'active', '/assets/Al_Aqsa.jpg'),
                ('Waterputten Sudan', 'SD', 'Bouw van waterputten in afgelegen gebieden van Sudan om gemeenschappen toegang te geven tot schoon drinkwater.', 25000, 8000, 'active', NULL),
                ('Wederopbouw Syrie', 'SY', 'Herbouw van verwoeste scholen en ziekenhuizen in Syrië om gemeenschappen te helpen herstellen.', 75000, 15000, 'active', NULL)
            `);
            console.log('Sample projects inserted.');
        } else {
            console.log('Projects already exist, skipping seed data.');
        }

        console.log('Database initialization complete!');
    } catch (err) {
        console.error('Database initialization error:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

initDatabase();
