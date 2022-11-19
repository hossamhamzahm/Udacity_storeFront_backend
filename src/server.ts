import express, { Request, Response } from 'express'
import client from './database'
import dotenv from "dotenv";
import path from "path";
import userRouter from './router/users';
import productsRouter from './router/products';
import ordersRouter from './router/orders';
import cors from 'cors';


const app: express.Application = express()
dotenv.config({ path: path.join(__dirname, "..", ".env") });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


app.use("/users", userRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);


app.get('/', function (req: Request, res: Response) {
    res.send('Hello from Storefront Backend Project!');
})

const PORT : number = (process.env.PORT as unknown) as number;

app.listen(PORT, async () => {
    console.log(`starting app on: ${PORT}`)
    await client.connect();
});
