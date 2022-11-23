import express from 'express';
import ordersHandler from '../handler/orders';
import productsHandler from '../handler/products';
import usersHandler from "../handler/users";
import wrapAsync from '../helpers/wrapAsync';
const router : express.Router = express.Router();


// index: shows all/completed orders
router.get("/", wrapAsync( usersHandler.validate), wrapAsync(ordersHandler.index));
router.get("/:userID", wrapAsync(usersHandler.validate), wrapAsync(ordersHandler.show_current)); 

export default router;
