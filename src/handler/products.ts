import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ProductsStore } from "../models/products";


dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });



const create =  async (req: express.Request, res: express.Response) => {
    const productStore = new ProductsStore();
    const result = await productStore.create(req.body.product);
    
    res.send(result)
}


const index = async (req: express.Request, res: express.Response) => {
    const productsStore = new ProductsStore();
    const rows = await productsStore.index();
    res.send(rows);
};


const show = async (req: express.Request, res: express.Response) => {
    const productsStore = new ProductsStore();
    const rows = await productsStore.show(req.params.id as string);
    
    res.send(rows);
};




export default {
    create,
    index,
    show,
}