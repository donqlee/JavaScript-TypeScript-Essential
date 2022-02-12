const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENTS_URL = 'https://api.hnpwa.com/v0/item/@id/json';
const container = document.getElementById('root');

function getData(url){
    ajax.open('GET', url, false);
    ajax.send();
    return JSON.parse(ajax.response);
}

function newsFeed() {
    const newsFeed = getData(NEWS_URL);
    const newsList = [];
    newsList.push('<ul');
    newsFeed.forEach(element => {
        newsList.push(

            `
        <li>
            <a href=#${element.id}>${element.title} (${element.comments_count})</a>
        </li>
    `
        );

    });
    newsList.push('</ul>')
    container.innerHTML = newsList.join('');
}

function newsDetail(){
    const id = location.hash.substr(1);
    const newsContent = getData(CONTENTS_URL.replace('@id', id))
    container.innerHTML= 
    `
        <h1>${newsContent.title}</h1>
        <a href="#">목록으로 가기</a>
    `
};

function router(){
    if(location.hash === ''){
        newsFeed();
    }else{
        newsDetail();
    }
};

window.addEventListener('hashchange', router)

router();

