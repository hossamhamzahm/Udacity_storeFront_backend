import { Pool } from "pg";
import bcrypt from 'bcrypt';
import client from "../database";
import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: path.join(__dirname, '..', "..", ".env") });


export type Order = {
    user_id?: Number;
    order_id?: Number;
    f_name?: string;
    l_name?: string;
    user_password?: string;
    order_status: Boolean;
};




export class OrdersStore{
    async index() : Promise<Order[]> {
        const query : string = `
        SELECT * FROM orders
        INNER JOIN users
        ON users.user_id = orders.user_id
        INNER JOIN products
        ON products.product_id = orders.order_id;`;

        let result : Order[] = [];
        
        try{
            result = (await client.query(query)).rows;
            result.forEach(item => {
                delete item['user_password']
            })
        }
        catch(e){
            console.log(e);
        }
        
        return result;
    };

    async show_current() : Promise<Order[]> {
        const query : string = `
        SELECT * FROM orders
        INNER JOIN users
        ON users.user_id = orders.user_id
        INNER JOIN products
        ON products.product_id = orders.order_id
        WHERE orders.order_status = true;`;

        let result : Order[] = [];
        
        try{
            result = (await client.query(query)).rows;
            result.forEach(item => {
                delete item['user_password']
            })
        }
        catch(e){
            console.log(e);
        }
        
        return result;
    };
};