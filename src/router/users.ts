import express from "express";
import { UsersStore, } from "../models/users";
import dotenv from "dotenv";
import path from "path";
import usersController from '../handler/users';
const router: express.Router = express.Router();


dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

// /user

// all requires token
// router.use()

// index: shows all users
router.get("/", usersController.validate, usersController.index);


// show a specific user
router.get("/:id", usersController.validate, usersController.show);

// create a new user
router.post("/", usersController.create);
router.post("/signin", usersController.sign_in);


export default router;