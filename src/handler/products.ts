import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ProductsStore } from "../models/products";


dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });



const create =  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const productStore = new ProductsStore();

    try{
        const result = await productStore.create(req.body.product);
        res.send(result)
    }
    catch(e: unknown){
        next(e);
    }
}


const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const productsStore = new ProductsStore();

    try{
        const rows = await productsStore.index();
        res.send(rows);
    }
    catch(e: unknown){
        next(e);
    }
};


const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const productsStore = new ProductsStore();

    try{
        const rows = await productsStore.show(req.params.id as string);
        res.send(rows);
    }
    catch(e: unknown){
        next(e);
    }
};




export default {
    create,
    index,
    show,
}