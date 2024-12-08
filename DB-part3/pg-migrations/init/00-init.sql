CREATE TABLE IF NOT EXISTS migration_history (
    id SERIAL PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL,
    applied_at TIMESTAMP DEFAULT NOW()
);