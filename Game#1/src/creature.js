class Creature {
    constructor() {
        this.position = getRandomPosition(),
        this.shape = {
            r: Math.floor(Math.random() * 10) + 1
        },
        this.behavior = {
            velocity: 1,
            idle: true
        };
        this.inViewCone = false;
    }

    update() {
        if(this.inViewCone) {
            this.position.x += Math.sign(game.player.position.x - this.position.x) * this.behavior.velocity;
            this.position.y += Math.sign(game.player.position.y - this.position.y) * this.behavior.velocity;
        }
    }

    draw() {
        if(this.inViewCone) {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.shape.r, 0, 2 * Math.PI);
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.shape.r, 0, 2 * Math.PI);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }
}