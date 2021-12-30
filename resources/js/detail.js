const formatString = (a, b) => {
    return (a == b - 1) ? '' : ', ';
}


detailMovies(moviedetail);

function detailMovies(url) {
    fetch(url).then(res => res.json()).then((data) => {
        // console.log(data)
        setupMovieInfo(data);
    })
}

const setupMovieInfo = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');
    // const year = document.querySelector('.year');

    title.innerHTML = movieName.innerHTML = data.title; 
    
    genres.innerHTML += "<div>장르: </div>"
    for(let i = 0; i < data.genres.length; i++){
    genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }

    des.innerHTML = `${data.release_date} <br/>`
    des.innerHTML += `<span>${data.overview.substring(0, 95)} ...</span>`;

    backdrop.style.backgroundImage = `url(${IMG_URL}${data.backdrop_path})`;
}

// 출연배우
fetch(`${movie_detail_http}${movie_id}/credits?` + API_KEY)
.then(res => res.json())
.then(data => {
    const cast = document.querySelector('.cast');

    cast.innerHTML += "<span>출연: </span>"
    for(let i = 0; i < 3; i++){
        cast.innerHTML +=`<div class="actors" onclick="location.href ='/person/${data.cast[i].id}'">${data.cast[i].name}` + formatString(i, 4);
    } 
    cast.innerHTML += "더보기"
})    

//비슷한 컨텐츠
fetch(`${movie_detail_http}${movie_id}/similar?` + API_KEY)
.then(res => res.json())
.then(data => {
    const similar = document.querySelector('.similar');
    // console.log(data.results)
    for(let i = 0; i < 9; i++){
        if(data.results[i].backdrop_path == null){
            i++;
        }
        similar.innerHTML += `
        <div class="movie" onclick="location.href = '/${data.results[i].id}'">
            <img src="${IMG_URL}${data.results[i].backdrop_path}">
            <p class="title">${data.results[i].title}</p>
            <p class="release_date">${data.results[i].release_date}</p>
            <p class="overview">${data.results[i].overview.substring(0, 70)} ...</p>
        </div>
        `;

    }
})

//예고편
fetch(`${movie_detail_http}${movie_id}/videos?`+ API_KEY)
.then(res => res.json())
.then(data => {
    const warning = document.querySelector('.warning');
    const maxClips = (data.results.length > 6) ? 6 : data.results.length;

    for(let i = 0; i < maxClips; i++){
        warning.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }
})

