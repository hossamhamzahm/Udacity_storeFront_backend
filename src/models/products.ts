import { Pool } from "pg";
import bcrypt from 'bcrypt';
import client from "../database";
import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: path.join(__dirname, '..', "..", ".env") });



export type Product = {
    product_id?: Number;
    product_name: string;
    product_price: Number;
    product_category?: string;
};



export class ProductsStore{
    async index() : Promise<Product[]> {
        // client.connect();
        const query : string = 'SELECT * FROM Products;';
        let result : Product[] = [];
        
        try{
            result = (await client.query(query)).rows;
        }
        catch(e){
            console.log(e);
        }
        
        return result;
    };

    async show(id: string) : Promise<Product> {
        // client.connect();
        const query : string = 'SELECT * FROM Products WHERE Product_id = $1;';
        let result : Product[] = [];
        
        try{
            result = (await client.query(query, [id])).rows;
        }
        catch(e){
            console.log(e);
        }
        if(result.length < 1) throw new Error(`can't find Product with id ${id}`);
        
        return result[0];
    };
    
    async create(product: Product) : Promise<Product[]> {
        const query: string = "INSERT INTO Products (product_name, product_price, product_category) VALUES ($1, $2, $3);";
        const result = await client.query(query, [product.product_name, product.product_price, product.product_category]);
        return result.rows; 
    };
};