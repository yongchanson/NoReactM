const main = document.querySelector('.main');
const actorname = document.querySelector('.actorname');

fetch(`${BASE_URL}/person/${person_id}/movie_credits?` + API_KEY)
.then(res => res.json())
.then(data => {
    // console.log(data);

    for(i=0; i<data.cast.length; i++){
    main.innerHTML += `
        <div class="movie">
            <img src="${data.cast[i].poster_path? IMG_URL+data.cast[i].poster_path: "${data.cast[i].title}" }" alt="${data.cast[i].title}" onclick="location.href = '/${data.cast[i].id}'">
        </div>   
    `;
    }
})

fetch(`${BASE_URL}/person/${person_id}?` + API_KEY)
.then(res => res.json())
.then(data => {
    actorname.innerHTML = data.name;
})
