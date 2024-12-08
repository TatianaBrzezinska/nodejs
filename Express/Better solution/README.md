
# Express API Server

## Overview
This project is an Express.js server that provides APIs for user-related data. The application interacts with a MySQL database and includes unit tests using Jest and Supertest. The setup is configured to run with Docker and Docker Compose.

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
   cd express-api-server
   ```

3. Build and run the containers using Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will:
    - Build the Express API server.
    - Set up the MySQL database with the specified environment variables.
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

Example of an HTTP request to get a user:

```bash
curl -X GET http://localhost:3000/api/users/1 -H "Authorization: Bearer YOUR_TOKEN"
```

### Database Configuration
The database connection is automatically configured through Docker Compose. The environment variables in the `docker-compose.yml` file specify:

- DB_HOST: `mysql`
- DB_USER: `root`
- DB_PASSWORD: `password`
- DB_NAME: `mydatabase`

The MySQL database will be set up with the following configuration:
- Root password: `password`
- Database name: `mydatabase`

### API Documentation

#### `GET /api/users/:id`
- Retrieves a user by ID.
- **Response**:
    - 200: User data
    - 404: User not found
    - 500: Server error

## License
This project is licensed under the ISC License.
