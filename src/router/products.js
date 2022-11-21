"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../handler/products"));
const users_1 = __importDefault(require("../handler/users"));
const router = express_1.default.Router();
// index: shows all products
router.get('/', products_1.default.index);
// show a specific product
router.get('/:id', users_1.default.validate, products_1.default.show);
// create a product [using authorization token]
router.post("/", users_1.default.validate, products_1.default.create);
exports.default = router;
