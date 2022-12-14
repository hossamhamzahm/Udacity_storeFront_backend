import express, { Request, Response } from 'express'
import client from './database'
import dotenv from "dotenv";
import path from "path";
import userRouter from './router/users';
import productsRouter from './router/products';
import ordersRouter from './router/orders';
import cors from 'cors';
import wrapAsync from './helpers/wrapAsync';


dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app: express.Application = express()
app.use(
    express.urlencoded({ extended: true }),
    express.json(),
    cors()
)


app.use("/users", userRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);


app.get('/', function (req: Request, res: Response) {
    res.send('Hello from Storefront Backend Project!');
})

const PORT : number = (process.env.PORT as unknown) as number;

app.listen(PORT, wrapAsync (async () => {
    console.log(`starting app on: ${PORT}`)
    try{
        await client.connect();
    }
    catch(e: unknown){
        if(process.env.ENV  == 'dev') console.log(e)
    }
}));


export default app;