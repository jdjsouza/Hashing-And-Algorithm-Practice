import express, { Application, Request, Response, NextFunction } from 'express';
const request = require('request');
const router = express.Router();
const ENDPOINT_DATA: string =
  'https://random-data-api.com/api/coffee/random_coffee?size=10';

router.get('/', (req, res) => {
  let apiResponse;
  request(
    ENDPOINT_DATA,
    { json: true },
    async function (error: any, response: any, body: any) {
      if (error) {
        console.log(error);
      } else {
        apiResponse = await body;
        res.send(apiResponse);
      }
    }
  );
});
module.exports = router;
