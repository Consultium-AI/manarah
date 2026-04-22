# EmailJS (alleen frontend / GitHub Pages)

Deze site heeft **geen live backend** voor contactmail: e-mail gaat via **EmailJS in de browser**. Dit bestand zegt precies **waar** je welke waarden zet, en wat **nooit** in de frontend of in Git mag.

---

## Welke “contact” op de site gebruikt dezelfde template?

Eén template in EmailJS met: **`{{title}}`**, **`{{name}}`**, **`{{time}}`**, **`{{message}}`**.

| Plek op de site | Vult in `title` (herkenning in de inbox) |
|-----------------|------------------------------------------|
| Home + pagina **Contact** | `Contact — home- en contactpagina` |
| **Samen in actie** (help mee) | `Samen in actie (help mee)` |
| Optioneel: map **`manarah-main/main`** (eigen build) | `Contact — Manarah landingspagina` |

In **`{{message}}`** staat het bericht, plus (als ingevuld) e-mail, telefoon, interesse. **`{{name}}`** = naam invuller, **`{{time}}`** = tijdstip (wordt in code gezet).

---

## Wat hoort wél in de browser (dus “publiek” in technische zin)

EmailJS in de browser is zo ontworpen: deze waarden komen in de **gebouwde JavaScript-bundle** (iedereen kan ze in de DevTools of in het `.js`-bestand op GitHub Pages zien). Dat is **normaal** voor EmailJS, maar betekent dus: **geen echte geheimen** in deze keys.

| Variabele (Vite) | Wat het is | Waar zetten? |
|------------------|------------|--------------|
| `VITE_EMAILJS_PUBLIC_KEY` | **Public key** (EmailJS: Account → API keys) | Lokaal: `.env` in de projectmap. **GitHub Actions:** repository secret `VITE_EMAILJS_PUBLIC_KEY` (zie hieronder). *Optioneel:* staat al als vaste default in `src/utils/emailjs.js` — overschrijven met env is voor rotatie. |
| `VITE_EMAILJS_SERVICE_ID` | **Service ID** (EmailJS: Email Services) | Zelfde: `.env` lokaal + **secret** in GitHub voor de build. **Verplicht** voor verzenden (anders valt de site terug op `mailto:`). |
| `VITE_EMAILJS_TEMPLATE_ID` | **Template ID** (e-mail “Contact Us” met o.a. `{{title}}`…) | Zelfde als service ID. |

**Code (hoofdproject):** `src/utils/emailjs.js`  
**Code (manarah, aparte map):** `manarah-main/manarah-main/src/utils/emailjs.ts` — zelfde variabelen, eigen build.

---

## Wat mag NOOIT in de website of in Git (frontend)

| Wat | Regel |
|-----|--------|
| **EmailJS Private key** / **API secret** | **Nooit** in React-code, nooit in `.env` die in de repo of in de static build terechtkomt, nooit in GitHub Secrets die je per ongeluk in de client logt. Die hoort **alleen** in het EmailJS-dashboard (serverkant beheerd). |
| Wachtwoorden, SMTP-wachtwoorden, enz. | Niet in deze site; jullie draaien geen mailserver op GitHub Pages. |

Als iemand ooit toch de **service**- of **template**-ID uit de bundle leest: dat is beperkt nuttig zonder jullie public key, maar combineer tóch nooit met onnodige gevoelige data in dezelfde repo.

---

## Lokaal ontwikkelen (`.env`)

1. In de **root** van het hoofdproject (waar `package.json` en `npm run build` voor de live site draait), maak **`.env`** (niet committen; staat in `.gitignore`).

   Voorbeelden staan in **`.env.example`**.

2. Vul in:

   ```env
   VITE_EMAILJS_PUBLIC_KEY=jouw_public_key
   VITE_EMAILJS_SERVICE_ID=service_xxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxx
   ```

3. `npm run dev` opnieuw starten (Vite leest env bij start).

Voor de **manarah**-submap, als je die apart bouwt: hetzelfde in  
`manarah-main/manarah-main/.env` (eigen `npm run build`).

---

## Live op GitHub Pages (huidige workflow)

De workflow **`.github/workflows/deploy.yml`** zet de build-secrets in het **build-stadium** (ze worden in de minified JS **geëmbed**, net als lokaal — dat is hoe Vite + EmailJS werkt).

1. Op GitHub: **Repository → Settings → Secrets and variables → Actions → New repository secret**  
2. Maak o.a.:

   - `VITE_EMAILJS_PUBLIC_KEY` (optioneel als default in code volstaat)  
   - `VITE_EMAILJS_SERVICE_ID` (aanbevolen)  
   - `VITE_EMAILJS_TEMPLATE_ID` (aanbevolen)  

3. **Push** naar `main` / `master` → de workflow bouwt `dist` en deployt naar GitHub Pages.

Zonder service/template secrets blijft de site draaien, maar valt e-mail **terug op `mailto:`** in de code.

---

## EmailJS-dashboard (ontvanger)

- Koppel je **e-maildienst** in EmailJS (bijv. Gmail op **stichtingmanarah@gmail.com**).  
- In de **template**: zet het **ontvangstadres** (To) goed, vaak `stichtingmanarah@gmail.com` of volgens de instructies van de gekozen service.  
- **Ondersteunde domeinnaam** (bijv. `stichtingmanarah.com`) in EmailJS toevoegen als dat vereist is (EmailJS: allowed domains), anders weigert de API soms in productie.

---

## Samenvatting in één zin

**Public key + service ID + template ID** mogen in de **Vite build** (env bij build) — dat is bewust “publiek” in de static site. De **private key** van EmailJS nooit in frontend; er is **geen backend** nodig voor deze oplossing.
