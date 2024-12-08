-- Start docker compose from Db-part1

-- Сценарій із використанням Read Committed:
-- SESSION 1
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;
UPDATE cars SET make = 'Honda' WHERE id = 1;

-- SESSION 2
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT * FROM cars WHERE id = 1;

-- Сценарій із використанням Repeatable Read:
-- SESSION 1
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
UPDATE cars SET make = 'Ford' WHERE id = 1;

-- SESSION 2
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT * FROM cars WHERE id = 1;

-- Сценарій із використанням SERIALIZABLE:
-- SESSION 1
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT SUM(owner_id) FROM cars WHERE make = 'Toyota';
INSERT INTO cars (id, model, make, year, owner_id) VALUES (101, 'NewModel', 'Toyota', 2024, 10);
COMMIT;

-- SESSION 2
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT SUM(owner_id) FROM cars WHERE make = 'Honda';
INSERT INTO cars (id, model, make, year, owner_id) VALUES (102, 'NewModel1', 'Honda', 2024, 20);
COMMIT;
