import express, { Application, Request, Response, NextFunction } from 'express';
const request = require('request');
const server = express();
const ENDPOINT_DATA: string =
  'https://random-data-api.com/api/coffee/random_coffee?size=10';

server.get('/', (req, res) => {
  console.log('made it');

  let apiResponse;
  request(
    ENDPOINT_DATA,
    { json: true },
    async (err: any, res: any, body: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
        apiResponse = await body;
      }
    }
  );
  res.send(apiResponse);
});

server.listen(5000, () => console.log('Server Running port 5000'));
