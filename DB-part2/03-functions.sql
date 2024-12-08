CREATE OR REPLACE FUNCTION replace_x_models(input_str VARCHAR)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
BEGIN
  IF input_str LIKE '%X3%' THEN
    RETURN REPLACE(input_str, 'X3', 'X3 (suv)');
  ELSIF input_str LIKE '%X5%' THEN
    RETURN REPLACE(input_str, 'X5', 'X5 (suv)');
  ELSIF input_str LIKE '%X7%' THEN
    RETURN REPLACE(input_str, 'X7', 'X7 (suv)');
ELSE
    RETURN input_str;
END IF;
END;
$$;

SELECT replace_x_models('This is BMW X3');


SELECT NOW()