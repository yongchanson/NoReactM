const main = document.querySelector('.main');
const main2 = document.querySelector('.main2');
// const search = document.querySelector('#search');
// const searchForm = document.querySelector('.searchForm');
// const serachMain = document.querySelector('.searchMain');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results)
        main.innerHTML += `
        <div class="list">
            <button class="prebtn"><img src="img/pre.png" style="height : 50px;"></button>
            <h1 class="category">인기영화</h1>
            <div class="content" id="popluar"></div>
            <button class="nxtbtn"><img src="img/nxt.png" style="height : 50px;"></button>
        </div>
        `;  
        addpopular(data.results);
    })
}

function addpopular(data) {
    data.forEach(movie => {
        const {title, poster_path, vote_average, release_date, id } = movie;
        const popluar = document.querySelector("#popluar");
        
    popluar.innerHTML += ` 
    <div class="movie">
        <img src="${poster_path? IMG_URL+poster_path: "img/noimage.png" }" alt="${title}" onclick="location.href = '/${movie.id}'">
        <h3 class="title">${title}</h3>
    </div>
    `;

    })
}

//장르
fetch(`${genres_list_http}` + API_KEY)
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        movielistgenres(item.id, item.name)
    })
})

const movielistgenres = (id, genres) => {
    fetch(movie_discover + API_KEY + `&with_genres=${id}`)    
    .then(res => res.json())
    .then(data => {
        categorylist(`${genres}`, data.results);
    })
}

const categorylist = (category, data) => {
    main2.innerHTML += `
    <div class="list">
        <h1 class="category">${category}</h1>
        <div class="content" id="${category}">
        </div>
    </div>
    `;
    makeCard(category, data);

}

const makeCard = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }

        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${IMG_URL}${item.backdrop_path}" alt="">
            <p class="title">${item.title}</p>
        </div>
        `;

    })
}

//검색

// searchForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     let searchValue = `${search.value}`

//     fetch(SEARCH_URL + "&query=" + `${searchValue}`)
//     .then(res => res.json())
//     .then(data => {
//         .innerHTML = data.name;
//     })

//     // location.href=`search?&query=${search.value}`;
//     // searchMovie(searchURL+'&query='+search.value)
// })
// searchMovie(searchURL+'&query='+search.value)

// function searchMovie(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         // console.log(data.results)
//         searchMain.innerHTML += `
//         <div class="list">
//             <button class="prebtn"><img src="img/pre.png" style="height : 50px;"></button>
//             <h1 class="category">${search.value}</h1>
//             <div class="content" id="${search.value}"></div>
//             <button class="nxtbtn"><img src="img/nxt.png" style="height : 50px;"></button>
//         </div>
//         `;  
//         addsearch(data.results);
//     })
// }

// function addsearch(data) {
//     data.forEach(movie => {
//         const {title, poster_path, vote_average, release_date, id } = movie;
//         const search = document.querySelector("#search");
        
//         search.innerHTML += ` 
//     <div class="movie">
//         <img src="${poster_path? IMG_URL+poster_path: "img/noimage.png" }" alt="${title}" onclick="location.href = '/${movie.id}'">
//         <h3 class="title">${title}</h3>
//     </div>
//     `;

//     })
// }


