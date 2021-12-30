const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8&language=ko';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const original_img_url = "https://image.tmdb.org/t/p/original";
const movie_detail_http = BASE_URL + '/movie';

let set = location.pathname.split("/")

// 디테일
// let movie_id = set.pop();
let movie_id = location.pathname.split("/movies")[1]
let moviedetail = movie_detail_http + movie_id + "?" +API_KEY;

// 사람들(key값으로 받는 것으로 변경예정)
let person_id = location.pathname.split("/person")[1]
// let person_id = location.pathname.substring(-6, 4);
// let person_id = Location.split("/")[Location.split("/").length - 1]
// let person_id = set;

//장르
let genres_list_http = "https://api.themoviedb.org/3/genre/movie/list?";

//관련된?
let movie_discover = `https://api.themoviedb.org/3/discover/movie?`;

//검색
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;