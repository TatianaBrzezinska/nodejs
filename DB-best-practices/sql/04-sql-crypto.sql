CREATE EXTENSION IF NOT EXISTS pgcrypto;


INSERT INTO public.user (username, password)
VALUES ('username', crypt('plain_password', gen_salt('bf')));