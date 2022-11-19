import express from "express";
import dotenv from "dotenv";
import path from "path";
import { OrdersStore } from "../models/orders";


dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });



const index = async (req: express.Request, res: express.Response) => {
    const productsStore = new OrdersStore();
    const rows = await (req.query.current == 'true' ? productsStore.show_current() : productsStore.index());
    res.send(rows);
};



export default {
    index,
}