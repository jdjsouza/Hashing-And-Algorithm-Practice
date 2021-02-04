function processData(data) {
  console.log(data);
  // function Hash(apiResponse: any, length: number, method: string) {
  //   let max = length;
  //   let key = apiResponse.uid;
  //   let value = [apiResponse.origin, apiResponse.blend_name];
}

async function getUsers() {
  await fetch('http://localhost:5000')
    .then((response) => response.json())
    .then((data) => {
      processData(data);
    })
    .catch((err) => console.log(err));
}

function callData(data) {
  let users = getUsers();
}

callData();
