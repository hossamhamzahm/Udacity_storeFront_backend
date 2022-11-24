CREATE TABLE IF NOT EXISTS order_products(
    order_id BIGINT,
    product_id BIGINT,
    quantity INTEGER,

    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    PRIMARY KEY (order_id, product_id)
);



INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (1, 1, 1);

INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (1, 2, 1);

INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (2, 3, 1);

INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (2, 4, 3);



INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (4, 4, 3);


INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (4, 3, 3);

INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (3, 3, 2);


INSERT INTO order_products (order_id, product_id, quantity)
    VALUES (3, 4, 1);