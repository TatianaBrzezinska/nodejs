CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO migration_history (migration_name) VALUES ('create_comments_table');



DROP TABLE IF EXISTS helper_data;

CREATE TABLE helper_data (
    id SERIAL PRIMARY KEY,
    key VARCHAR(50) NOT NULL,
    value VARCHAR(255) NOT NULL
);


INSERT INTO helper_data (key, value) VALUES
('setting_1', 'value_1'),
('setting_2', 'value_2'),
('setting_3', 'value_3');
