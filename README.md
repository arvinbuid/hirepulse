# HirePulse

A full stack MERN application for managing and tracking job applications.

## Features

- Job Listing CRUD
- Authentication
- Profile Avatar Upload
- Job Search
- Interactive Jobs Stats with Charts
- Admin Panel
- Dark/Light mode
- Demo User

## Usage

#### Install npm dependencies

```
npm setup-project
```

#### Add .env Variables

Rename the `.env.example` file to `.env` and add your database and cloudinary credentials.

```bash
NODE_ENV=
PORT=
JWT_SECRET=
JWT_EXPIRES_IN=
MONGO_URL=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

### Run

```bash

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
node dist/server.js

Open [http://localhost:5173] with your browser to see the result.
```
