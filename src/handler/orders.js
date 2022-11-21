"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const orders_1 = require("../models/orders");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
const index = async (req, res) => {
    const productsStore = new orders_1.OrdersStore();
    const rows = await productsStore.index();
    res.send(rows);
};
const show_current = async (req, res) => {
    const productsStore = new orders_1.OrdersStore();
    const rows = await productsStore.show_current(req.params.userID);
    res.send(rows);
};
exports.default = {
    index,
    show_current,
};
