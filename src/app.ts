import express, { Application, Request, Response, NextFunction } from 'express';
const request = require('request');
const app = express();
const ENDPOINT_DATA: string =
  'https://random-data-api.com/api/coffee/random_coffee?size=10';

const getData: Function = () => {
  request(
    ENDPOINT_DATA,
    { json: true },
    async (err: any, res: any, body: any) => {
      const apiResponse = await body;
      hashAndSort(apiResponse);
    }
  );
};

function hashAndSort(apiResponse: any) {
  let storage: any = [];
  const storageLimit = 10;
  console.log(apiResponse[0]);

  let hash = (string: string, max: number) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i); //charCode is a numeric value
      return hash % max;
    }
  };

  const addToHashtable: Function = (key: string, value: any) => {
    let index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [[key, value]];
    } else {
      var inserted = false;
      for (let i = 0; i < storage[index].length; i++) {
        storage[index][i][1] = value;
        inserted = true;
      }
    }
    if (inserted === false) {
      storage[index].push([key, value]);
    }
  };
  console.log(hash(apiResponse[1].uid, 10));
}

getData();

app.listen(5000, () => console.log('Server Running'));
