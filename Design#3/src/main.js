const words = ['with', 'our', 'muse', 'we are', 'inspired'];
const wordsContainers = [...document.querySelectorAll('.slider_words div')];
const layersWrapper = document.querySelector('.layers_wrapper');

let animationInProgress = false;

function populateWords() {
    words.forEach((word, index) => {
        for(let letter of word) {
            wordsContainers[index].innerHTML += `<span>${letter}</span>`;
        }
    });
}

window.onload = function() {
    populateWords();

    document.addEventListener('click', () => {
        if(!animationInProgress) {
            animationInProgress = true;
            index+=1;
            //a separete index is needed for the last word in order to skip the space character
            ++lastWordIndex % 6 === 1 ? lastWordIndex++ : lastWordIndex;
            changeSlide();
            setTimeout(() => {
                animationInProgress = false;
            }, 2000)
        }
    }) ;

    setTimeout(() => {
        layersWrapper.children[0].classList.add('displayed');
        document.body.classList.remove('new');
        updateLetters();
    }, 1);
}

let index = 0;
let lastWordIndex = index;

function changeSlide() {
    layersWrapper.classList.add('covered');
    setTimeout(() => {
        layersWrapper.classList.remove('covered');
    }, 2000);

    layersWrapper.children[index % 3].classList.add('displayed');
    layersWrapper.children[(index + 2) % 3].classList.remove('displayed');

    updateLetters();
}

function updateLetters() {
    wordsContainers[0].children[(index + 2) % 4].classList.add('small');
    wordsContainers[0].children[(index + 1) % 4].classList.remove('small');

    wordsContainers[1].children[(index) % 3].classList.add('small');
    wordsContainers[1].children[(index + 3 - 1) % 3].classList.remove('small');

    wordsContainers[2].children[(3 - index % 4) % 4].classList.add('small');
    wordsContainers[2].children[(3 - index % 4 + 1) % 4].classList.remove('small');

    wordsContainers[3].children[(lastWordIndex + 1) % 6].classList.add('small');
    //if the index is on space position, remove the class from the previous element
    wordsContainers[3].children[(lastWordIndex % 6 === 2 ? lastWordIndex - 1 : lastWordIndex) % 6].classList.remove('small');
}
