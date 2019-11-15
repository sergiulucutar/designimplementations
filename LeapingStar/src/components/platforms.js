import { random, isLineInCircle } from "./utils";

class Platform {
    constructor(ctx, position) {
        this.ctx = ctx;

        this.position = position;
        this.length = 300;
        this.halfLength = this.length / 2;
        this.color = 'red';

        this.velocity = random(0, 8);
    }

    update({width, height}, padding){
        if(this.position[0] < padding || this.position[0] > width - padding) {
            this.velocity *= -1;
        }
        this.position[0] += this.velocity;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.position[0] - this.halfLength, this.position[1]);
        this.ctx.lineTo(this.position[0] + this.halfLength, this.position[1]);
        this.strokeStyle = this.color;
        this.ctx.stroke();
    }
}

export default class Platforms {
    constructor(game) {
        this.game = game;
        
        this.platforms = [];
        this.platformsCount = 20;

        this.padding = 500;
    }
    
    init() {
        const { bounds, ctx } = this.game;
        
        for(let i = 0; i < this.platformsCount; i++) {
            const platform = new Platform(ctx, [random(this.padding, bounds.width - this.padding), bounds.height - i * random(100, 200)]);
            this.platforms.push(platform);
        }
    }

    draw() {
        for(let platform of this.platforms) {
            platform.draw();
        }
    }

    update() {
        for(let platform of this.platforms) {
            platform.update(this.game.bounds, this.padding);
        }
    }

    checkForPlatformCollisions(ball) {
        for(let platform of this.platforms) {
            if(isLineInCircle([[platform.position[0] - platform.length / 2, platform.position[1]],
                [platform.position[0] + platform.length / 2, platform.position[1]]], ball)) {
                    ball.collide();
                }
        }
      }
}