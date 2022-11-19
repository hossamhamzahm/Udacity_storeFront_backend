CREATE TABLE IF NOT EXISTS products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(40),
    product_price INTEGER,
    product_category VARCHAR(20)
);


INSERT INTO products (product_name, product_price, product_category) 
    VALUES ('Jacket', 25, 'Clothing');

INSERT INTO products (product_name, product_price, product_category) 
    VALUES ('T-shirt', 15, 'Clothing');

INSERT INTO products (product_name, product_price, product_category) 
    VALUES ('Apple', 2, 'Food');

INSERT INTO products (product_name, product_price, product_category) 
    VALUES ('Banana', 3, 'Food');