import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import bcrypt from 'bcrypt';
import { UsersStore } from "../../models/users";
import { createPrinter } from "typescript";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });



const index = async (req: express.Request, res: express.Response) => {
    const userStore = new UsersStore();
    const rows = await userStore.index();
    res.send(rows);
};



describe("User Tests", () => {
    it("testing showing one user (show)", async() => {
        const userStore = new UsersStore();
        const user = await userStore.show('1');
        const anticipated_result = {
            user_id: 1,
            f_name: "hossam",
            l_name: "hamza",
        };
        
        expect(user).toEqual(jasmine.objectContaining(anticipated_result));
    });


    it("testing showing all users (index)", async() => {
        const userStore = new UsersStore();
        const result = await userStore.index();
        // console.log(result);
        const anticipated_result = [{
            user_id: 1,
            f_name: "hossam",
            l_name: "hamza",
        }];
        
        expect(result[0]).toEqual(jasmine.objectContaining(anticipated_result[0]));
    });


    it("testing sign-in and token validation (should identify this token as an invalid token)", async() => {
        const token = "aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaG9zc2FtIiwiaWF0IjoxNjY4NzYxNjQ3fQ.6EBejf6ZerHrZ6X0ayLKQkc5GDT38Y7uTSy9gRFErvY";
        try{
            await jwt.verify(token, process.env.TOKEN_SECRET as string);
        }
        catch(e: unknown){
            return expect(e).toBeTruthy();
        }
        
        throw new Error("Expected the token to be invalid")
    });


    it("testing sign-in and token validation (should identify this token as a valid token)", async() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaG9zc2FtIiwiaWF0IjoxNjY4NzYxNjQ3fQ.6EBejf6ZerHrZ6X0ayLKQkc5GDT38Y7uTSy9gRFErvY";
        const jwt_result = await jwt.verify(token, process.env.TOKEN_SECRET as string);
    });

    it("testing creating new user & sign in hashing (create)", async() => {
        const userStore = new UsersStore();
        const f_name = "first_name";
        const l_name = "last_name"
        const user_password = "12345";
        
        const pepper: string = process.env.BCRYPT_SECRET as unknown as string;
        const result = await userStore.create({ f_name, l_name, user_password});
        const pass_comparison = await bcrypt.compareSync(user_password + pepper, result[0].user_password as string)


        const anticipated_result = {
            f_name: "first_name",
            l_name: "last_name",
        };
        
        expect(pass_comparison).toBeTrue();
        expect(result[0]).toEqual(jasmine.objectContaining(anticipated_result));
    });
})
