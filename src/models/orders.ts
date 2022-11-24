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
    current_order: Boolean;
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
            if(process.env.ENV  == 'dev') console.log(e);
        }
        
        return result;
    };

    async show_current(user_id: string) : Promise<Order[]> {
        const query: string = `
        SELECT orders.order_id, product_name, product_category, product_price, quantity  FROM orders
        INNER JOIN users
        ON users.user_id = orders.user_id

        INNER JOIN order_products
        ON order_products.order_id = orders.order_id

        INNER JOIN products
        ON products.product_id = order_products.product_id

        WHERE orders.current_order = true AND users.user_id = $1;`;

        let result: Order[] = [];
        try{
            result = (await client.query(query, [user_id])).rows;
            result.forEach(item => {
                delete item['user_password']
            })
        }
        catch(e: unknown){
            if(process.env.ENV  == 'dev') console.log(e);
        }

        return result;
    };

    async add_product(user_id: string, product_id: string) : Promise<Order[]> {
        const current_order = await this.show_current(user_id);

        const query: string = `
            INSERT INTO order_products (order_id, product_id, quantity)
            VALUES ($1, $2, 1)
            ON CONFLICT (order_id, product_id)
            DO UPDATE
            SET quantity = order_products.quantity +1 RETURNING *;
        `;

        let result: Order[] = [];
        try{
            result = (await client.query(query, [current_order[0].order_id, product_id])).rows;
        }
        catch(e: unknown){
            if(process.env.ENV  == 'dev') console.log(e);
        }
        return result;
    };

};