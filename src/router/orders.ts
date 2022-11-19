import express from 'express';
import ordersHandler from '../handler/orders';
import productsHandler from '../handler/products';
import usersHandler from "../handler/users";
const router : express.Router = express.Router();


// index: shows all completed orders
router.get('/', usersHandler.validate, ordersHandler.index) 

export default router;
