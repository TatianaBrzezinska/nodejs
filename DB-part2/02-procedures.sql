CREATE OR REPLACE PROCEDURE add_car()
LANGUAGE plpgsql
AS $$
BEGIN
INSERT INTO Cars (id, model, make, year, owner_id)
VALUES (1, 'Model 3', 'Tesla', 2021, 1);
END;
$$;


CALL add_car();


CREATE OR REPLACE PROCEDURE add_car(
  p_id INT,
  p_model VARCHAR(255),
  p_make VARCHAR(255),
  p_year INT,
  p_owner_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
INSERT INTO Cars (id, model, make, year, owner_id)
VALUES (p_id, p_model, p_make, p_year, p_owner_id);
END;
$$;



CREATE OR REPLACE PROCEDURE add_car(
  p_car JSON
)
LANGUAGE plpgsql
AS $$
BEGIN
INSERT INTO Cars (id, model, make, year, owner_id)
VALUES (
           (p_car->>'id')::INT,
           p_car->>'model',
           p_car->>'make',
           (p_car->>'year')::INT,
           (p_car->>'owner_id')::INT
       );
END;
$$;


CALL add_car('{"id": 3, "model": "X5", "make": "BMW", "year": 2019, "owner_id": 4}');
