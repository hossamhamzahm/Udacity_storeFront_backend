"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', "..", ".env") });
class UsersStore {
    async index() {
        // client.connect();
        const query = 'SELECT * FROM users;';
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
        const query = 'SELECT * FROM users WHERE user_id = $1;';
        let result = [];
        try {
            result = (await database_1.default.query(query, [id])).rows;
        }
        catch (e) {
            console.log(e);
        }
        if (result.length < 1)
            throw new Error(`can't find user with id ${id}`);
        return result[0];
    }
    ;
    async create(user) {
        const salt_rounds = process.env.SALT_ROUNDS;
        const pepper = process.env.BCRYPT_SECRET;
        const hashed_pass = await bcrypt_1.default.hashSync(user.user_password + pepper, parseInt(salt_rounds));
        const query = "INSERT INTO users (f_name, l_name, user_password) VALUES ($1, $2, $3) RETURNING *;";
        const result = await database_1.default.query(query, [user.f_name, user.l_name, hashed_pass]);
        return result.rows;
    }
    ;
}
exports.UsersStore = UsersStore;
;
