"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
const validate = async (req, res, next) => {
    const userStore = new users_1.UsersStore();
    const token = req.headers.authorization?.split(' ')[1];
    try {
        await jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (e) {
        res.status(401).send({ "error": e });
    }
    // await jwt.verify(req.body.user)
};
const create = async (req, res) => {
    const userStore = new users_1.UsersStore();
    const { f_name, l_name, user_password } = req.body.user;
    const result = await userStore.create({ f_name, l_name, user_password });
    try {
        const token = await jsonwebtoken_1.default.sign({ user: f_name }, process.env.TOKEN_SECRET);
        res.send(token);
    }
    catch (e) {
        res.status(401).send({ 'error': e });
    }
};
const index = async (req, res) => {
    const userStore = new users_1.UsersStore();
    const rows = await userStore.index();
    res.send(rows);
};
const show = async (req, res) => {
    const userStore = new users_1.UsersStore();
    const user = await userStore.show(req.params.id);
    delete user.user_password;
    res.send(user);
};
const sign_in = async (req, res) => {
    const userStore = new users_1.UsersStore();
    const user = await userStore.show(req.body.user.user_id);
    const needs_hashing = req.body.user.user_password + process.env.BCRYPT_SECRET;
    const pass_comparison = await bcrypt_1.default.compareSync(needs_hashing, user.user_password);
    if (!pass_comparison) {
        return res.status(401).send({ msg: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ f_name: user.f_name, user_id: user.user_id }, process.env.TOKEN_SECRET);
    res.header('Authorization', 'Bearer ' + token);
    res.send({ msg: "logged in successfully", token });
};
exports.default = {
    validate,
    create,
    index,
    show,
    sign_in
};
