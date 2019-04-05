const canvas = document.querySelector('.canvas');
const mainEl = document.querySelector('main');

const vCanvas = document.createElement('canvas');
const ctx = vCanvas.getContext('2d');

let render;
const container = new PIXI.Container();
container.sortableChildren = true;
const stage = new PIXI.Stage();
let sliderIndex = 0;
stage.addChild(container);

function loadImages() {
    const images = [
        'https://images.unsplash.com/29/harbor.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80',
        'https://images.unsplash.com/photo-1553383408-37f7039b19a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1553431294-c75e827a5e57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    ];

    for(let i of images) {
        const texture = new PIXI.Texture.fromImage(i, true);
        const img = new PIXI.Sprite(texture);
        img.anchor.set(.5);
        img.scale.x = 2;
        img.scale.y = 2;
        img.x = renderer.width / 2;
        img.y = renderer.height / 2;
        img.alpha = 0;
        container.addChild(img);
    }
    container.children[0].alpha = 1;
}


function loop() {
    if(isAnimationPlaying) {
        renderer.render(stage);
    }
    requestAnimationFrame(loop);
}

window.onload = function () {
    renderer = PIXI.autoDetectRenderer(mainEl.offsetWidth, mainEl.offsetHeight, {
        transparent: true,
        view: canvas
    });

    vCanvas.width = 400;
    vCanvas.height = 400;

    const grd = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 400, 400);

    loadImages();

    const bg_disTexture = new PIXI.Texture.from('http://i.imgur.com/2yYayZk.png', true);
    const bg_disSprite = new PIXI.Sprite.from(bg_disTexture);
    const bg_disFilter = new PIXI.filters.DisplacementFilter(bg_disSprite);
    bg_disTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;


    const disTexture = PIXI.Sprite.from(vCanvas);
    const filter = new PIXI.filters.DisplacementFilter(disTexture);
    container.filters = [bg_disFilter];
    bg_disFilter.scale.x = 0;
    bg_disFilter.scale.y = 0;

    stage.addChild(disTexture);
    filter.scale.x = 150;
    filter.scale.y = -150;
    disTexture.anchor.set(.5);

    const shadows = [...document.querySelectorAll('.shadow')];

    mainEl.addEventListener('mousemove', event => {
        // const pos = keepSliderInVounds(event);
        // for(let child of container.children) {
        //     child.position.set(pos.x + window.innerWidth / 10, pos.y);
        // }
        renderer.render(stage);
    });

    //Should be removed one the dev server is no longer needed (PIXI JS does not work with a local server)
    setTimeout(() => {
        renderer.render(stage);
    }, 1000);
    loop();
}


function getNextSliderValue(delta = 1) {
    return (sliderIndex + 1) % 3;
}

let isAnimationPlaying = false;
const loader = document.querySelector('.slider_circle circle');
function slide(event) {
    if(!isAnimationPlaying) {
        isAnimationPlaying = true;
        loader.classList.remove('spin');
        setTimeout(() => {
            loader.classList.add('spin');
        }, 50);
    
        const prevIndex = sliderIndex;
        sliderIndex = getNextSliderValue();
        const timeline = new TimelineMax({
            onComplete: () => {
                isAnimationPlaying = false;
            }
        });

        if(sliderIndex===0) {
            timeline.to(container.filters[0].scale, 1, {x: 500, y: 500})
                    .to(container.children[sliderIndex], 0, {alpha: 1}, 0)
                    .to(container.children[prevIndex], 1, {alpha: .7}, 0)
                    .to(container.children[prevIndex], 1, {alpha: 0})
                    .to(container.filters[0].scale, 1, {x: 0, y: 0}, '-=1');

        } else {
            timeline.to(container.filters[0].scale, 1, {x: 500, y: 500})
                    .to(container.children[sliderIndex], 1, {alpha: .3}, 0)
                    .to(container.children[sliderIndex], 1, {alpha: 1})
                    .to(container.children[prevIndex], .5, {alpha: 0}, '-=.5')
                    .to(container.filters[0].scale, 1, {x: 0, y: 0}, '-=1');
        }

    }

}