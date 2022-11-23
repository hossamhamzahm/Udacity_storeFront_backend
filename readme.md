> Note! the express application is running on port 3000 and the database is running on port 5432

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


> use the following jwt in your requests to be authenticated:
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOiJob3NzYW0iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NjkwMDgxMDZ9.NPsEHnSGle56-hD6IxUbWIl55tKk2KZL97WkUUyIkSM`

<br>

> before running any command, you must make a `.env` file with the following environmental variables:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432

DB_USER=admin
TEST_DB_USER=test_user

DB_PASSWORD=pass123word
TEST_DB_PASSWORD=pass123word

DB_NAME=company
TEST_DB_NAME=company_test

ENV=test

SALT_ROUNDS=10
BCRYPT_SECRET=THISSHOULDBEASECRETE
TOKEN_SECRET=THISSHOULDBEASECRETE
```


### To watch the server run
`npm run watch`

### To run tests use
`npm run tests`


### to apply all migrations run
`npx db-migrate --env test up`

### to reset all migrations run
`npx db-migrate --env test reset`