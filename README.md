# Notifications Challenge - Gila Software

## Backend Installation

Prerequisites
- node version 20.9.0
- docker

1. Rename "env.example" file to ".env" and set POSTGRES_USER, POSTGRES_PASSWORD.
The last variable sets the password for the "test" user for authentication purposes.

2. Run docker compose up to start the database:
```bash
docker compose up -d
```

3. Install dependencies:
```bash
npm install
```

4. Run the migrations (ensure database is up before running):
```bash
npm run migration:up
```

4. Seed the database with the 3 categories mentioned in the challenge and 2 users suscribed to different categories and channels for testing purposes (ensure the database is up and migrations have been run):
```bash
npm run seed
```

5. To run the app:
```bash
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```

## Backend documentation

Documentation of the API entpoints can be found at **/api/v1/docs** (http://localhost:3000/api/v1/docs)

I have used [Nest](https://github.com/nestjs/nest) framework.

## Front installation

1. Rename "env.example" file to ".env" and ensure VITE_API_URL has the correct URL to the backend API.

2. Install dependencies:
```bash
npm install
```

3. To run the app:
```bash
$ npm run dev
```