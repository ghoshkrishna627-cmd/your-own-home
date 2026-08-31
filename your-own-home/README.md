# Your Own Home — Airbnb-Inspired Rental Platform

> Full internship certification project. This README covers the **scaffolding stage**
> only. A complete README (architecture, API docs, deployment, screenshots) will be
> written in the Documentation phase once all features are implemented.

## Current status: Phase 2 — Project structure scaffolded

- `server/` — Express + MongoDB backend. App boots (`app.js`/`server.js`), security
  middleware pipeline is live, all 8 Mongoose models exist, auth/role middleware
  skeletons are in place. **No routes/controllers are mounted yet** — that's Phase 3.
- `client/` — React + Vite + Tailwind frontend. App shell renders (Header/Footer +
  routing + all route guards), Auth/Theme/Socket contexts and Redux store are wired,
  dark mode and i18n (English/Hindi) work. **All 13 pages are placeholder shells** —
  real UI comes in Phase 4.

## Quickstart (local dev)

### 1. Backend

```bash
cd server
cp .env.example .env    # then fill in the values — see comments in the file
npm install
npm run dev              # starts on http://localhost:5000
```

The server will fail fast if `MONGODB_URI` is missing/invalid. At minimum, set up a
free MongoDB Atlas cluster before running this (see `server/.env.example`).

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev               # starts on http://localhost:5173
```

## What you need to configure before things fully work

Nothing is faked — but several features are architecturally complete and waiting on
your credentials. See the annotated `.env.example` files in `server/` and `client/`
for exact signup links and instructions for each of: MongoDB Atlas, Cloudinary,
Stripe (test mode), Google OAuth, Facebook OAuth (optional), and an SMTP/Gmail app
password for Nodemailer.

## Project layout

See the architecture document from Phase 1 for the full folder tree and rationale.

## Roadmap

Phase 3 (next): backend business logic — auth, listings, search/availability,
bookings, reviews, uploads, payments, messaging, admin APIs.
