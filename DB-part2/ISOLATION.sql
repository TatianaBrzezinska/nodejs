-- To reproduce
-- docker exec -it <container name> bash
-- psql -U user -d mydb

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
