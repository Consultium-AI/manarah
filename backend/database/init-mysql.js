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

        // Insert sample projects
        const [existingProjects] = await connection.query('SELECT COUNT(*) as count FROM projects');

        if (existingProjects[0].count === 0) {
            const sampleProjects = [
                // Afrika
                {
                    name: 'Noodhulp en voedselzekerheid in Burkina Faso',
                    country_code: 'BF',
                    description: 'We bieden noodhulp aan gezinnen die getroffen zijn door conflict en voedselonzekerheid. Dit project voorziet in voedselpakketten, onderdak en medische zorg voor de meest kwetsbare gemeenschappen.',
                    target_amount: 75000.00,
                    current_amount: 32500.00
                },
                {
                    name: 'Waterputten en sanitatie in Zuid-Soedan',
                    country_code: 'SS',
                    description: 'Bouw van waterputten en sanitatievoorzieningen in afgelegen dorpen. Dit project zorgt voor schoon drinkwater en verbetert de hygiëne, wat levens redt en ziektes voorkomt.',
                    target_amount: 100000.00,
                    current_amount: 45000.00
                },
                {
                    name: 'Onderwijs voor kinderen in Ethiopië',
                    country_code: 'ET',
                    description: 'Bouw van scholen en onderwijsprogramma\'s voor kinderen die door conflict zijn ontheemd. We zorgen voor veilige leeromgevingen en lesmateriaal.',
                    target_amount: 85000.00,
                    current_amount: 28000.00
                },
                {
                    name: 'Medische zorg in Somalië',
                    country_code: 'SO',
                    description: 'Mobiele klinieken en medische zorg voor gemeenschappen zonder toegang tot gezondheidszorg. We behandelen ziektes, vaccineren kinderen en bieden prenatale zorg.',
                    target_amount: 60000.00,
                    current_amount: 15000.00
                },
                {
                    name: 'Vredesopbouw in Congo',
                    country_code: 'CD',
                    description: 'Programma\'s voor vredesopbouw en conflictresolutie in gemeenschappen die getroffen zijn door geweld. We werken samen met lokale leiders om duurzame vrede te bevorderen.',
                    target_amount: 120000.00,
                    current_amount: 55000.00
                },
                {
                    name: 'Landbouwondersteuning in Kenia',
                    country_code: 'KE',
                    description: 'Training en zaden voor kleine boeren om voedselzekerheid te verbeteren. We helpen gemeenschappen om zelfvoorzienend te worden en weerstand te bieden aan klimaatverandering.',
                    target_amount: 90000.00,
                    current_amount: 38000.00
                },
                // Azië
                {
                    name: 'Noodhulp voor gezinnen in Syrië',
                    country_code: 'SY',
                    description: 'Noodhulp voor gezinnen die alles hebben verloren door jaren van conflict. We bieden voedsel, onderdak, kleding en medische zorg aan de meest kwetsbaren.',
                    target_amount: 50000.00,
                    current_amount: 22000.00
                },
                {
                    name: 'Wederopbouw van scholen in Afghanistan',
                    country_code: 'AF',
                    description: 'Herbouw van scholen die verwoest zijn door conflict. We zorgen ervoor dat kinderen, vooral meisjes, weer naar school kunnen en een toekomst kunnen opbouwen.',
                    target_amount: 110000.00,
                    current_amount: 42000.00
                },
                {
                    name: 'Voedselhulp in Jemen',
                    country_code: 'YE',
                    description: 'Voedselpakketten en voedingsprogramma\'s voor kinderen en zwangere vrouwen in gebieden met voedseltekorten. We voorkomen ondervoeding en redden levens.',
                    target_amount: 80000.00,
                    current_amount: 35000.00
                },
                {
                    name: 'Onderdak voor vluchtelingen in Bangladesh',
                    country_code: 'BD',
                    description: 'Veilige onderkomens voor vluchtelingen die hun huizen hebben verlaten. We bouwen tijdelijke woningen en zorgen voor basisvoorzieningen zoals water en sanitatie.',
                    target_amount: 95000.00,
                    current_amount: 48000.00
                },
                {
                    name: 'Psychosociale steun in Irak',
                    country_code: 'IQ',
                    description: 'Counseling en psychosociale steun voor kinderen en volwassenen die trauma\'s hebben opgelopen. We helpen mensen om te herstellen en weer hoop te vinden.',
                    target_amount: 70000.00,
                    current_amount: 25000.00
                },
                {
                    name: 'Klimaatweerbaarheid in Myanmar',
                    country_code: 'MM',
                    description: 'Programma\'s om gemeenschappen te helpen zich aan te passen aan klimaatverandering. We bouwen dijken, planten bomen en trainen boeren in duurzame landbouw.',
                    target_amount: 105000.00,
                    current_amount: 40000.00
                },
                // Europa
                {
                    name: 'Noodhulp voor ontheemden in Oekraïne',
                    country_code: 'UA',
                    description: 'Noodhulp voor gezinnen die ontheemd zijn door conflict. We bieden voedsel, onderdak, kleding en medische zorg aan mensen die alles hebben achtergelaten.',
                    target_amount: 150000.00,
                    current_amount: 85000.00
                },
                {
                    name: 'Onderwijs voor kinderen in Oekraïne',
                    country_code: 'UA',
                    description: 'Onderwijsprogramma\'s voor kinderen die niet naar school kunnen door conflict. We zorgen voor online lessen, lesmateriaal en veilige leerruimtes.',
                    target_amount: 65000.00,
                    current_amount: 30000.00
                },
                // Amerika
                {
                    name: 'Noodhulp na natuurrampen in Haïti',
                    country_code: 'HT',
                    description: 'Noodhulp voor gemeenschappen die getroffen zijn door aardbevingen en orkanen. We bieden voedsel, water, onderdak en medische zorg.',
                    target_amount: 88000.00,
                    current_amount: 35000.00
                },
                {
                    name: 'Ondersteuning voor vluchtelingen in Colombia',
                    country_code: 'CO',
                    description: 'Ondersteuning voor vluchtelingen en ontheemden. We bieden voedsel, onderdak, juridische hulp en hulp bij het vinden van werk en onderwijs.',
                    target_amount: 72000.00,
                    current_amount: 28000.00
                }
            ];

            for (const project of sampleProjects) {
                await connection.query(
                    `INSERT INTO projects (name, country_code, description, target_amount, current_amount) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [project.name, project.country_code, project.description, project.target_amount, project.current_amount]
                );
            }
            console.log('Sample projects created.');
        } else {
            console.log('Projects already exist.');
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

