-- Таблиця, яка порушує 2NF
-- Тут ми бачимо, що поле author залежить тільки від назви книги book_title,
-- а не від всього первинного ключа, який складається з book_title та chapter_name.
-- Це порушує 2NF, оскільки є часткова залежність від первинного ключа.

CREATE TABLE BookChapters (
                              book_title VARCHAR(255),
                              author VARCHAR(255),
                              chapter_name VARCHAR(255),
                              content TEXT,
                              PRIMARY KEY (book_title, chapter_name)
);

INSERT INTO BookChapters (book_title, author, chapter_name, content) VALUES
                                                                         ('Harry Potter', 'J.K. Rowling', 'Chapter 1', 'Content of Chapter 1'),
                                                                         ('Harry Potter', 'J.K. Rowling', 'Chapter 2', 'Content of Chapter 2'),
                                                                         ('The Hobbit', 'J.R.R. Tolkien', 'Chapter 1', 'Content of Chapter 1'),
                                                                         ('The Hobbit', 'J.R.R. Tolkien', 'Chapter 2', 'Content of Chapter 2');


-- Після фіксу 2NF
-- Таблиця для книг і авторів
CREATE TABLE Books (
                       book_title VARCHAR(255) PRIMARY KEY,
                       author VARCHAR(255)
);

-- Таблиця для розділів книг
CREATE TABLE BookChapters (
                              book_title VARCHAR(255),
                              chapter_name VARCHAR(255),
                              content TEXT,
                              PRIMARY KEY (book_title, chapter_name),
                              FOREIGN KEY (book_title) REFERENCES Books(book_title)
);

INSERT INTO Books (book_title, author) VALUES
                                           ('Harry Potter', 'J.K. Rowling'),
                                           ('The Hobbit', 'J.R.R. Tolkien');

INSERT INTO BookChapters (book_title, chapter_name, content) VALUES
                                                                 ('Harry Potter', 'Chapter 1', 'Content of Chapter 1'),
                                                                 ('Harry Potter', 'Chapter 2', 'Content of Chapter 2'),
                                                                 ('The Hobbit', 'Chapter 1', 'Content of Chapter 1'),
                                                                 ('The Hobbit', 'Chapter 2', 'Content of Chapter 2');

