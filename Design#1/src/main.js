let index = 0;
let prevIndex = 0;
let isAnimationInProgress = false;

const layers = [...document.querySelectorAll('.layer')];
function nextLayer() {
    for(let layer of layers) {
        layer.classList.remove('layer-active');
        layer.classList.remove('layer-active-next');
        layer.classList.remove('layer-active-prev');
        if(layer.dataset.scene == index) {
            layer.classList.add('layer-active');
        }
        if(layer.dataset.scene == adjustIndex(index + 1)) {
            layer.classList.add('layer-active-next');
        }
        if(layer.dataset.scene == prevIndex) {
            layer.classList.add('layer-active-prev');
        }
    }
}

function adjustIndex(index) {
    return (index % 4) === 0 ? 1 : index % 4;
}

function slide() {
    if(!isAnimationInProgress) {
        prevIndex = index;
        index = adjustIndex(index + 1);
        nextLayer();
        isAnimationInProgress = true;
        setTimeout(() => {
            isAnimationInProgress = false;
        }, 2000);
    }
}

const loader = document.querySelector('.loader');
window.onload = function() {
    document.addEventListener('wheel', this.slide.bind(this));
    slide();

    const menu = [...document.querySelectorAll('.menu_bottom a')];
    menu.forEach(el => {
        el.addEventListener('click', event => {
            event.preventDefault();
            loader.classList.add('active');
            setTimeout(() => {
                loader.classList.remove('active');
            }, 2000);
        });
    });
}