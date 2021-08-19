function fetch(url) {
  return new Promise((resolve, reject) => {
    let xtr = new XMLHttpRequest();
    xtr.open('GET', url);

    xtr.onload = function () {
      resolve(JSON.parse(xtr.response));
    };

    xtr.onerror = function () {
      reject('something went wrong');
    };
    xtr.send();
  });
}

// fetch(url);

let five = new Promise((resolve, reject) => {
  resolve(5);
}).then((value) => console.log(value));
