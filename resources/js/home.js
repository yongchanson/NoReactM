const main = document.querySelector('.main');
const main2 = document.querySelector('.main2');



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
        <img src="${poster_path? IMG_URL+poster_path: "img/noimage.png" }" alt="${title}" onclick="location.href = '/movies/${movie.id}'">
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
        <div class="movie" onclick="location.href = '/movies/${item.id}'">
            <img src="${IMG_URL}${item.backdrop_path}" alt="">
            <p class="title">${item.title}</p>
        </div>
        `;

    })
}

//구글인증
// function onSignIn(googleUser) {
//     let logigsingin2 = document.querySelector(".g-signin2");
//     // Useful data for your client-side scripts:
//     var profile = googleUser.getBasicProfile();
//     console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//     console.log('Full Name: ' + profile.getName());
//     console.log('Given Name: ' + profile.getGivenName());
//     console.log('Family Name: ' + profile.getFamilyName());
//     console.log("Image URL: " + profile.getImageUrl());
//     console.log("Email: " + profile.getEmail());

//     // The ID token you need to pass to your backend:
//     var id_token = googleUser.getAuthResponse().id_token;
//     // console.log("ID Token: " + id_token);
//     // if(profile.getImageUrl()===null)
//     //     logigsingin2.innerHTML = " "
//     // else
//     // logigsingin2.innerHTML = `<img src=${profile.getImageUrl()}></img>`
//   }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }
