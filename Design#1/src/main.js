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
        if(layer.dataset.scene == index + 1) {
            layer.classList.add('layer-active-next');
        }
        if(layer.dataset.scene == prevIndex) {
            layer.classList.add('layer-active-prev');
        }
    }
}

function incrementLayerIndex() {
    prevIndex = index;
    index = (index % 3) + 1;
}

window.onload = function() {
    document.addEventListener('wheel', event => {
        if(!isAnimationInProgress) {
            incrementLayerIndex();
            nextLayer();
            isAnimationInProgress = true;
            setTimeout(() => {
                isAnimationInProgress = false;
            }, 2000);
        }

    });
}