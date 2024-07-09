BEGIN;

DROP TABLE IF EXISTS role, "user", lucky_number, combinations, results, price CASCADE;

CREATE TABLE role (
    id_role SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE combinations(
    id_combinations SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    number INT NOT NULL,
    star INT NOT NULL,
    reference_date DATE NOT NULL,
    star_plus BOOLEAN NOT NULL,
    gain NUMERIC (15, 2)
);

CREATE TABLE lucky_number (
    id_lucky_number SERIAL PRIMARY KEY,
    number INT NOT NULL,
    star INT NOT NULL,
    combinations_id INT,
    FOREIGN KEY (combinations_id) REFERENCES combinations(id_combinations)

);

CREATE TABLE "user" (
    id_user SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR(255),
    role_id INT NOT NULL DEFAULT 2,
    lucky_number_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id_role),
    FOREIGN KEY (lucky_number_id) REFERENCES lucky_number(id_lucky_number)
);

CREATE TABLE results (
    id_results SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    number INT NOT NULL,
    star INT NOT NULL,
    reference_date DATE NOT NULL,
    combinations_id INT,
    FOREIGN KEY (combinations_id) REFERENCES combinations(id_combinations)

);

CREATE TABLE price (
    id_price SERIAL PRIMARY KEY,
    price NUMERIC (15, 2) NOT NULL,
    combinations_id INT,
    FOREIGN KEY (combinations_id) REFERENCES combinations(id_combinations)

);


COMMIT;