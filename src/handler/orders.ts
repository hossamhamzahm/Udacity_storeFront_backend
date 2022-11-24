import express from "express";
import dotenv from "dotenv";
import path from "path";
import { OrdersStore } from "../models/orders";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const productsStore = new OrdersStore();

    try{
        const rows = await productsStore.index();
        res.send(rows);
    }
    catch(e: unknown){
        next(e);
    }
};

const show_current = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const productsStore = new OrdersStore();

    try{
        const rows = await productsStore.show_current(req.params.userID as string);
        res.send(rows);
    }
    catch(e: unknown){
        next(e);
    }
};


const add_product = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const productsStore = new OrdersStore();

    try{
        const rows = await productsStore.add_product(req.params.userID as string,req.params.productID as string);
        res.send(rows);
    }
    catch(e: unknown){
        next(e);
    }
};

export default {
    index,
    show_current,
    add_product,
};
