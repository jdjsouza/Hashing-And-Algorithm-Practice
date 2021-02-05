window.onload = function () {
  //See comments below on how to configure for different data sets!
  //Be sure to check out the ransomUserGet.ts file for how to change your data type coming in.
  let displayData;
  let storage = [];
  const storageLimit = 97; //set this to be larger or === your data set number, you should choose a prime number.
  const list = document.getElementById('data');
  const grabButton = document.getElementById('grabData');
  const displayButton = document.getElementById('displayData');
  const hashButton = document.getElementById('hashData');
  const searchButton = document.getElementById('searchButton');
  async function getData() {
    await fetch('http://localhost:5000')
      .then((response) => response.json())
      .then((data) => {
        data.map((item) => {
          const entry = document.createElement('li');
          entry.textContent = item.blend_name;
          list.appendChild(entry);
        });
        displayData = data;
      })
      .catch((err) => {
        displayData = [`Is The Server Running? : ${err}`];
        processData('display', displayData);
        console.log(err);
      });
  }
  grabButton.addEventListener('click', () => {
    storage = [];
    list.textContent = '';
    getData();
  });
  displayButton.addEventListener('click', () => {
    processData('display', displayData);
  });
  hashButton.addEventListener('click', () => {
    processData('add', displayData);
  });
  searchButton.addEventListener('click', () => {
    const searchField = document.getElementById('searchField');
    let data = searchField.value;
    list.textContent = '';
    processData('lookup', data);
  });

  function processData(process, data) {
    let hash = (string) => {
      let hash = 0;
      for (let i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i);
        return hash % storageLimit;
      }
    };

    switch (process) {
      case 'display':
        list.textContent = '';
        data.map((item) => {
          const entry = document.createElement('li');
          !item.uid //This is for the display incoming data from this site should have a uid.
            ? (entry.textContent = item)
            : (entry.textContent = item.blend_name); // change the textContent to item.trait_required for your specific data set as configured in server *see server comments.
          list.appendChild(entry);
        });
        break;
      case 'add':
        let add = (key, value) => {
          const index = hash(key.trim(), storageLimit);
          let inserted;
          if (storage[index] === undefined) {
            storage[index] = [[key.trim(), value.trim()]];
          } else {
            inserted = false;
            for (let i = 0; i < storage[index].length; i++) {
              if (storage[index][i][1] === value) {
                inserted = true;
              }
            }
          }
          if (inserted === false) {
            storage[index].push([key, value]);
          }
        };
        data.map((item) => {
          add(item.blend_name, item.notes); //change these to match your data, the first item being the key (generally a name) and the second being the data you want to associate with the key.
        });
        break;
      case 'lookup':
        let lookup = (key) => {
          const index = hash(key.trim(), storageLimit);
          if (storage[index] === undefined) {
            return undefined;
          } else {
            for (let i = 0; i < storage[index].length; i++) {
              if (storage[index][i][0] === key) {
                return storage[index][i][1];
              }
            }
          }
        };
        let display = () => {
          const result = lookup(data);
          const entry = document.createElement('li');
          result != undefined
            ? (entry.textContent = result)
            : (entry.textContent = 'Nothing here');
          list.appendChild(entry);
        };
        display();

        break;
      default:
        return 0;
    }
  }
};
