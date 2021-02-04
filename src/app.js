window.onload = function () {
  let randomData;
  const storage = [];
  const storageLimit = 97;
  const list = document.getElementById('data');
  const grabButton = document.getElementById('grabData');
  const hashButton = document.getElementById('hashData');
  const searchButton = document.getElementById('searchButton');
  async function getUsers() {
    await fetch('http://localhost:5000')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.map((item) => {
          const entry = document.createElement('li');
          entry.textContent = item.blend_name;
          list.appendChild(entry);
        });
        randomData = data;
      })
      .catch((err) => console.log(err));
  }
  grabButton.addEventListener('click', () => {
    list.textContent = '';
    getUsers();
  });
  hashButton.addEventListener('click', () => {
    processData('add', randomData);
  });
  searchButton.addEventListener('click', () => {
    const searchField = document.getElementById('searchField');
    let data = searchField.value;
    list.textContent = '';
    let location = processData('lookup', data);
    const entry = document.createElement('li');
    location != undefined
      ? (entry.textContent = location)
      : (entry.textContent = 'Nothing here');
    list.appendChild(entry);
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
      case 'add':
        let add = (key, value) => {
          const index = hash(key, storageLimit);
          let inserted;
          if (storage[index] === undefined) {
            storage[index] = [[key, value]];
          } else {
            inserted = false;
            for (let i = 0; i < storage[index].length; i++) {
              storage[index][i][1] = value;
              inserted = true;
            }
          }
          if (inserted === false) {
            storage[index].push([key, value]);
          }
        };
        data.map((item) => {
          add(item.blend_name, item.notes);
        });
        console.log(storage);
        break;
      case 'lookup':
        let lookup = (key) => {
          const index = hash(key, storageLimit);
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
        lookup(data);
        break;
      default:
        return 0;
    }
  }
};
