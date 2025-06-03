# Xeno CRM Backend

## Overview
This is the backend API for the Xeno CRM platform, providing RESTful endpoints for customer management, segmentation, campaign management, authentication, and more. It is built with Node.js, Express, and MongoDB, and supports both Google OAuth and JWT-based authentication.

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ODM)
- **Passport.js** (Google OAuth 2.0, JWT)
- **jsonwebtoken**
- **bcryptjs**
- **dotenv**
- **morgan** (logging)
- **cors**

## Setup Instructions
1. Clone the repository and navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your environment variables.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
- `PORT` - Port to run the server (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `FRONTEND_URL` - URL of the frontend app (for CORS)
- `BACKEND_URL` - (optional) Used for OAuth callback

## Main Dependencies
- express
- mongoose
- passport
- passport-google-oauth20
- passport-jwt
- jsonwebtoken
- bcryptjs
- dotenv
- morgan
- cors

## API Routes & Usage

### Auth Routes (`/api/auth`)
- `POST /signup` - Register a new user (email/password)
- `POST /login` - Login with email/password
- `GET /google` - Start Google OAuth login
- `GET /google/callback` - Google OAuth callback
- `GET /current` - Get current user info (mocked if unprotected)
- `POST /logout` - Logout user

### Customer Routes (`/api/customers`)
- `GET /` - List all customers
- `GET /:id` - Get customer by ID
- `POST /` - Create a new customer
- `PUT /:id` - Update customer by ID
- `DELETE /:id` - Delete customer by ID

### Segment Routes (`/api/segments`)
- `GET /` - List all segments
- `GET /:id` - Get segment by ID
- `POST /` - Create a new segment
- `PUT /:id` - Update segment by ID
- `DELETE /:id` - Delete segment by ID

### Campaign Routes (`/api/campaigns`)
- `GET /` - List all campaigns
- `GET /:id` - Get campaign by ID
- `POST /` - Create a new campaign
- `PUT /:id` - Update campaign by ID
- `DELETE /:id` - Delete campaign by ID

### Communication Log Routes (`/api/communication-logs`)
- `GET /` - List all communication logs
- `GET /:id` - Get log by ID
- `POST /` - Create a new log
- `DELETE /:id` - Delete log by ID

## Authentication
- Google OAuth 2.0 and JWT-based authentication supported.
- Some routes may be unprotected for demo/testing.
- JWT tokens are issued on login and must be sent in the `Authorization` header as `Bearer <token>`.

## Error Handling
- All endpoints return JSON responses.
- Errors are returned with appropriate HTTP status codes and a message.

## Running the Server
```bash
npm run dev
```

---

For more details, see the code and comments in each route and model file. 
