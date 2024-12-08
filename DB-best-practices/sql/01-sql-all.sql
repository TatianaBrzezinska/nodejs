CREATE TABLE users (
                       user_id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
                          profile_id SERIAL PRIMARY KEY,
                          user_id INT REFERENCES users(user_id),
                          first_name VARCHAR(50),
                          last_name VARCHAR(50),
                          bio TEXT
);

INSERT INTO users (username, password, email)
VALUES
    ('john_doe', 'password123', 'john.doe@example.com'),
    ('jane_smith', 'password456', 'jane.smith@example.com');

INSERT INTO profiles (user_id, first_name, last_name, bio)
VALUES
    (1, 'John', 'Doe', 'Software engineer with 5 years of experience.'),
    (2, 'Jane', 'Smith', 'Data scientist specializing in machine learning.');


SELECT *
FROM users;

SELECT user_id, username, email
FROM users;