const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENTS_URL = 'https://api.hnpwa.com/v0/item/@id/json';
const content = document.createElement('div');
const store = {
    currentPage: 1,
}

function getData(url){
    ajax.open('GET',url , false);
    ajax.send();
    return JSON.parse(ajax.response); //json을 객체로 바꿈
};

function newsFeed() {
    const newsFeed = getData(NEWS_URL); //json을 객체로 바꿈
    const newsList = [];
    newsList.push('<ul>');
    for (let i = (store.currentPage - 1) * 10; i < store.currentPage + 10; i++) {

        newsList.push(
            ` 
        <li>
            <a href=#/show/${newsFeed[i].id}>${newsFeed[i].title} (${newsFeed[i].comments_count})</a>
        </li>
    `
        );
    }
    newsList.push('</ul>');
    newsList.push(`
        <div>
            <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a> 
            <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
        </div>
    `)// 삼항연산자 1보다 크면 -1 하고 아니면 1이다.
    container.innerHTML = newsList.join('');
}

function newsDetail(){
    const id = location.hash.substr(7);
    const newsContent = getData(CONTENTS_URL.replace('@id', id))
   container.innerHTML = 
   `
    <h1>${newsContent.title}</h1>
    <div>
        <a href='#/page/${store.currentPage}'>목록으로</a>
    </div>
   `
};

function router(){
    const routePath = location.hash;
    if(routePath === ''){
        newsFeed();
    } else if(routePath.indexOf('#/page/') >= 0){
        store.currentPage = Number(routePath.substr(7));
        newsFeed();
    } else{
        newsDetail();
    }
}

window.addEventListener('hashchange', router)

router();


