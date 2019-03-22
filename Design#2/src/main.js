const canvas = document.querySelector('.canvas');
const mainEl = document.querySelector('main');

const vCanvas = document.createElement('canvas');
const ctx = vCanvas.getContext('2d');

function svgUrl(svgString, width, height, viewBoxWidth, viewBoxHeight) {
    viewBoxWidth = viewBoxWidth || width;
    viewBoxHeight = viewBoxHeight || width;
    return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${width}" height="${height}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}">${svgString}</svg>')`;
  }


window.onload = function () {
    vCanvas.width = 400;
    vCanvas.height = 400;

    const grd = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 400, 400);

    const renderer = PIXI.autoDetectRenderer(canvas.offsetWidth, canvas.offsetHeight, {
        transparent: true,
        view: canvas
    });

    const stage = new PIXI.Stage();
    const container = new PIXI.Container();
    stage.addChild(container);

    const bg = PIXI.Sprite.fromImage('http://localhost:3000/photo.jpeg');
    bg.width = canvas.offsetWidth;
    bg.height = canvas.offsetHeight;
    bg.position.x = 0;
    bg.position.y = 0;
    container.addChild(bg);

    const disTexture = PIXI.Sprite.from(vCanvas);
    const filter = new PIXI.filters.DisplacementFilter(disTexture);
    container.filters = [filter];
    stage.addChild(disTexture);
    filter.scale.x = 150;
    filter.scale.y = -150;
    disTexture.anchor.set(.5);

    // const mousePointer = new PIXI.Graphics();
    // stage.addChild(mousePointer);

    mainEl.addEventListener('mousemove', event => {
        disTexture.position.set(event.clientX + window.innerWidth / 10, event.clientY);
        // mousePointer.clear();
        // mousePointer.beginFill(0xff0000);
        // mousePointer.drawCircle(event.clientX + window.innerWidth / 10, event.clientY, 10);
        // mousePointer.endFill();
        renderer.render(stage);
    });

    //Should be removed one the dev server is no longer needed (PIXI JS does not work with a local server)
    setTimeout(() => {
        renderer.render(stage);
    }, 100);

    // canvas.style.cursor = `${svgUrl('<circle cx="100" cy="100" r="100" fill="red/>', 100, 100, 200, 200)}, auto`;
}