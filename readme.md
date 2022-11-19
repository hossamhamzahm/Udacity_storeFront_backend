## Configuring the database
- run the following commands to connect to psql as postgres user:

```
su postgres
psql -U postgres
```

- Run the following commands to create the needed users and databases

```
CREATE USER admin WITH PASSWORD 'pass123word';
CREATE DATABASE company;
\c company;
GRANT ALL PRIVILEGES ON DATABASE company TO admin;

CREATE USER test_user WITH PASSWORD 'pass123word';
CREATE DATABASE company_test;
\c company_test;
GRANT ALL PRIVILEGES ON DATABASE company_test TO test_user;
```


- to sign up a new user:
- make a post request to '/users/signup` with the following body
```json
{
    "user":{
        "user_password": "password",
        "f_name": "ur first name",
        "l_name": "ur last name"
    }
}
```


## Products
- to show all prodcuts visit `/products`

- to create a new product make a post request to `/products` (you have to be signed in first) with the following json body
```json
{
    "product":{
        "product_name": "name",
        "product_price": "number",
        "product_category": "category"
    }
}
```