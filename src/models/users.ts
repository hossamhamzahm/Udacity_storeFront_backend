import bcrypt from 'bcrypt';
import client from "../database";
import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: path.join(__dirname, '..', "..", ".env") });


export type User = {
    user_id: Number;
    f_name: string;
    l_name: string;
    user_password?: string;
};




export class UsersStore{
    async index() : Promise<User[]> {
        // client.connect();
        const query : string = 'SELECT * FROM users;';
        let result : User[] = [];
        
        try{
            result = (await client.query(query)).rows;
        }
        catch(e: unknown){
            if(process.env.ENV  == 'dev') console.log(e);
        }

        return result;
    };

    async show(id: string) : Promise<User> {
        // client.connect();
        const query : string = 'SELECT * FROM users WHERE user_id = $1;';
        let result : User[] = [];
        
        try{
            result = (await client.query(query, [id])).rows;
            if(result.length < 1) throw new Error(`can't find user with id ${id}`);
        }
        catch(e: unknown){
            if(process.env.ENV  == 'dev') console.log(e);
        }
        
        return result[0];
    };
    
    async create(user: {f_name: string, l_name: string, user_password: string}) : Promise<User[]> {
        const salt_rounds : string = (process.env.SALT_ROUNDS as unknown) as string;
        const pepper: string = process.env.BCRYPT_SECRET as unknown as string;

        let result: User[] = [];
        
        try{
            const hashed_pass = await bcrypt.hashSync(user.user_password + pepper, parseInt(salt_rounds));
            const query: string = "INSERT INTO users (f_name, l_name, user_password) VALUES ($1, $2, $3) RETURNING *;";
            result = (await client.query(query, [user.f_name, user.l_name, hashed_pass])).rows;
        }
        catch(e: unknown){
            if(process.env.ENV  == 'dev') console.log(e);
        }

        return result; 
    };
};