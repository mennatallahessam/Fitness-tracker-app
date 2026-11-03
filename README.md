# 🏋️ FitTrack — Full-Stack Fitness Tracker

FitTrack is a full-stack web application built with **Vue 3**, **TypeScript**, **Express**, and **Supabase (PostgreSQL)**. It enables users to log workouts, track fitness statistics across time periods, tag and follow friends' activities, and manage users via role-based access control (`user`, `trainer`, `admin`).

---

## 📁 Repository Structure

```text
├── client/                     # Vue 3 + TypeScript + Vite SPA frontend
│   ├── public/                 # Static public assets
│   └── src/
│       ├── api/                # Centralized REST API client & JWT session helpers
│       ├── assets/             # Global styles
│       ├── components/         # Reusable UI components (NavBar, DialogModal)
│       ├── composables/        # Vue composables (useDialog)
│       ├── router/             # Vue Router configuration & auth guards
│       ├── stores/             # Pinia state stores (auth, users, activities, exerciseTypes)
│       ├── types/              # Shared TypeScript interfaces (User, Activity, ExerciseType)
│       ├── utils/              # Formatting & calculation utilities
│       ├── views/              # Page views (Home, Login, Register, Dashboard, Activities, Friends, Statistics, Admin)
│       ├── App.vue             # Root Vue component
│       └── main.ts             # Application entry point
├── server/                     # Express + TypeScript REST API backend
│   ├── controllers/            # Express route controllers (auth, users, activities, exerciseTypes)
│   ├── db/                     # Database layer (Supabase client, SQL schema, seed script, connection test)
│   ├── middleware/             # JWT authentication & role authorization middleware
│   ├── models/                 # Domain data models (users, activities, exerciseTypes)
│   ├── types/                  # Backend TypeScript types & response envelopes
│   └── index.ts                # Express server entry point
├── no-framework/               # Standalone HTML + Bulma CSS reference prototype
├── docs/                       # Project documentation & screenshots
│   ├── screenshots/            # Application UI screenshots & walkthrough recording
│   ├── WALKTHROUGH.md          # Visual feature walkthrough
│   ├── SUPABASE_SETUP.md       # Supabase database setup & API reference
│   └── PROJECT_STRUCTURE_GUIDE.md
├── package.json                # Root workspace scripts (dev, build, start, seed)
└── render.yaml                 # Render deployment blueprint
```

---

## 🚀 Quick Start

### 1. Install Dependencies

From the repository root, install dependencies for the root workspace, `client`, and `server`:

```bash
npm run install:all
```

### 2. Configure Environment Variables

Copy `server/.env.example` to `server/.env` (and root `.env` if running from root) and add your Supabase credentials:

```env
PORT=3000
JWT_SECRET=your-secret-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

> See [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) for full database setup instructions and the SQL schema (`server/db/schema.sql`).

### 3. Seed the Database (Optional)

Populate default demo users (`menna` [admin], `sara` [trainer], `jessy` [user] — password: `password`), exercise types, and sample activities:

```bash
npm run seed
```

### 4. Run in Development Mode

Starts both the Vite frontend dev server and the Express API server concurrently:

```bash
npm run dev
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run install:all` | Install dependencies for both `client/` and `server/` |
| `npm run dev` | Run client (Vite) and server (`tsx watch`) concurrently |
| `npm run build` | Type-check and build the Vue 3 client into `client/dist/` |
| `npm start` | Start the production Express server (`server/index.ts`) |
| `npm run seed` | Seed Supabase with demo users, exercise types, and activities |
| `npm run db:test` | Test the Supabase database connection |

---

## 📚 Documentation

- **[Visual Walkthrough & Screenshots](docs/WALKTHROUGH.md)**
- **[Supabase Setup & API Endpoints](docs/SUPABASE_SETUP.md)**
- **[Deep-Dive Architecture Guide](docs/PROJECT_STRUCTURE_GUIDE.md)**

