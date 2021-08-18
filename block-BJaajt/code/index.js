let input = document.querySelector('input');

let figure = document.querySelector('.profile-image-conatiner');

let profileImage = document.querySelector('.profile-image');

let h2 = document.querySelector('h2');

let p = document.querySelector('.userID');

let followersUL = document.querySelector('.followers');

let followingUL = document.querySelector('.following');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.onload = () => successHandler(JSON.parse(xhr.response));

  xhr.send();
}

function createUI(userData) {
  profileImage.src = userData.avatar_url;
  h2.innerText = userData.name;
  p.innerText = `@${userData.login}`;

  displayExtraInfo(
    `https://api.github.com/users/${userData.login}/followers`,
    followersUL
  );
  displayExtraInfo(
    `https://api.github.com/users/${userData.login}/following`,
    followingUL
  );
}

function displayExtraInfo(url, rootElm) {
  rootElm.innerHTML = '';
  console.log(url);
  fetch(url, function (followersList) {
    let topFive = followersList.slice(0, 5);
    topFive.forEach((info) => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = info.avatar_url;
      img.alt = info.name;
      li.append(img);

      rootElm.append(li);
    });
  });
}

function handleProfile(event) {
  if (event.keyCode == 13 && input.value) {
    const url = 'https://api.github.com/users/';

    let userName = event.target.value;

    fetch(url + userName, createUI);

    input.value = '';
  }
}

input.addEventListener('keyup', handleProfile);

// cat image

let catImage = document.querySelector('.cat-image');

let button = document.querySelector('button');

function handleCatImage() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    'GET',
    'https://api.thecatapi.com/v1/images/search?limit=1&sixe=full'
  );

  xhr.onload = function () {
    let catData = JSON.parse(xhr.response);
    catImage.src = catData[0].url;
  };
  xhr.send();
}

button.addEventListener('click', handleCatImage);
