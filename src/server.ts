import express, { Application, Request, Response, NextFunction } from 'express';
const cors = require('cors');
const app = express();
const randomUserGet = require('./randomUserGet');

app.use(cors());

app.use('/', randomUserGet);

app.listen(5000, () => console.log('Server Running port 5000'));
