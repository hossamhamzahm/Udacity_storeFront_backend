"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', "..", ".env") });
class OrdersStore {
    async index() {
        const query = `
        SELECT * FROM orders
        INNER JOIN users
        ON users.user_id = orders.user_id
        INNER JOIN products
        ON products.product_id = orders.order_id;`;
        let result = [];
        try {
            result = (await database_1.default.query(query)).rows;
            result.forEach(item => {
                delete item['user_password'];
            });
        }
        catch (e) {
            console.log(e);
        }
        return result;
    }
    ;
    async show_current(user_id) {
        const query = `
        SELECT * FROM orders
        INNER JOIN users
        ON users.user_id = orders.user_id
        INNER JOIN products
        ON products.product_id = orders.order_id
        WHERE orders.current_order = true AND users.user_id = $1;`;
        let result = [];
        try {
            result = (await database_1.default.query(query, [user_id])).rows;
            result.forEach(item => {
                delete item['user_password'];
            });
        }
        catch (e) {
            console.log(e);
        }
        return result;
    }
    ;
}
exports.OrdersStore = OrdersStore;
;
