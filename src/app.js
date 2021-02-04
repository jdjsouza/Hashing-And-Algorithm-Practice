window.onload = function () {
  let displayData;
  let storage = [];
  const storageLimit = 97;
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
        console.log(data);
        list.textContent = '';
        data.map((item) => {
          console.log(item);
          const entry = document.createElement('li');
          console.log(item.length);
          !item.uid
            ? (entry.textContent = item)
            : (entry.textContent = item.blend_name);
          list.appendChild(entry);
        });
        break;
      case 'add':
        let add = (key, value) => {
          const index = hash(key, storageLimit);
          let inserted;
          if (storage[index] === undefined) {
            storage[index] = [[key, value]];
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
          add(item.blend_name, item.notes);
        });
        break;
      case 'lookup':
        let lookup = (key) => {
          const index = hash(key, storageLimit);
          console.log(index, storage);
          if (storage[index] === undefined) {
            return undefined;
          } else {
            for (let i = 0; i < storage[index].length; i++) {
              if (storage[index][i][0] === key) {
                console.log('success');
                console.log(storage[index][i][1]);
                return storage[index][i][1];
              }
            }
          }
        };
        let display = () => {
          const result = lookup(data);
          const entry = document.createElement('li');
          console.log('result', result);
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
