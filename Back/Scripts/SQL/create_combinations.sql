BEGIN;

INSERT INTO public.combinations
(number, star, star_plus, reference_date, user_id)
VALUES
('{1,2,3,4,5}', '{1,2}', true, '2990-05-05', 1),
('{6,7,8,9,10}', '{4,8}', false, '2990-06-05', 1),
('{12,23,34,45,50}', '{3,12}', true, '2990-05-05', 1),
('{20,22,45,46,47,48,50}', '{1,2,12}', false, '2990-07-05', 1),
('{14,26,31,45,46}', '{1,2}', true, '2990-08-05', 1),
('{1,2,37,40,47}', '{1,2,4,7}', false, '2990-04-05', 1),
('{1,2,3,4,5}', '{1,2,3,4,5}', true, '2990-11-05', 1),
('{12,23,34,45,50}', '{3,12}', true, '2990-06-05', 1),
('{20,22,45,46,47,48,50}', '{1,2,12}', false, '2990-08-05', 1),
('{14,26,31,45,46}', '{1,2}', true, '2990-09-05', 1),
('{1,2,37,40,47}', '{1,2,4,7}', false, '2990-06-05', 1),
('{1,2,3,4,5}', '{1,2,3,4,5}', true, '2990-10-05', 1),
('{1,2,3,4,5,6,7,8,9}', '{1,2}', false, '2990-11-05', 1),
('{1,2,3,4,5,6,7}', '{1,2,4,5,6}', true, '2990-12-05', 1),
('{1,2,3,4,5}', '{1,2,3,4,5,6,7,8,9,10,11,12}', false, '2990-03-05', 1);

END;