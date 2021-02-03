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
const app = express_1.default();
const ENDPOINT_DATA = 'https://random-data-api.com/api/coffee/random_coffee?size=10';
const getData = () => {
    request(ENDPOINT_DATA, { json: true }, (err, res, body) => __awaiter(void 0, void 0, void 0, function* () {
        const apiResponse = yield body;
        hashAndSort(apiResponse);
    }));
};
function hashAndSort(apiResponse) {
    console.log(apiResponse[0]);
    let hash = (string, max) => {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash += string.charCodeAt(i); //charCode is a numeric value
            return hash % max;
        }
    };
    console.log(hash(apiResponse[2].uid, 10));
}
getData();
app.listen(5000, () => console.log('Server Running'));
