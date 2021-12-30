const searchForm = document.querySelector('.searchform');
const searchMain = document.querySelector('.searchmain');



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // location.href=`search?&query=${search.value}`;
    // let searchValue = search.value
    
    //임시초기화용
    searchMain.innerHTML = ''; 

    fetch(SEARCH_URL + "&query=" + `${search.value}`)
    .then(res => res.json())
    .then(data => {

        for(i=0; i<data.results.length; i++){
            searchMain.innerHTML += `
                <div class="movie">
                    <img src="${data.results[i].poster_path? IMG_URL+data.results[i].poster_path: "${data.results[i].title}" }" alt="${data.results[i].title}" onclick="location.href = 'movies/${data.results[i].id}'">
                </div>   
            `;
            }
    
    })

    // location.href=`search?&query=${search.value}`;
    // searchMovie(searchURL+'&query='+search.value)
})