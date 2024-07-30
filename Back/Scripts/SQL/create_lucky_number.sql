BEGIN;

INSERT INTO public.lucky_number
(number, star, user_id)
VALUES
('{2,12,16,17,19,20,21,23,34,35,42}', '{2,3,6,7}', 1);

END;