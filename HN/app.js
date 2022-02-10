const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENTS_URL = 'https://api.hnpwa.com/v0/item/@id/json';
const content = document.createElement('div');

ajax.open('GET',NEWS_URL , false);
ajax.send();

const newsFeed = JSON.parse(ajax.response); //json을 객체로 바꿈
const ul = document.createElement('ul');

window.addEventListener('hashchange', function(){
    const id = location.hash.substr(1);
    ajax.open('GET', CONTENTS_URL.replace('@id', id), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);
    const title = document.createElement('h1');
    title.innerHTML = newsContent.title;
    content.appendChild(title);
})
for(let i = 0; i < 10; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${newsFeed[i].id}`;
    a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;
    
    li.appendChild(a);
    ul.appendChild(li);
}
container.appendChild(ul);
container.appendChild(content);
