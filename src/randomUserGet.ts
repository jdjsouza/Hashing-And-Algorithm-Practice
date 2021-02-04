import express, { Application, Request, Response, NextFunction } from 'express';
const request = require('request');
const router = express.Router();
const ENDPOINT_DATA: string =
  'https://random-data-api.com/api/coffee/random_coffee?size=10'; //this site has many data types, change the URL to access different sets of data. eg /api/users/etc size= sets the number of objects sent back.

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
