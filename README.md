
# Travlr Getaways — Full‑Stack Travel Web App (CS‑465)

**MEAN stack sample application** showcasing a customer‑facing travel site and an Angular admin dashboard backed by a secure REST API and MongoDB. The project demonstrates server‑rendered pages with Express, a SPA admin experience with Angular, JWT‑based authentication/authorization, and CRUD operations for trip data.

- **Stack:** MongoDB, Express.js, Angular, Node.js, JWT
- **Focus:** RESTful design, security, component reusability, data services, and deployment readiness
- **Monorepo:** Customer site (Express), Admin SPA (Angular), API (Express), shared data

---

## Features

- **Customer Site (Express)**
  - Server‑rendered pages with dynamic trip listings and details
  - Progressive enhancement with vanilla JS
  - SEO‑friendly, fast initial load

- **Admin Dashboard (Angular SPA)**
  - Authenticated CRUD for trips (list/create/update/delete)
  - Reusable components (e.g., TripCardComponent)
  - Responsive UI (Tailwind or CSS as configured)

- **API (Express + MongoDB)**
  - REST endpoints for trips and authentication
  - JSON payloads for frontend integration
  - JWT‑protected routes and role‑based access patterns

- **Security**
  - JWT access tokens via Authorization: Bearer
  - Protected admin routes
  - Input validation and basic error handling

---

## Repository Structure

CS-465/
├─ app_admin/        # Angular SPA (Admin UI)
├─ app_api/          # Express REST API (JWT auth, CRUD for trips)
├─ app_server/       # Express server-rendered customer site
├─ bin/              # Typical Express starter 'www' script(s)
├─ data/             # Seed data / sample JSON
├─ public/           # Static assets (images, CSS, client JS)
├─ app.js            # Root Express app entry (if applicable)
├─ package.json      # Root scripts and shared dev deps (see package.json)
├─ package-lock.json
├─ .gitignore
└─ README.md

Note: The modules labeled “Module X completed baseline” indicate progressive milestones from coursework. Final behavior is a composite of these modules.

---

## Architecture

- **Frontend**
  - Customer site: Express renders HTML views; server sends fully formed pages.
  - Admin site: Angular SPA interacts with the API; updates view without full page reloads.

- **Backend**
  - Node/Express API provides JSON endpoints for trip data and auth.
  - MongoDB stores flexible trip documents suited to evolving schemas.

- **Auth**
  - Login returns a **JWT**.
  - Protected API routes require `Authorization: Bearer <token>`.

flowchart LR
  A[Browser - Customer] -- HTTP --> B[Express (app_server)]
  A2[Browser - Admin] -- HTTPS/JSON --> C[Angular (app_admin)]
  B -- JSON/Services --> D[(MongoDB)]
  C -- REST/JSON --> E[Express API (app_api)]
  E -- Mongoose --> D
  C <-- JWT --> E

---

## Tech Stack

- **Frontend:** Express (EJS/HTML/JS), Angular (SPA)
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB (Atlas or local)
- **Auth:** JSON Web Tokens (JWT)
- **Tooling:** npm, (optionally) Angular CLI, Postman/cURL for API testing

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- MongoDB (Local or Atlas)
- Angular CLI (for admin) `npm i -g @angular/cli` (if not already installed)

---

## Quick Start

1) Clone and install dependencies
git clone https://github.com/Frisbiz/CS-465.git
cd CS-465

# root install (if used)
npm install

# API
cd app_api && npm install

# Customer site
cd ../app_server && npm install

# Admin SPA
cd ../app_admin && npm install

2) Configure environment variables

- API (.env in `app_api/`):
PORT=3001
MONGODB_URI=mongodb://localhost:27017/travlr
JWT_SECRET=replace-with-a-strong-secret
CORS_ORIGIN=http://localhost:4200

- Customer site (.env in `app_server/`, if used):
PORT=3000
API_BASE_URL=http://localhost:3001

- Angular admin (`app_admin/src/environments/environment.ts`):
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3001'
};

3) Seed data (choose one)
- Using mongoimport (adjust path/filename to match your `data/` files):
mongoimport --uri="mongodb://localhost:27017/travlr" \
  --collection=trips --file=../data/trips.json --jsonArray
- Or create a simple seed script in `app_api/scripts/` (optional) and run via `npm run seed`.

4) Run services (in separate terminals)
- API:
cd app_api
npm start
# or: npm run dev (if nodemon is configured)
- Customer site:
cd app_server
npm start
- Admin (Angular):
cd app_admin
npm start
# typically runs at http://localhost:4200

5) Open the apps
- Customer site: http://localhost:3000
- Admin SPA: http://localhost:4200 (configured to talk to API on http://localhost:3001)

