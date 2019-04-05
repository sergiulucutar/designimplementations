const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const bounds = {
    maxX: window.innerWidth,
    maxY: window.innerHeight
};
const game = {};
let level = 1;

function getRandom(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPosition() {
    return {
        x: getRandom(bounds.maxX, 0),
        y: getRandom(bounds.maxY, 0)
    };
}

function init() {
    game.exit = {
        position: getRandomPosition(),
        r: 20
    };
    game.player = new Player();
    game.keys = {
        active: new Set()
    };

    document.addEventListener('keydown', event => {
        game.keys.active.add(event.keyCode);
    });

    document.addEventListener('keyup', event => {
        game.keys.active.delete(event.keyCode);
    });

    game.creatures = [];
    for(let i = 0; i < 20; i++) {
        game.creatures.push(new Creature());
    }
}

function drawExit() {
    if(game.player.isPointInViewCone(game.exit.position.x, game.exit.position.y)) {
        ctx.beginPath();
        ctx.arc(game.exit.position.x, game.exit.position.y, game.exit.r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }
}

function drawCreatues() {
    for(let creature of game.creatures) {
        creature.draw();
    }
}

function update() {
    if(game.player.exitReached(game.exit)) {
        level++;
        init();
    }

    if(game.keys.active.has(32)) {
        game.player.viewCone.active = !game.player.viewCone.active;
    }
    if(game.keys.active.has(65)) {
        game.player.position.x -= game.player.velocity;
        game.player.viewCone.direction.x = -1;
        game.player.viewCone.direction.y = 0;
    }
    if(game.keys.active.has(68)) {
        game.player.position.x += game.player.velocity;
        game.player.viewCone.direction.x = 1;
        game.player.viewCone.direction.y = 0;
    }
    if(game.keys.active.has(83)) {
        game.player.position.y += game.player.velocity;
        game.player.viewCone.direction.x = 0;
        game.player.viewCone.direction.y = 1;
    }
    if(game.keys.active.has(87)) {
        game.player.position.y -= game.player.velocity;
        game.player.viewCone.direction.x = 0;
        game.player.viewCone.direction.y = -1;
    }
    game.player.update();
    for(let creature of game.creatures) {
        creature.inViewCone = game.player.isPointInViewCone(creature.position.x, creature.position.y);
        creature.update();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.player.draw();
    drawCreatues();
    drawExit();
}

function loop() {
    update();
    draw();

    requestAnimationFrame(loop);
}


window.onload = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
    loop();
}