CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    user_password VARCHAR(200),
    f_name VARCHAR(20),
    l_name VARCHAR(20)
);

INSERT INTO users (f_name, l_name, user_password) 
    VALUES (
        'hossam',
        'hamza',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaG9zc2FtIiwiaWF0IjoxNjY4NzkxOTI3fQ.LC_38fHUPDiTbOV6vC-pPDJ_AWtGK9cgAxg16vp7Jcw'
    );