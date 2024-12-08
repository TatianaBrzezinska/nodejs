CREATE TABLE IF NOT EXISTS files (
                                     id SERIAL PRIMARY KEY,
                                     filename VARCHAR(255) NOT NULL,
    data BYTEA NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO files (filename, data)
VALUES
    ('file1.txt', decode('48656c6c6f2c20576f726c6421', 'hex')),
    ('file2.txt', decode('546573742066696c6520636f6e74656e74', 'hex')),
    ('file3.txt', decode('4461746120666f722074686972642066696c65', 'hex'));

CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS permissions (
                                           id SERIAL PRIMARY KEY,
                                           name VARCHAR(50) UNIQUE NOT NULL
    );

CREATE TABLE IF NOT EXISTS acl (
                                   id SERIAL PRIMARY KEY,
                                   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE (user_id, permission_id)
    );

INSERT INTO permissions (name)
VALUES
    ('view_car'),
    ('create_listing'),
    ('edit_listing'),
    ('delete_listing'),
    ('view_all_listings'),
    ('manage_users'),
    ('approve_listing'),
    ('reject_listing'),
    ('feature_listing'),
    ('view_reports'),
    ('generate_report'),
    ('access_admin_panel'),
    ('contact_seller'),
    ('place_bid'),
    ('view_statistics');

INSERT INTO users (username, password_hash)
VALUES
    ('alice', '123'),
    ('bob', '123'),
    ('carol', '123');

INSERT INTO acl (user_id, permission_id)
VALUES
    (1, (SELECT id FROM permissions WHERE name = 'view_car')),
    (1, (SELECT id FROM permissions WHERE name = 'create_listing')),
    (1, (SELECT id FROM permissions WHERE name = 'edit_listing')),
    (1, (SELECT id FROM permissions WHERE name = 'delete_listing')),
    (1, (SELECT id FROM permissions WHERE name = 'contact_seller')),
    (1, (SELECT id FROM permissions WHERE name = 'place_bid'));

INSERT INTO acl (user_id, permission_id)
VALUES
    (2, (SELECT id FROM permissions WHERE name = 'view_car')),
    (2, (SELECT id FROM permissions WHERE name = 'view_all_listings')),
    (2, (SELECT id FROM permissions WHERE name = 'approve_listing')),
    (2, (SELECT id FROM permissions WHERE name = 'reject_listing')),
    (2, (SELECT id FROM permissions WHERE name = 'view_reports'));

INSERT INTO acl (user_id, permission_id)
VALUES
    (3, (SELECT id FROM permissions WHERE name = 'view_car')),
    (3, (SELECT id FROM permissions WHERE name = 'view_all_listings')),
    (3, (SELECT id FROM permissions WHERE name = 'manage_users')),
    (3, (SELECT id FROM permissions WHERE name = 'approve_listing')),
    (3, (SELECT id FROM permissions WHERE name = 'reject_listing')),
    (3, (SELECT id FROM permissions WHERE name = 'feature_listing')),
    (3, (SELECT id FROM permissions WHERE name = 'view_reports')),
    (3, (SELECT id FROM permissions WHERE name = 'generate_report')),
    (3, (SELECT id FROM permissions WHERE name = 'access_admin_panel')),
    (3, (SELECT id FROM permissions WHERE name = 'view_statistics'));
