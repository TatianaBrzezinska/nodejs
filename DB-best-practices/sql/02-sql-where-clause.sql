CREATE TABLE orders (
                        order_id SERIAL PRIMARY KEY,
                        customer_id INT,
                        order_date DATE,
                        amount DECIMAL(10, 2)
);

CREATE TABLE customers (
                           customer_id SERIAL PRIMARY KEY,
                           customer_name VARCHAR(100)
);

INSERT INTO customers (customer_name)
VALUES
    ('John Doe'),
    ('Jane Smith'),
    ('Alice Johnson');

INSERT INTO orders (customer_id, order_date, amount)
VALUES
    (1, '2024-10-01', 150.00),
    (2, '2024-10-02', 200.00),
    (1, '2024-10-05', 300.00);


SELECT DISTINCT c.customer_name
FROM customers c
         JOIN orders o ON c.customer_id = o.customer_id
WHERE o.amount > 100;


SELECT customer_name
FROM customers
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE orders.customer_id = customers.customer_id AND o.amount > 100
);
