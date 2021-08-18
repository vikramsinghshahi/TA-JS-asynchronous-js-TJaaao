const url =
  'https://api.unsplash.com/photos/?client_id=xDixyLsuj_T0s2zhouwTtWvxisrnJM4F8WNTvCoNXKs';

const getSearchURL = (query) =>
  `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=xDixyLsuj_T0s2zhouwTtWvxisrnJM4F8WNTvCoNXKs`;

let searchElm = document.querySelector('input');

let root = document.querySelector('.gallery');

console.log(root);

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.onload = function () {
    successHandler(JSON.parse(xhr.response));
  };

  xhr.send();
}

function displayImages(images) {
  root.innerHTML = '';
  console.log(images);
  images.forEach((image) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = image.urls.thumb;

    li.append(img);

    root.append(li);
  });
}

fetch(url, displayImages);

function handleSearch(event) {
  if (event.keyCode === 13 && searchElm.value) {
    console.log(searchElm.value);
    fetch(getSearchURL(searchElm.value), (searchResult) => {
      displayImages(searchResult.results);
    });
    searchElm.value = '';
  }
}
searchElm.addEventListener('keyup', handleSearch);

//xDixyLsuj_T0s2zhouwTtWvxisrnJM4F8WNTvCoNXKs

//https://api.unsplash.com/photos/?client_id=xDixyLsuj_T0s2zhouwTtWvxisrnJM4F8WNTvCoNXKs

// https://api.unsplash.com/search/collections?page=1&query=office
