window.onload = function () {
  //See comments below on how to configure for different data sets!
  //Be sure to check out the ransomUserGet.ts file for how to change your data type coming in.
  let displayData;
  let storage = [];
  let keyList = [];
  const storageLimit = 97; //set this to be larger or === your data set number, you should choose a prime number.
  const h1 = document.getElementById('h1');
  const list = document.getElementById('data');
  const grabButton = document.getElementById('grabData');
  const displayButton = document.getElementById('displayData');
  const hashButton = document.getElementById('hashData');
  const searchButton = document.getElementById('searchButton');
  const sortButton = document.getElementById('sortButton');
  async function getData() {
    await fetch('http://localhost:5000')
      .then((response) => response.json())
      .then((data) => {
        data.map((item) => {
          keyList.push(item.blend_name);
          const entry = document.createElement('li');
          entry.textContent = `KEY : ${item.blend_name} 
          ${'=========================='}
          VALUE : ${item.notes}`; //change for data set ^ & <
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
    h1.innerHTML = 'The Key - Value as it comes from the server';
    storage = [];
    keyList = [];
    list.textContent = '';
    getData();
  });

  displayButton.addEventListener('click', () => {
    h1.innerHTML = 'A list of all keys in your table';
    processData('display', displayData);
  });

  hashButton.addEventListener('click', () => {
    h1.innerHTML =
      'A list of your tables buckets & the number of items that hashed to each ';
    list.textContent = '';
    processData('add', displayData);
  });

  searchButton.addEventListener('click', () => {
    h1.innerHTML = 'The data content for your hash key';
    const searchField = document.getElementById('searchField');
    let data = searchField.value;
    list.textContent = '';
    processData('lookup', data);
  });

  sortButton.addEventListener('click', () => {
    let data = sort.value;
    processData('sort', data);
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
        console.log(data);
        list.textContent = '';
        if (data == undefined) {
          const entry = document.createElement('li');
          entry.textContent = 'Nothing Here';
          list.appendChild(entry);
        } else {
          data.map((item) => {
            const entry = document.createElement('li');
            !item.uid //This is for the display incoming data from this site should have a uid.
              ? (entry.textContent = item)
              : (entry.textContent = item.blend_name); // change the textContent to item.trait_required for your specific data set as configured in server *see server comments.
            list.appendChild(entry);
          });
        }
        break;
      case 'add':
        if (data == undefined) {
          const entry = document.createElement('li');
          entry.textContent = 'Nothing To Hash';
          list.appendChild(entry);
        } else {
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
        }
        storage.map((element, index) => {
          const entry = document.createElement('li');

          console.log(element.length);
          entry.textContent =
            'Bucket' +
            ' ' +
            index +
            ' - ' +
            ' ' +
            element.length.toString() +
            ' - ' +
            'Item(s)';

          list.appendChild(entry);
        });
        break;
      case 'lookup':
        if (data == '') {
          const entry = document.createElement('li');
          entry.textContent = 'Nothing To Lookup';
          list.appendChild(entry);
        } else {
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
        }
        break;
      case 'sort': //data in this case is the method for switching pulled from the select menu
        let sortKeys = () => {
          if (keyList.length === 0) {
            const entry = document.createElement('li');
            entry.textContent = 'Nothing to sort';
            list.appendChild(entry);
          } else {
            switch (
              data //add cases for your sort method
            ) {
              case 'Alphabetically':
                console.log(keyList);
                for (let i = 1; i < keyList.length; i++) {
                  let j = i - 1;
                  let current = keyList[i];
                  let currentVal = keyList[i][0];
                  while (j > -1 && currentVal < keyList[j][0]) {
                    keyList[j + 1] = keyList[j];
                    j--;
                  }
                  keyList[j + 1] = current;
                }
                h1.innerHTML =
                  'Insertion Sort by first character in each string';
                processData('display', keyList); //to output the result of the sorted array
                break;
              default:
                break;
            }
          }
        };
        sortKeys();
      default:
        return 0;
    }
  }
};
