
# NestJS Project with Docker Compose and PostgreSQL

This is a NestJS project that includes a `Users` module, JWT-based authentication guard, and PostgreSQL as the database. The project is set up to run within a Docker environment using Docker Compose.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
- [Authentication Guard](#authentication-guard)
- [Database Schema](#database-schema)
- [Testing](#testing)

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/download/) (optional, for running the application locally without Docker)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make sure Docker is running, as this project uses Docker Compose for PostgreSQL and the application.

## Environment Variables

Create a `.env` file in the project root to define the environment variables needed to run the application. An example `.env` file is as follows:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdatabase
JWT_SECRET=your-secret-key
```

## Running the Application

To run the application with Docker Compose:

1. Start the Docker containers:

   ```bash
   docker-compose up
   ```

   This will start both the NestJS application and PostgreSQL in containers.

2. To run the application without Docker (locally):

   Make sure PostgreSQL is running locally and adjust the `.env` file accordingly. Then run:

   ```bash
   npm run start
   ```

The application will be available at `http://localhost:3000`.

## Endpoints

Here are the available endpoints for the `Users` module:

### Users

- **Create a User**
  ```http
  POST /users
  Content-Type: application/json

  {
    "username": "newuser",
    "password": "newpassword"
  }
  ```

- **Get All Users**
  ```http
  GET /users
  ```

- **Get a User by ID**
  ```http
  GET /users/:id
  ```

- **Update a User**
  ```http
  PUT /users/:id
  Content-Type: application/json

  {
    "username": "updateduser",
    "password": "newpassword"
  }
  ```

- **Delete a User**
  ```http
  DELETE /users/:id
  ```

### Authentication Guard

A custom `AuthGuard` has been implemented to validate JWT tokens for authenticated routes. The guard checks for a token in the `Authorization` header.

To apply the guard to a route:

```typescript
@UseGuards(AuthGuard)
@Post('protected-route')
async protectedRoute() {
  return 'This is a protected route';
}
```

### Token Format:

- The JWT token should be passed in the `Authorization` header as a Bearer token:

  ```
  Authorization: Bearer <token>
  ```

## Database Schema

The PostgreSQL database has the following schema for the `Users` table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

## Testing

To run tests for the application:

```bash
npm run test
```

You can also run end-to-end tests with:

```bash
npm run test:e2e
```

## Docker Compose Setup

The project includes a `docker-compose.yml` file that sets up both the NestJS app and PostgreSQL database in containers. Here’s how it works:

1. **PostgreSQL**: The database service runs in a Docker container, and the database schema is automatically initialized.
2. **NestJS**: The NestJS application runs in a separate container, connected to the database.

### Docker Compose Commands

- To start the application:

  ```bash
  docker-compose up
  ```

- To stop the application:

  ```bash
  docker-compose down
  ```

## License

This project is licensed under the MIT License.
