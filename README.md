# Portfolio Backend Setup

1. Copy `.env.example` to `.env` (Windows: `copy .env.example .env`) and fill **only `.env`** (never the example file):
   - `MONGODB_URI` – Atlas connection string, database name `portfolio`.
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` – login for `/admin` (use a strong password).
   - `JWT_SECRET` – long random text (32+ random bytes).
2. In MongoDB Atlas add your IP in Network Access and make sure the database user has read/write access.
3. `npm install`, then once `npm run seed`, then `npm run dev` (or `npm start`).
4. Keep `.env` private; `.gitignore` already excludes it.

**Contact form:** no email / WhatsApp API is used. When a visitor clicks *Send message*, WhatsApp opens with the
query pre-filled for your number (set in Admin → About & Profile → *WhatsApp number*), and a copy is saved in the
database (Admin → Messages).

**Security:** if real credentials were ever pasted in chat, screenshots, or committed to git (e.g. inside `.env.example`),
treat them as exposed and rotate them (Atlas DB password, admin password, JWT secret).