Note: Exact ports may differ if changed in `.env` or package scripts. Check `package.json` for final commands.

---

## API Overview

Base URL (local): `http://localhost:3001`

- Auth
  - `POST /api/auth/login` — returns `{ token }`
- Trips
  - `GET /api/trips` — list trips (public)
  - `GET /api/trips/:id` — get trip by id (public)
  - `POST /api/trips` — create trip (requires Bearer token)
  - `PUT /api/trips/:id` — update trip (requires Bearer token)
  - `DELETE /api/trips/:id` — delete trip (requires Bearer token)

Example: Login and use token
# Login (replace credentials)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"AdminPass123!"}'

# Use token for protected route
curl http://localhost:3001/api/trips \
  -H "Authorization: Bearer <paste-token-here>"

Typical trip document (example):
{
  "_id": "65a1f...abc",
  "title": "Bali Adventure",
  "price": 1499,
  "nights": 7,
  "tags": ["beach", "asia"],
  "description": "Sun, surf, and temples.",
  "createdAt": "2025-08-01T12:34:56.000Z"
}

---

## Development Workflow

- **Customer site (Express)**
  - Views/Routes render server‑side HTML
  - Fetches data via internal services or the API
- **Admin SPA (Angular)**
  - Services call the API with HttpClient
  - Guard protected routes; attach JWT to requests
- **API (Express + Mongoose)**
  - Controllers validate inputs and return JSON
  - Middleware enforces JWT on protected routes

Recommended scripts (check your `package.json`):
- `npm start` — production server start
- `npm run dev` — development with auto‑reload (nodemon)
- `npm test` — run tests (if configured)
- `npm run build` — production build (Angular admin)

---

## Testing

- Use Postman or cURL to verify:
  1. Public endpoints: `GET /api/trips`, `GET /api/trips/:id`
  2. Auth flow: `POST /api/auth/login`
  3. Protected endpoints with valid/invalid/expired JWTs
  4. Failure cases: missing fields, invalid IDs, unauthorized access

Example protected request:
curl -X POST http://localhost:3001/api/trips \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Iceland Expedition","price":2199,"nights":6}'

---

## Deployment

- **Environment**
  - Set `MONGODB_URI`, `JWT_SECRET`, `PORT`, and CORS origins appropriately.
- **Angular Admin**
  - Production build: `cd app_admin && npm run build` (or `ng build --configuration production`)
  - Host the `dist` output on a static host (Netlify, Vercel, S3, etc.) or behind Nginx.
- **API + Customer Site**
  - Deploy on Node‑compatible platforms (Render, Railway, Fly.io, Heroku‑like)
  - Use process managers (PM2) and enable HTTPS/Reverse proxy as needed
- **MongoDB**
  - Use MongoDB Atlas for managed hosting and network access control

---

## Configuration Reference

- API (.env)
  - `PORT` — API port (default 3001)
  - `MONGODB_URI` — connection string
  - `JWT_SECRET` — strong secret key
  - `CORS_ORIGIN` — allowed origin (e.g., Angular dev URL)

- Customer Site (.env)
  - `PORT` — server‑rendered site port (default 3000)
  - `API_BASE_URL` — API origin

- Admin (environment.ts)
  - `apiBaseUrl` — API origin

---

## Common Troubleshooting

- 401 Unauthorized on admin requests
  - Missing or expired JWT; ensure `Authorization: Bearer <token>` header.
- CORS errors
  - Update `CORS_ORIGIN` in API .env to include your admin URL.
- MongoDB connection errors
  - Verify `MONGODB_URI` and that Mongo is reachable (Atlas IP allowlist/local service).
- Angular cannot reach API
  - Confirm `environment.apiBaseUrl` and that API is running on the specified port.

---

## Roadmap Ideas

- User registrations and bookings on the customer site
- Search, filtering, and pagination
- Role‑based access (admin/editor)
- Centralized validation (e.g., Zod/Joi) and better error contracts
- E2E tests (Cypress/Playwright) and unit tests (Jest/Karma)
- CI/CD pipeline and containerization

---

## Contributing

1. Create a feature branch from `main`.
2. Keep commits scoped and conventional if possible.
3. Open a PR with a clear description and testing notes.

---

## License

No license specified. Consider adding an open‑source license (e.g., MIT) or a private license as appropriate.

---

## Acknowledgements

- CS‑465 Full‑Stack course materials
- Express/Angular/MongoDB communities and documentation

---

### Summary

- Customer site: server‑rendered Express app for SEO and simplicity.
- Admin: Angular SPA for fast, interactive CRUD.
- API: JWT‑protected Express service using MongoDB for flexible data.

With this setup, you can run the API, customer site, and admin independently, iterate quickly, and deploy each piece where it fits best.

