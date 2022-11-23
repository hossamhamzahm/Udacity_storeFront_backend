import express from "express";
import { UsersStore, } from "../models/users";
import dotenv from "dotenv";
import path from "path";
import usersController from '../handler/users';
import wrapAsync from "../helpers/wrapAsync";
const router: express.Router = express.Router();


dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });


// index: shows all users
router.get("/", wrapAsync(usersController.validate), wrapAsync(usersController.index));


// show a specific user
router.get("/:id", wrapAsync(usersController.validate), wrapAsync(usersController.show));

// create a new user
router.post("/", wrapAsync(usersController.create));

//signing in
router.post("/signin", wrapAsync(usersController.sign_in));


export default router;