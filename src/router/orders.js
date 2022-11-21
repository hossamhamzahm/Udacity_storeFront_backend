"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = __importDefault(require("../handler/orders"));
const users_1 = __importDefault(require("../handler/users"));
const router = express_1.default.Router();
// index: shows all/completed orders
router.get("/", users_1.default.validate, orders_1.default.index);
router.get("/:userID", users_1.default.validate, orders_1.default.show_current);
exports.default = router;
