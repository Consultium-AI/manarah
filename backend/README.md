# Foundation Backend API

Backend API server voor de Foundation website met gebruikersbeheer en donatie tracking.

## Installatie

1. Installeer Node.js (versie 14 of hoger)

2. Installeer dependencies:
```bash
npm install
```

3. Maak een `.env` bestand (kopieer `env.example`):
```bash
cp env.example .env
```

4. Pas de database connection string aan in `.env`:
```env
DB_CONNECTION_STRING=mysql://root:jouw-wachtwoord@localhost:3306/stichting
```

5. Initialiseer de database:

**Voor MySQL:**
```bash
npm run init-db:mysql
```

**Voor SQLite:**
```bash
npm run init-db
```

Dit maakt de database aan met:
- Admin gebruiker: `admin1@test.com` / `admin123!`
- Sample projecten

## Server starten

Development mode (met auto-reload):

**Voor MySQL:**
```bash
npm run dev:mysql
```

**Voor SQLite:**
```bash
npm run dev
```

Production mode:

**Voor MySQL:**
```bash
npm run start:mysql
```

**Voor SQLite:**
```bash
npm start
```

Server draait op: `http://localhost:3000`

## API Endpoints

### Authenticatie

- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/login` - Gebruiker login
- `POST /api/auth/register` - Gebruiker registratie

### Donaties

- `POST /api/donations` - Nieuwe donatie maken (authenticated)
- `GET /api/donations/my` - Mijn donaties (authenticated)
- `GET /api/donations` - Alle donaties (admin only)
- `GET /api/donations/stats` - Donatie statistieken (admin only)

### Projecten

- `GET /api/projects` - Alle projecten
- `GET /api/projects/:id` - Project details

### Gebruikers

- `GET /api/users` - Alle gebruikers (admin only)

## Database Schema

Zie `database/schema.sql` voor het volledige database schema.

### Belangrijkste tabellen:

- **users** - Gebruikers accounts
- **donations** - Donaties
- **projects** - Projecten
- **donation_transactions** - Transacties voor geldstromen tracking

## Authenticatie

API endpoints die authenticatie vereisen gebruiken JWT tokens.

Header format:
```
Authorization: Bearer <token>
```

## Database

SQLite database wordt opgeslagen in `database/foundation.db`

Voor productie, overweeg PostgreSQL of MySQL te gebruiken.

