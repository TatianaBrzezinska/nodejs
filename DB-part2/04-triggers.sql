CREATE OR REPLACE FUNCTION update_bmw_full_name()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.make = 'BMW' THEN
    NEW.make := 'Bayerische Motoren Werke';
END IF;

RETURN NEW;
END;
$$;


CREATE TRIGGER cars_bmw_trigger
    BEFORE INSERT OR UPDATE ON Cars
                         FOR EACH ROW
                         EXECUTE FUNCTION update_bmw_full_name();


INSERT INTO Cars (id, model, make, year, owner_id)
VALUES (8, 'X3', 'BMW', 2022, 2);