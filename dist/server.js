"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request = require('request');
const server = express_1.default();
const ENDPOINT_DATA = 'https://random-data-api.com/api/coffee/random_coffee?size=10';
server.get('/', (req, res) => {
    console.log('made it');
    let apiResponse;
    request(ENDPOINT_DATA, { json: true }, (err, res, body) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
        }
        else {
            console.log(body);
            apiResponse = yield body;
        }
    }));
    res.send(apiResponse);
});
server.listen(5000, () => console.log('Server Running port 5000'));
