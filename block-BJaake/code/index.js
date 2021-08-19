let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

let newsELm = document.querySelector('.news');

let selectElm = document.querySelector('select');

let allNews = [];

function displayOptions(sources) {
  sources.forEach((source) => {
    let option = document.createElement('option');
    option.innerText = source;
    option.value = source;
    selectElm.append(option);
  });
}

function renderNews(news) {
  newsELm.innerHTML = '';
  news.forEach((newsItem) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = newsItem.imageUrl;

    let div = document.createElement('div');

    let span = document.createElement('span');
    span.innerText = newsItem.newsSite;

    let h3 = document.createElement('h3');
    h3.innerText = newsItem.title;

    let a = document.createElement('a');

    let button = document.createElement('button');

    button.innerText = 'Read More';
    a.href = newsItem.url;

    a.append(button);

    div.append(span, h3, a);
    li.append(img, div);
    newsELm.append(li);
  });
}

fetch(url)
  .then((res) => res.json())
  .then((news) => {
    console.log(news);
    let allSources = Array.from(
      new Set(
        news.map((site) => {
          return site.newsSite;
        })
      )
    );
    allNews = news;
    renderNews(news);
    displayOptions(allSources);
  });

selectElm.addEventListener('change', (event) => {
  let source = event.target.value.trim();
  console.log(source);

  if (source) {
    let filterNews = allNews.filter((news) => news.newsSite === source);
    renderNews(filterNews);
  } else {
    renderNews(allNews);
  }
});
