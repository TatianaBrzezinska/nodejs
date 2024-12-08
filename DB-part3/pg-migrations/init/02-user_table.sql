CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO migration_history (migration_name) VALUES ('create_users_table');
COMMIT;


BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

--  DO $$
--  BEGIN
--      IF NOT EXISTS (SELECT 1 FROM migration_history WHERE migration_name = 'create_users_table') THEN
--          INSERT INTO migration_history (migration_name) VALUES ('create_users_table');
--      END IF;
--  END $$;
