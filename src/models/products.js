"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', "..", ".env") });
class ProductsStore {
    async index() {
        // client.connect();
        const query = 'SELECT * FROM Products;';
        let result = [];
        try {
            result = (await database_1.default.query(query)).rows;
        }
        catch (e) {
            console.log(e);
        }
        return result;
    }
    ;
    async show(id) {
        // client.connect();
        const query = 'SELECT * FROM Products WHERE Product_id = $1;';
        let result = [];
        try {
            result = (await database_1.default.query(query, [id])).rows;
        }
        catch (e) {
            console.log(e);
        }
        if (result.length < 1)
            throw new Error(`can't find Product with id ${id}`);
        return result[0];
    }
    ;
    async create(product) {
        const query = "INSERT INTO Products (product_name, product_price, product_category) VALUES ($1, $2, $3) RETURNING *;";
        const result = await database_1.default.query(query, [product.product_name, product.product_price, product.product_category]);
        return result.rows;
    }
    ;
}
exports.ProductsStore = ProductsStore;
;
