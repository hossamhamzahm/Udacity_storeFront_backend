"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const products_1 = require("../models/products");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
const create = async (req, res) => {
    const productStore = new products_1.ProductsStore();
    const result = await productStore.create(req.body.product);
    res.send(result);
};
const index = async (req, res) => {
    const productsStore = new products_1.ProductsStore();
    const rows = await productsStore.index();
    res.send(rows);
};
const show = async (req, res) => {
    const productsStore = new products_1.ProductsStore();
    const rows = await productsStore.show(req.params.id);
    res.send(rows);
};
exports.default = {
    create,
    index,
    show,
};
