import express from 'express';
import products_Handler from '../handler/products';
import usersHandler from "../handler/users";

const router : express.Router = express.Router();

// index: shows all products
router.get('/', products_Handler.index) 


// show a specific product
router.get('/:id', usersHandler.validate, products_Handler.show)

// create a product [using authorization token]
router.post("/", usersHandler.validate, products_Handler.create);

export default router;
