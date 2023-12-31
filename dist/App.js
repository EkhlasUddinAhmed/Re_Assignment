"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./App/modules/User/userRouter"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', userRouter_1.default);
app.get('/', (req, res) => {
    res.status(200).send('WELCOME ASSIGNMENT 2');
});
app.all('*', (req, res, next) => {
    res.status(400).json({
        success: false,
        message: 'Router Not Found',
        error: {
            code: 400,
            description: 'Router Not Found',
        }
    });
    next();
});
app.use((err, req, res, next) => {
    res.status(404).json({
        success: false,
        message: err.message || "Something Wrong",
        error: {
            code: 404,
            error: err
        }
    });
});
exports.default = app;
