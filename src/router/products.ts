import express from 'express';
import products_Handler from '../handler/products';
import usersHandler from "../handler/users";
import wrapAsync from '../helpers/wrapAsync';

const router : express.Router = express.Router();

// index: shows all products
router.get('/', wrapAsync(products_Handler.index)) 


// show a specific product
router.get('/:id', wrapAsync(products_Handler.show))

// create a product [using authorization token]
router.post("/", wrapAsync(usersHandler.validate), wrapAsync(products_Handler.create));

export default router;
