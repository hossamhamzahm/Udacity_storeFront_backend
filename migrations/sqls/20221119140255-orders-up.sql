CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY,
    current_order BOOLEAN,
    user_id BIGINT,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO orders (current_order, user_id)
    VALUES (FALSE, 1);

INSERT INTO orders (current_order, user_id)
    VALUES (FALSE, 1);

INSERT INTO orders (current_order, user_id)
    VALUES (FALSE, 1);

INSERT INTO orders (current_order, user_id)
    VALUES (TRUE, 1);