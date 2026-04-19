# CampusConnect

A web platform built for University of Florida students to discover campus events, connect with organizations, and RSVP — all in one place.

## Team

| Name | Role |
|------|------|
| Daniel Gleeson | Scrum Master |
| Frank Ascencio | Product Manager |
| Jaiden Twyman | Development Team |
| Khan Alam | Development Team |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript (Vite) |
| Backend | Node.js + Express |
| Database | PostgreSQL (Neon) |
| Containerization | Docker + Docker Compose |

---

## Features

- **Event Discovery** — Browse upcoming campus events with title, date, time, location, and description
- **Search & Filter** — Live search by title, location, or description; filter by date range (this week / this month)
- **User RSVP** — Logged-in users can sign up for events and cancel at any time; each event displays a live attendee count
- **Admin Controls** — Admins can create, edit, and delete events
- **About Page** — Project mission and team information
- **Authentication** — JWT-based login and sign up with privilege levels (user, organization, admin)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional, for containerized deployment)
- A Neon PostgreSQL database — set the connection string in `server/.env`

### Environment Variables

Create a `server/.env` file with the following:

```env
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Local Development (Recommended)

Run both the frontend and backend together from the project root:

```bash
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

### Docker (Deployment)

```bash
docker compose up --build
```

---

## Project Structure

```
CampusConnect/
├── client/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Navbar, Events, SearchBar, modals, AuthContext
│   │   ├── pages/          # Home, Login, SignUp, About, Organizations
│   │   └── styles/         # CSS stylesheets
│   └── vite.config.ts
├── server/                 # Node.js + Express backend
│   └── src/
│       ├── server.js       # API routes and server entry point
│       ├── db/             # Database connection (Neon/pg)
│       └── middleware/     # JWT auth middleware
├── docker-compose.yml
└── package.json            # Root dev script (concurrently)
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/signup` | No | Register a new user |
| POST | `/api/login` | No | Log in and receive a JWT |
| GET | `/api/get-events` | No | Get all events with RSVP counts |
| POST | `/api/create-event` | Admin | Create a new event |
| POST | `/api/update-event` | Admin | Update an existing event |
| DELETE | `/api/delete-event` | Admin | Delete an event |
| GET | `/api/my-rsvps` | Yes | Get event IDs the current user signed up for |
| POST | `/api/rsvp` | Yes | Sign up for an event |
| DELETE | `/api/rsvp` | Yes | Cancel an RSVP |

---

## Database Schema

```sql
users (id, email, password_hash, name, privilege)
events (id, title, date, time, location, description)
event_signups (id, user_id, event_id)  -- unique(user_id, event_id)
```
