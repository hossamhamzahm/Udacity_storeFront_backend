# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products
- An index route to show all products `/products` [GET] 
- A Show route `products/:id` [GET]
- Create a new product `/products` [POST] [token required]
    > the following json body should be sent to the endpoint
```json
{
    "product":{
        "product_name": "name",
        "product_price": "number",
        "product_category": "category"
    }
}
```

#### Users
- An index route to show users `/users` [GET] [token required]
- A Show route `users/:id` [GET] [token required]
- Create a new user `/users` [POST] [token required]
    > the following json body should be sent to the endpoint
```json
{
    "user":{
        "user_password": "password",
        "f_name": "ur first name",
        "l_name": "ur last name"
    }
}
```
- Sign in using `users/` [POST]
    > the following json body should be sent to the endpoint
```json
{
    "user":{
        "user_id": "number",
        "user_password": "password"
    }
}
```


#### Orders
- Current Order by user (args: user id) `/orders/:userID` [GET] [token required]
- ALL Orders `/orders` [token required]

## Data Shapes

#### Product
```sql
CREATE TABLE IF NOT EXISTS products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(40),
    product_price INTEGER,
    product_category VARCHAR(20)
);
```

#### User
```sql
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    user_password VARCHAR(200),
    f_name VARCHAR(20),
    l_name VARCHAR(20)
);
```


#### Orders
```sql
CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY,
    current_order BOOLEAN,
    user_id BIGINT,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

#### Order-products
```sql
CREATE TABLE IF NOT EXISTS order_products(
    order_product_id SERIAL PRIMARY KEY,
    order_id BIGINT,
    product_id BIGINT,
    quantity INTEGER,

    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```
