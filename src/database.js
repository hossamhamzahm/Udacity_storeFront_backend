"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, ENV, } = process.env;
let client;
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: DB_HOST,
        password: DB_PASSWORD,
        user: DB_USER,
        database: DB_NAME,
        port: DB_PORT
    });
}
else {
    client = new pg_1.Pool({
        host: DB_HOST,
        password: DB_PASSWORD,
        user: 'test_user',
        database: 'company_test',
        port: DB_PORT
    });
}
exports.default = client;
