# Express API Server

## Overview

This project is an Express.js server that provides APIs for tasks data. The application interacts with a PostgreSQL database and includes unit tests. The setup is configured to run with Docker and Docker Compose.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd express_api
   ```

3. Build and run the containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will:

   - Build the Express API server.
   - Set up the PostgreSQL database with the specified environment variables.
   - Initialize the database with the `init.sql` script.

4. Access the application at `http://localhost:3000`.

### Running the Application

To start the application:

```bash
docker-compose up
```

To stop the application:

```bash
docker-compose down
```

### Running Unit Tests

You can run the tests inside the Docker container:

1. First, get the container ID for the app:

   ```bash
   docker ps
   ```

2. Run the tests inside the app container:
   ```bash
   docker exec -it <app-container-id> npm test
   ```

### HTTP Requests

You can test the API endpoints using tools like Postman, Curl, or HTTP files in VS Code.

Example of an HTTP request to get a task:

```bash
curl -X GET http://localhost:3000/api/task/:id -H "Authorization: Bearer YOUR_TOKEN"
```

### Database Configuration

The database connection is automatically configured through Docker Compose. The environment variables in the `docker-compose.yml` file specify:

- DB_HOST: `db`
- DB_USER: `postgres`
- DB_PASSWORD: `postgres`
- DB_NAME: `express_app`

The MySQL PostgreSQL will be set up with the following configuration:

- Root password: `postgres`
- Database name: `express_app`

### API Documentation

#### `GET /api/task-details/:id`

- Retrieves a task by ID.
- **Response**:
  - 200: Task data
  - 404: Task not found
  - 500: Server error

## License

This project is licensed under the ISC License.
