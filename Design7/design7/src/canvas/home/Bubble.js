import { TimelineLite } from 'gsap';
import { Power2 } from 'gsap/gsap-core';
import * as PIXI from 'pixi.js';

export class Bubble {
  constructor(x, y, r, m_width, m_height) {
    this.state = {
      x,
      y,
      r,
      offsetY: 0
    };

    this.graphic = new PIXI.Graphics();
    this.draw();

    const mask = new PIXI.Graphics();
    mask.beginFill(0x000000);
    mask.drawRect(0, 0, m_width, m_height);
    mask.endFill();
    this.mask = mask;
    // this.graphic.mask = mask;
  }

  moveTo(newX, newY, time) {
    const timeline = new TimelineLite({
      onUpdate: () => {
        this.state.y += Math.sin(this.state.offsetY * Math.PI) * 150;
        this.draw();
      }
    });
    timeline
      .set(this.state, { offsetY: 0 })
      .to(this.state, time * 0.5, {
        x: newX,
        y: newY,
        r: this.state.r * 0.2,
        offsetY: 1,
        ease: Power2.easeIn
      })
      .call(() => (this.graphic.mask = this.mask))
      .to(this.state, time * 0.5, {
        r: 700,
        ease: Power2.easeOut
      });
  }

  draw() {
    this.graphic.clear();
    this.graphic.beginFill(0xff7d00);
    this.graphic.drawCircle(this.state.x, this.state.y, this.state.r);
    this.graphic.endFill();
  }
}
