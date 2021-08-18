let xtr = new XMLHttpRequest();

xtr.open('GET', url);

xtr.onload = function () {
  userData = JSON.parse(xtr.response);
};

xtr.onerror = function () {
  console.error('something went wrong');
};

xtr.send();

function fetch() {}

fetch(url);
