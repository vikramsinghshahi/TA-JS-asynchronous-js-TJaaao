let url = 'https://www.anapioficeandfire.com/api/books';

let btn = document.querySelector('.btn');
let characterWindow = document.querySelector('.character-list');
let closeWindow = document.querySelector('.close');

let characterUl = document.querySelector('.characterUl');

let root = document.querySelector('.book-list');

//
//   /* <div class="donut"></div> */
//

function handleSpinner(rootElm, status = false) {
  if (status) {
    rootElm.innerHTML = `<div class="donut"></div> `;
  }
}

function handleClick(characters) {
  characterWindow.style.display = 'block';
  handleSpinner(characterUl, true);

  Promise.all(
    characters.map((character) => fetch(character).then((res) => res.json()))
  ).then((characterData) => {
    characterUl.innerHTML = '';
    characterData.forEach((elm) => {
      let li = document.createElement('li');
      li.innerText = `${elm.name}: (${elm.aliases.join(' ')})`;
      characterUl.append(li);
    });
  });

  closeWindow.addEventListener('click', () => {
    characterWindow.style.display = 'none';
  });
}

function displayBooks(books) {
  root.innerHTML = '';
  books.forEach((book) => {
    let li = document.createElement('li');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let btn = document.createElement('button');

    btn.addEventListener('click', () => {
      handleClick(book.characters);
    });

    h3.innerText = book.name;
    p.innerText = book.authors.join(' ');

    btn.classList.add('btn');

    btn.innerText = `Show Character (${book.characters.length})`;

    li.append(h3, p, btn);

    root.append(li);
  });
}

function fetchBooks() {
  handleSpinner(root, true);
  fetch(url)
    .then((books) => books.json())
    .then((books) => displayBooks(books))
    .finally(() => {
      handleSpinner(root);
    });
}

fetchBooks();
