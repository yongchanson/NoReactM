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
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   }

// function init() {
// 	gapi.load('auth2', function() {
// 		gapi.auth2.init();
// 		options = new gapi.auth2.SigninOptionsBuilder();
// 		options.setPrompt('select_account');
//         // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
// 		options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
//         // 인스턴스의 함수 호출 - element에 로그인 기능 추가
//         // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
// 		gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
// 	})
// }

// function onSignIn(googleUser) {
// 	var access_token = googleUser.getAuthResponse().access_token
// 	$.ajax({
//     	// people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
// 		url: 'https://people.googleapis.com/v1/people/me'
//         // key에 자신의 API 키를 넣습니다.
// 		, data: {personFields:'birthdays', key:'AIzaSyCpA3Jrctl2HaaNKUM59PMkk-Z8VpgLilA', 'access_token': access_token}
// 		, method:'GET'
// 	})
// 	.done(function(e){
//         //프로필을 가져온다.
// 		var profile = googleUser.getBasicProfile();
// 		console.log(profile)
// 	})
// 	.fail(function(e){
// 		console.log(e);
// 	})
// }
// function onSignInFailure(t){		
// 	console.log(t);
// }

// function onSuccess(googleUser) {
//     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//   }
//   function onFailure(error) {
//     console.log(error);
//   }
//   function renderButton() {
//     gapi.signin2.render('my-signin2', {
//       'scope': 'profile email',
//       'width': 240,
//       'height': 50,
//       'longtitle': true,
//       'theme': 'dark',
//       'onsuccess': onSuccess,
//       'onfailure': onFailure
//     });
//   }

function onSignIn(googleUser) {
    let logigsingin2 = document.querySelector(".g-signin2");
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    // if(profile.getImageUrl()===null)
    //     logigsingin2.innerHTML = " "
    // else
    // logigsingin2.innerHTML = `<img src=${profile.getImageUrl()}></img>`
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
