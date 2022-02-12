const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENTS_URL = 'https://api.hnpwa.com/v0/item/@id/json';
const content = document.createElement('div');
const container = document.getElementById('root');

function getData(url){
    ajax.open('GET', url, false);
    ajax.send();
    return JSON.parse(ajax.response);
}

window.addEventListener('hashchange', function(){
    const id = location.hash.substr(1);
    const newsContent = getData(CONTENTS_URL.replace('@id', id))
    const title = document.createElement('h1');
    title.innerHTML = newsContent.title;
    content.appendChild(title);
})
const newsFeed = getData(NEWS_URL);

const ul = document.createElement('ul');
newsFeed.forEach(element => {
    const div = document.createElement('div');
    div.innerHTML = 
    `
        <li>
            <a href=#${element.id}>${element.title} (${element.comments_count})</a>
        </li>
    `
    ul.appendChild(div.firstElementChild);
});
container.appendChild(ul);
container.appendChild(content);
