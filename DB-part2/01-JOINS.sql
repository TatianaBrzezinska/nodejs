CREATE TABLE IF NOT EXISTS Cars (
  id INT PRIMARY KEY,
  model VARCHAR(255),
  make VARCHAR(255),
  year INT,
  owner_id INT
);


CREATE TABLE IF NOT EXISTS Owners (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(255)
);


INSERT INTO Cars (id, model, make, year, owner_id) VALUES
(1, 'Model S', 'Tesla', 2020, 1),
(2, 'Civic', 'Honda', 2018, 2),
(3, 'Corolla', 'Toyota', 2019, 3),
(4, 'Mustang', 'Ford', 2021, NULL),
(5, 'Accord', 'Honda', 2020, 4),
(6, 'Camry', 'Toyota', 2017, 5);


INSERT INTO Owners (id, name, city) VALUES
(1, 'John Doe', 'New York'),
(2, 'Jane Smith', 'Los Angeles'),
(3, 'Michael Johnson', 'Chicago'),
(4, 'Emily Davis', 'San Francisco'),
(7, 'Chris Brown', 'Boston');

-- Пояснення: Повертаються лише автомобілі з власниками, які є в обох таблицях.
-- INNER JOIN
SELECT Cars.model, Cars.make, Owners.name, Owners.city
FROM Cars
INNER JOIN Owners ON Cars.owner_id = Owners.id;

-- Пояснення: Повертаються всі автомобілі, навіть якщо у них немає власника (наприклад, для Mustang).
-- LEFT JOIN
SELECT Cars.model, Cars.make, Owners.name, Owners.city
FROM Cars
LEFT JOIN Owners ON Cars.owner_id = Owners.id;

-- Пояснення: Повертаються всі власники, навіть якщо у них немає автомобіля (наприклад, для Chris Brown)
-- RIGHT JOIN
SELECT Cars.model, Cars.make, Owners.name, Owners.city
FROM Cars
RIGHT JOIN Owners ON Cars.owner_id = Owners.id;

-- Пояснення: Повертаються всі автомобілі та всі власники, навіть якщо немає відповідностей. Наприклад, для Mustang немає власника, а для Chris Brown немає автомобіля.
-- FULL OUTER JOIN
SELECT Cars.model, Cars.make, Owners.name, Owners.city
FROM Cars
FULL OUTER JOIN Owners ON Cars.owner_id = Owners.id;
