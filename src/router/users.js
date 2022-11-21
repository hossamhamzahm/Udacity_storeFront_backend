"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const users_1 = __importDefault(require("../handler/users"));
const router = express_1.default.Router();
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
// index: shows all users
router.get("/", users_1.default.validate, users_1.default.index);
// show a specific user
router.get("/:id", users_1.default.validate, users_1.default.show);
// create a new user
router.post("/", users_1.default.create);
router.post("/signin", users_1.default.sign_in);
exports.default = router;
