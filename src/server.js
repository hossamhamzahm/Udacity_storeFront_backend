"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const users_1 = __importDefault(require("./router/users"));
const products_1 = __importDefault(require("./router/products"));
const orders_1 = __importDefault(require("./router/orders"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }), express_1.default.json(), (0, cors_1.default)());
app.use("/users", users_1.default);
app.use("/orders", orders_1.default);
app.use("/products", products_1.default);
app.get('/', function (req, res) {
    res.send('Hello from Storefront Backend Project!');
});
const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`starting app on: ${PORT}`);
    await database_1.default.connect();
});
