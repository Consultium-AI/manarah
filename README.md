# Foundation Website - React Application

Moderne React website voor een foundation met volledige frontend en backend functionaliteit.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite
- **Package Manager**: Yarn

## Installatie

### 1. Installeer dependencies

```bash
yarn install
cd backend
npm install
cd ..
```

### 2. Configureer database

**Voor MySQL:**
1. Maak `.env` bestand in `backend/` met je connection string:
```env
DB_CONNECTION_STRING=mysql://root:jouw-wachtwoord@localhost:3306/stichting
```

2. Initialiseer database:
```bash
cd backend
npm run init-db:mysql
```

**Voor SQLite (standaard):**
```bash
yarn init-db
```

Dit maakt de database aan met:
- Admin gebruiker: `admin1@test.com` / `admin123!`
- Sample projecten

### 3. Start development servers

**Terminal 1 - Frontend:**
```bash
yarn dev
```

**Terminal 2 - Backend:**
```bash
# Voor MySQL:
cd backend && npm run dev:mysql

# Voor SQLite (standaard):
yarn backend:dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Project Structuur

```
website voor mahmoud/
├── src/
│   ├── components/        # React componenten
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── sections/      # Page sections
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── WieZijnWij.jsx
│   │   ├── WaarWeWerken.jsx
│   │   ├── Inloggen.jsx
│   │   ├── MijnDonaties.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── utils/             # Utilities
│   │   ├── auth.js        # Auth helpers
│   │   └── api.js         # API client
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── backend/               # Backend server
│   ├── server.js
│   ├── database/
│   └── package.json
├── styles.css            # Existing CSS (imported)
├── package.json          # Frontend dependencies
├── vite.config.js       # Vite configuration
└── index.html           # HTML template
```

## Scripts

- `yarn dev` - Start development server (frontend)
- `yarn build` - Build voor productie
- `yarn preview` - Preview productie build
- `yarn backend` - Start backend server
- `yarn backend:dev` - Start backend in development mode
- `yarn init-db` - Initialiseer database

## Features

### Frontend (React)
- ✅ React Router voor navigatie
- ✅ Component-based architectuur
- ✅ State management met React hooks
- ✅ API integratie met Axios
- ✅ Responsive design
- ✅ Alle bestaande pagina's geconverteerd
- ✅ Email verificatie flow
- ✅ OAuth login (Google/Facebook)

### Backend API
- ✅ RESTful API met Express.js
- ✅ JWT authenticatie
- ✅ SQLite database
- ✅ Gebruikersbeheer
- ✅ Email verificatie systeem
- ✅ OAuth integratie (Google/Facebook)
- ✅ Donatie tracking
- ✅ Project management

## Routes

- `/` - Homepage
- `/wie-zijn-wij` - Over ons
- `/waar-we-werken` - Landen overzicht
- `/land/:countrySlug` - Land detail
- `/inloggen` - Login/Registratie
- `/mijn-donaties` - Mijn donaties (authenticated)
- `/admin` - Admin login
- `/admin-dashboard` - Admin dashboard

## Environment Variables

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env in backend/)
Kopieer `backend/env.example` naar `backend/.env` en vul in:

```env
# Server
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173

# Database - Gebruik connection string (aanbevolen)
DB_CONNECTION_STRING=mysql://root:Root3112@localhost:3306/stichting

# Of gebruik individuele parameters (als DB_CONNECTION_STRING niet is ingesteld):
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=Root3112
# DB_NAME=stichting

# Email (voor verificatie)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Gmail App Password
SMTP_FROM=noreply@foundation.org

# Google OAuth (optioneel)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth (optioneel)
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

**Belangrijk:** Pas `Root3112` aan naar jouw MySQL root wachtwoord in de connection string!

### Email Setup (Gmail)
1. Ga naar Google Account → Security
2. Schakel "2-Step Verification" in
3. Genereer een "App Password"
4. Gebruik dit wachtwoord in `SMTP_PASS`

### OAuth Setup

**Google OAuth:**
1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak een nieuw project
3. Enable Google+ API
4. Maak OAuth 2.0 credentials
5. Voeg redirect URI toe: `http://localhost:5173/auth/google/callback`

**Facebook OAuth:**
1. Ga naar [Facebook Developers](https://developers.facebook.com/)
2. Maak een nieuwe App
3. Voeg Facebook Login toe
4. Voeg redirect URI toe: `http://localhost:5173/auth/facebook/callback`

## Development

De frontend draait op Vite dev server met hot module replacement.
De backend draait op Express met nodemon voor auto-reload.

## Productie Build

```bash
yarn build
```

De build output staat in `/dist` en kan worden gedeployed naar elke static hosting service.
