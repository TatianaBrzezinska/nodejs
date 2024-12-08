-- 3NF

-- Тут ми маємо таблицю, яка містить інформацію про студентів.
-- Проблема полягає в тому, що поле dean_name залежить транзитивно від первинного ключа student_id.
-- В результаті є транзитивна залежність:
-- student_id → faculty_name,
-- а потім faculty_name → dean_name.
-- Це порушує 3NF, тому що dean_name залежить від неключового атрибута faculty_name, а не безпосередньо від ключа student_id.

CREATE TABLE Students (
                          student_id INT PRIMARY KEY,
                          student_name VARCHAR(255),
                          faculty_name VARCHAR(255),
                          dean_name VARCHAR(255)
);

INSERT INTO Students (student_id, student_name, faculty_name, dean_name) VALUES
                                                                             (1, 'Alice', 'Engineering', 'Dr. Smith'),
                                                                             (2, 'Bob', 'Engineering', 'Dr. Smith'),
                                                                             (3, 'Charlie', 'Science', 'Dr. Johnson');


-- Після фіксу 3NF


CREATE TABLE Faculties (
                           faculty_name VARCHAR(255) PRIMARY KEY,
                           dean_name VARCHAR(255)
);

CREATE TABLE Students (
                          student_id INT PRIMARY KEY,
                          student_name VARCHAR(255),
                          faculty_name VARCHAR(255),
                          FOREIGN KEY (faculty_name) REFERENCES Faculties(faculty_name)
);
INSERT INTO Faculties (faculty_name, dean_name) VALUES
                                                    ('Engineering', 'Dr. Smith'),
                                                    ('Science', 'Dr. Johnson');

INSERT INTO Students (student_id, student_name, faculty_name) VALUES
                                                                  (1, 'Alice', 'Engineering'),
                                                                  (2, 'Bob', 'Engineering'),
                                                                  (3, 'Charlie', 'Science');
