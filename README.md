# Users Articles

A side project to test out clean code, express, building my own mock db

## Features

1. User registration/login system with [Passport](https://www.passportjs.org/)
   using Local Strategy with JWT token implementaion.
2. Protected routes with authmiddleware that checks for JWT validation using
   [expressJWT](https://github.com/auth0/express-jwt)
3. Mocked database, so no database is required.
4. Auto generated fake data for users and users posts.
5. Cron job that runs every minute (can be modified) to drop database and seed
   new data every 1 hour.

## Routes

### Auth

1. POST [/api/auth/register](http://localhost:4000/api/auth/login)
2. POST [/api/auth/login](http://localhost:4000/api/auth/login)
3. GET (JWT Protected) [/api/auth/me](http://localhost:4000/api/auth/me)

### Posts

1. GET [/api/posts](http://localhost:4000/api/posts)
2. GET [/api/posts/1](http://localhost:4000/api/posts/1)
3. GET
   [/api/posts/:authorId](http://localhost:4000/api/posts/ebe78167-00d3-400c-ae56-d410ee3ffe91)
4. POST (JWT Protected) [/api/posts/add](http://localhost:4000/api/posts/add)
5. PUT (JWT Protected) [/api/posts/1](http://localhost:4000/api/posts/1)
6. DELETE (JWT Protected) [/api/posts/1](http://localhost:4000/api/posts/1)

To run in development mode

```bash
npm start
```

To build

```bash
npm run build
```
