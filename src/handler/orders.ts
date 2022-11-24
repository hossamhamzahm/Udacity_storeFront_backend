import express from "express";
import dotenv from "dotenv";
import path from "path";
import { OrdersStore } from "../models/orders";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const index = async (req: express.Request, res: express.Response) => {
    const productsStore = new OrdersStore();
    const rows = await productsStore.index();
    res.send(rows);
};

const show_current = async (req: express.Request, res: express.Response) => {
    const productsStore = new OrdersStore();
    const rows = await productsStore.show_current(req.params.userID as string);
    res.send(rows);
};


const add_product = async (req: express.Request, res: express.Response) => {
    const productsStore = new OrdersStore();
    const rows = await productsStore.add_product(req.params.userID as string,req.params.productID as string);
    res.send(rows);
};

export default {
    index,
    show_current,
    add_product,
};
