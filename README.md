# DevTinder

DevTinder is a Node.js-based social platform for developers to connect, inspired by Tinder. Users can create profiles, send connection requests, and manage their connections.

## Features

- User authentication (signup, login, logout)
- Profile management (view, edit, change password)
- Send and review connection requests
- User feed excluding existing connections

## API Endpoints

### Auth
- `POST /signup` — Register a new user
- `POST /login` — Login and receive JWT token
- `POST /logout` — Logout user

### Profile
- `GET /profile/view` — View logged-in user profile
- `PATCH /profile/edit` — Edit profile fields
- `PATCH /profile/password` — Change password

### Connection Requests
- `POST /request/sent/:status/:toUserId` — Send a connection request (`interested` or `ignored`)
- `POST /request/review/:status/:requestId` — Accept or reject a received request

### User
- `GET /user/connections` — List all accepted connections
- `GET /user/request/received` — List received connection requests
- `GET /user/feed` — Get user feed (users not yet connected)

## Status Values

- `interested`
- `ignored`
- `accepted`
- `rejected`

## Getting Started

1. Clone the repo
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up MongoDB connection in `src/config/database.js`
4. Start the server:
   ```sh
   npm run dev
   ```
5. API runs on `http://localhost:3000`

## Folder Structure

- `src/app.js` — Main app entry
- `src/models/` — Mongoose models
- `src/routes/` — Express routers
- `src/middlewares/` — Auth middleware
- `src/utils/` — Validation utilities
- `src/config/` — Database config

## License

ISC

---
