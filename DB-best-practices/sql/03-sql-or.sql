BEGIN;
CREATE TABLE example_table (
                               id SERIAL PRIMARY KEY,
                               example_text VARCHAR(255)
);


INSERT INTO example_table (example_text) VALUES
                                             ('text1'),
                                             ('text2'),
                                             ('text3'),
                                             ('text4'),
                                             ('text5'),
                                             ('text6'),
                                             ('text7'),
                                             ('text8'),
                                             ('text9');

SELECT *
FROM example_table
WHERE
    example_text = 'text1' OR
    example_text = 'text2' OR
    example_text = 'text3' OR
    example_text = 'text4' OR
    example_text = 'text5' OR
    example_text = 'text6' OR
    example_text = 'text7' OR
    example_text = 'text8';


-- SELECT *
-- FROM example_table
-- WHERE example_text IN ('text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8');

ROLLBACK;