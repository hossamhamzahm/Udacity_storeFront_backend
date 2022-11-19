import express from "express";
import jwt from "jsonwebtoken";
import { UsersStore } from "../models/users";
import dotenv from "dotenv";
import path from "path";
import bcrypt from 'bcrypt';


dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });


const validate = async(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const userStore = new UsersStore();
    // const rows = await userStore.find
    const token = req.headers.authorization?.split(' ')[1] as string;

    try{
        await jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    }
    catch(e: unknown){
        res.status(401).send({"error": e})
    }
    // await jwt.verify(req.body.user)
}


const create =  async (req: express.Request, res: express.Response) => {
    const userStore = new UsersStore();
    const { f_name, l_name, user_password } = req.body.user;
    const result = await userStore.create({ f_name, l_name, user_password});
    
    let token = await jwt.sign({user: f_name}, process.env.TOKEN_SECRET as string)

    try{
        res.send(token)
    }
    catch(e: unknown){
        res.status(401).send({'error': e});
    }
}


const index = async (req: express.Request, res: express.Response) => {
    const userStore = new UsersStore();
    const rows = await userStore.index();
    res.send(rows);
};

const show = async (req: express.Request, res: express.Response) => {
    const userStore = new UsersStore();
    const user = await userStore.show(req.params.id as string);
    
    delete user.user_password;
    res.send(user);
};



const sign_in = async (req: express.Request, res: express.Response) => {
    const userStore = new UsersStore();
    const user = await userStore.show(req.body.user.user_id as string);
    
    const needs_hashing = user.user_password as string + process.env.BCRYPT_SECRET as string
    bcrypt.hashSync(needs_hashing, parseInt(process.env.BCRYPT_SALT as string));
    

    const token = jwt.sign({ user: user.f_name }, process.env.TOKEN_SECRET as string);
    
    res.send({msg: "logged in successfully", token});
};

export default {
    validate,
    create,
    index,
    show,
    sign_in
}