-- Таблиця, яка порушує 1NF
CREATE TABLE Students (
                          student_id INT PRIMARY KEY,
                          student_name VARCHAR(255),
                          phone_numbers VARCHAR(255)
);

INSERT INTO Students (student_id, student_name, phone_numbers) VALUES
                                                                   (1, 'Alice', '123456789, 987654321'),
                                                                   (2, 'Bob', '555555555'),
                                                                   (3, 'Charlie', '777777777, 888888888');

-- Після фіксу 1NF
CREATE TABLE Students (
                          student_id INT,
                          student_name VARCHAR(255),
                          phone_number VARCHAR(255),
                          PRIMARY KEY (student_id, phone_number)
);

-- Вставляємо дані
INSERT INTO Students (student_id, student_name, phone_number) VALUES
                                                                  (1, 'Alice', '123456789'),
                                                                  (1, 'Alice', '987654321'),
                                                                  (2, 'Bob', '555555555'),
                                                                  (3, 'Charlie', '777777777'),
                                                                  (3, 'Charlie', '888888888');

