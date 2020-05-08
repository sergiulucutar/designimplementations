import * as THREE from 'three';
import { Interaction3d } from './interaction';
import { Power2, TimelineLite, Elastic, TweenLite } from 'gsap';

export class HomeInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  init() {
    super.init(5);

    this.domEl.addEventListener('click', event => {
      this.mouse.x = (event.clientX / this.bounds[0]) * 2 - 1;
      this.mouse.y = -(event.clientY / this.bounds[1]) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      if (intersects.length) {
        TweenLite.from(intersects[0].object.scale, 1.2, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          ease: Elastic.easeOut
        });

        const ball = this.balls.find(
          ball => ball.mesh === intersects[0].object
        );
        ball.body.velocity.x = (Math.random() * 2 - 1) * 100;
        ball.body.velocity.y = (Math.random() * 2 - 1) * 100;
      }
    });

    const time = new TimelineLite();
    this.balls.forEach((ball, index) => {
      ball.mesh.visible = false;
      time.from(
        ball.mesh.scale,
        0.6,
        {
          x: 0.01,
          y: 0.01,
          z: 0.01,
          ease: Elastic.easeOut,
          onStart: () => (ball.mesh.visible = true)
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
