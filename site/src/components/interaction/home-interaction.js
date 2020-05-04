import { Interaction3d } from './interaction';
import { TweenLite, Power2, TimelineLite, Elastic, Bounce } from 'gsap';

export class HomeInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);
  }

  init() {
    super.init(5);

    const time = new TimelineLite();

    this.balls.forEach((ball, index) => {
      time.from(
        ball.mesh.scale,
        0.6,
        {
          x: 0.01,
          y: 0.01,
          z: 0.01,
          ease: Power2.easeOut,
        },
        index * 0.2
      );
    });

    // const offset = 40;
    // TweenLite.from(this.physiscs.bounds.top.position, 1, {
    //   y: `+=${offset}`,
    //   ease: Power2.out,
    // });
    // TweenLite.from(this.physiscs.bounds.bottom.position, 1, {
    //   y: `-=${offset}`,
    //   ease: Power2.out,
    // });
    // TweenLite.from(this.physiscs.bounds.left.position, 1, {
    //   x: `-=${offset}`,
    //   ease: Power2.out,
    // });
    // TweenLite.from(this.physiscs.bounds.right.position, 1, {
    //   x: `+=${offset}`,
    //   ease: Power2.out,
    // });
  }
}
