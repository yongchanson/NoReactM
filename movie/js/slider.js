const conainter = [...document.querySelector('.content')];
const nxtBtn = [...document.querySelector('.nxtbtn')];
const preBtn = [...document.querySelector('.prebtn')];
// const setupScrolling = () => {
    // const conainter = [...document.querySelectorAll('.content')];
    // const nxtBtn = [...document.querySelectorAll('.nxtbtn')];
    // const preBtn = [...document.querySelectorAll('.prebtn')];

    conainter.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
// }

// var curpos2 = document.documentElement.scrolL
// let prebtn = document.querySelector('.prebtn');
// let _scrollX = document.scrollLeft();

// prebtn.addEventListener('click', pre())

// function pre() {
//     window.scrollX(-200, 0);
// }

// const slideList = document.querySelector('.list');
// const slideContents = document.querySelectorAll('.cotent'); // each slide dom
// const slideBtnPrev = document.querySelector('.prebtn'); // prev button
// const slideBtnNext = document.querySelector('.nxtbtn'); // next button
// const slideLen = slideContents.length; // slide length
// const slideWidth = 400; // slide width
// const slideSpeed = 300; // slide speed
// const startNum = 0; // initial slide index (0 ~ 4)

// var location2 = document.querySelector(".content");
// var w = location2.clientWidth;