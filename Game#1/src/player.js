class Player {

    constructor() {
        this.position = {
            x: (.5 + bounds.maxX / 2) << 0,
            y: (.5 + bounds.maxY / 2) << 0
        };
        this.velocity = 2;
        this.viewCone = {
            direction: {x: 0, y: 1},
            distance: 300,
            width: 250,
            active: false,
            startPoint: {
                x: 0,
                y: 0
            }
        };

        this.angle = 0;

        document.addEventListener('mousemove', event => {
            const mag = Math.sqrt(Math.pow(event.clientX - this.position.x,2) + Math.pow(event.clientY - this.position.y,2));

            this.viewCone.startPoint = {
                x: this.position.x + (event.clientX - this.position.x) / mag * 300,
                y: this.position.y + (event.clientY - this.position.y) / mag * 300
            };

            this.angle = Math.atan2(event.pageX - this.position.x, -1 * (event.pageY - this.position.y));
        });
    }

    update() {
    }

    draw() {
        this.drawViewCone();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 10, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#f4e542'
        ctx.fill();
    }

    drawViewCone() {
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.arc(this.position.x, this.position.y, 300, -Math.PI/2 + -Math.PI/6 + this.angle, -Math.PI/2 + Math.PI/6 + this.angle);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();

        // if(this.viewCone.active) {
        //     ctx.beginPath();
        //     ctx.moveTo(this.position.x, this.position.y);
        //     ctx.lineTo(this.viewCone.p1.x, this.viewCone.p1.y);
        //     ctx.lineTo(this.viewCone.p2.x, this.viewCone.p2.y);
        //     ctx.fillStyle = 'black';
        //     ctx.fill();
        //     ctx.closePath();
        // }
    }

    exitReached(exit) {
        const dist = Math.pow(this.position.x - exit.position.x, 2) + Math.pow(this.position.y - exit.position.y, 2);
        return dist < Math.pow(exit.r, 2);
    }

    isPointInViewCone(x, y) {
        const angle1 = this.angle + Math.PI / 6 + Math.PI/2;
        const angle2 = this.angle - Math.PI / 6 + Math.PI/2;

        const point = {
            x: x - this.position.x,
            y: y - this.position.y
        };
       
        return !this._areClockwise(this.position, 300, angle1, point) && this._areClockwise(this.position, 300, angle2, point) && this._isWithinRadius(point, 300 * 300);
    }

    _areClockwise(center, radius, angle, point2) {
        const point1 = {
          x : (center.x + radius) * Math.cos(angle),
          y : (center.y + radius) * Math.sin(angle)
        };
        return -point1.x*point2.y + point1.y*point2.x > 0;
      }
    
    _signPointInCone(p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    _isWithinRadius(v, radiusSquared) {
        return v.x*v.x + v.y*v.y <= radiusSquared;
    }
}