"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./App/modules/User/userRouter"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/users", userRouter_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Heloo Belal");
});
app.all("*", (req, res, next) => {
    res.status(400).json({
        success: false,
        message: "Router Not Found"
    });
    next();
});
exports.default = app;
