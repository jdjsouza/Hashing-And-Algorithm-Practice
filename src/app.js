const { default: axios } = require('axios');

async function getUser() {
  try {
    const response = await axios.get('/');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getUser();

// function Hash(apiResponse: any, length: number, method: string) {
//   let max = length;
//   let key = apiResponse.uid;
//   let value = [apiResponse.origin, apiResponse.blend_name];
