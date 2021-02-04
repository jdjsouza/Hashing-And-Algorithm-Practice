"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = express_1.default();
const randomUserGet = require('./randomUserGet');
app.use(cors());
app.use('/', randomUserGet);
app.listen(5000, () => console.log('Server Running port 5000'));
