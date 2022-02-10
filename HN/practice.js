const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENTS_URL = 'https://api.hnpwa.com/v0/item/@id/json';
const title = document.createElement('h1');

ajax.open('GET', NEWS_URL, false);
ajax.send();

window.addEventListener('hashchange', function(){
    const id = location.hash.substr(1);
    ajax.open('GET', CONTENTS_URL.replace('@id', id), false);
    ajax.send();
    const contents = JSON.parse(ajax.response);
    
    console.log(contents.title);
    title.innerHTML = contents.title;
})
const newsFeed = JSON.parse(ajax.response);

const ul = document.createElement('ul');
newsFeed.forEach(element => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerHTML = `${element.title} (${element.comments_count})`;
    a.href = `#${element.id}`;
    li.appendChild(a);
    ul.appendChild(li);
});
document.getElementById('root').appendChild(ul);
document.getElementById('root').appendChild(title);
