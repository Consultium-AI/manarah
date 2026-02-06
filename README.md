# Stichting Manarah Website

Moderne, professionele website voor Stichting Manarah - een goede doelen instelling.

## 🚀 Live Website

**Frontend:** https://consultium-ai.github.io/manarah/

## 📋 Setup Instructies

### GitHub Pages Activatie

1. Ga naar de repository: https://github.com/Consultium-AI/manarah
2. Klik op **Settings** → **Pages**
3. Bij **Source**, selecteer **GitHub Actions**
4. De website wordt automatisch gedeployed bij elke push naar `master`

### Backend Hosting

De backend moet apart worden gehost omdat GitHub Pages alleen statische sites ondersteunt.

**Optie 1: Render.com (Aanbevolen - Gratis)**
1. Ga naar [render.com](https://render.com)
2. Maak een nieuwe **Web Service**
3. Connect je GitHub repository
4. **Root Directory:** `backend`
5. **Build Command:** `npm install && npm run init-db`
6. **Start Command:** `node server.js`
7. Kopieer de URL (bijv. `https://stichting-manarah-api.onrender.com`)
8. Update `src/utils/api.js` met de backend URL

**Optie 2: Railway.app**
- Vergelijkbaar proces als Render.com

## 🛠️ Lokaal Ontwikkelen

```bash
# Installeer dependencies
npm install
cd backend && npm install

# Start development server
npm run dev

# Start backend
cd backend && npm start
```

## 📁 Project Structuur

```
├── src/                    # React frontend
│   ├── components/         # React componenten
│   ├── pages/             # Pagina componenten
│   └── utils/              # Utilities (API, auth)
├── backend/                # Node.js backend
│   ├── database/          # Database schema & init
│   └── server.js          # Express server
├── public/                 # Statische assets
└── dist/                   # Build output (voor GitHub Pages)
```

## 🔧 Technologie Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** SQLite
- **Styling:** CSS (custom + manarah.css)
- **Deployment:** GitHub Pages (frontend) + Render/Railway (backend)

## 📝 Environment Variables

Voor productie, stel deze in:

- `VITE_API_URL` - Backend API URL (bijv. `https://stichting-manarah-api.onrender.com/api`)

## 📄 Licentie

© 2026 Stichting Manarah. Alle rechten voorbehouden.
