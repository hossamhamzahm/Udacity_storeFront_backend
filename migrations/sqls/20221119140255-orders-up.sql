CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY,
    order_status BOOLEAN,
    user_id BIGINT,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO orders (order_status, user_id)
    VALUES (FALSE, 1);

INSERT INTO orders (order_status, user_id)
    VALUES (FALSE, 1);

INSERT INTO orders (order_status, user_id)
    VALUES (TRUE, 1);

INSERT INTO orders (order_status, user_id)
    VALUES (TRUE, 1);