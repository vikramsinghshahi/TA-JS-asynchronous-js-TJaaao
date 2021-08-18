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
