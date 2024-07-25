BEGIN;

DROP TABLE IF EXISTS role, "user", lucky_number, combinations, results, price, next_game CASCADE;

CREATE TABLE role (
    id_role SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE next_game (
    id_next_game SERIAL PRIMARY KEY,
    reference_date DATE NOT NULL,
    jackpot NUMERIC (15, 2) NOT NULL
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
    reset_token VARCHAR(255),
    reset_token_expiry BIGINT,
    FOREIGN KEY (role_id) REFERENCES role(id_role),
    gain NUMERIC (15, 2),
    loss NUMERIC (15, 2)
);

CREATE TABLE combinations(
    id_combinations SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    number INT[] NOT NULL,
    star INT[] NOT NULL,
    star_plus BOOLEAN NOT NULL,
    reference_date DATE NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "user"(id_user) ON DELETE CASCADE
);

CREATE TABLE lucky_number (
    id_lucky_number SERIAL PRIMARY KEY,
    number INT[] NOT NULL,
    star INT[] NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES "user"(id_user) ON DELETE CASCADE

);


CREATE TABLE results (
    id_results SERIAL PRIMARY KEY,
    number INT[] NOT NULL,
    star INT[] NOT NULL,
    reference_date DATE NOT NULL

);

CREATE TABLE price (
    id_price SERIAL PRIMARY KEY,
    price NUMERIC (15, 2) NOT NULL,
    combinations_id INT,
    FOREIGN KEY (combinations_id) REFERENCES combinations(id_combinations)

);


COMMIT;