import { Interaction3d } from './interaction';
import { TimelineLite } from 'gsap/gsap-core';
import { TweenLite } from 'gsap/gsap-core';

const scaleSize = 1.4;
export class WorkInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);

    this.workIndex = 1;
    this.workMaxCount = 5;

    this.workEl = document.getElementById('work');

    this.headers = [...document.querySelectorAll('ul li')];
  }

  init() {
    super.init(5);

    for (let ball of this.balls) {
      ball.body.position.x = 0;
      ball.body.position.y = 0;
      ball.mesh.scale.set(0, 0, 0);
      this.world.removeBody(ball.body);
    }

    this.balls[0].mesh.scale.set(scaleSize, scaleSize, scaleSize);

    this.domEl.addEventListener('click', this.onclick.bind(this));

    this.animationTimeline = new TimelineLite();
  }

  onclick() {
    this.hideCurrentSlide();

    if (this.workIndex === this.workMaxCount) {
      this.reset();
    }
    this.workIndex = (this.workIndex % 5) + 1;

    this.showCurrentSlide();
  }

  hideCurrentSlide() {
    this.balls[this.workIndex - 1].mesh.scale.set(1, 1, 1);
    this.balls[this.workIndex - 1].body.velocity.set(
      100 * (Math.random() * 2 - 1),
      100 * (Math.random() * 2 - 1),
      0
    );
    this.world.add(this.balls[this.workIndex - 1].body);

    this.workEl.querySelector(
      `ul li:nth-of-type(${this.workIndex})`
    ).classList = 'prev';

    this.workEl
      .querySelector(`.description div:nth-of-type(${this.workIndex})`)
      .classList.remove('show');

    this.workEl
      .querySelector(`.work_slider span:nth-of-type(${this.workIndex})`)
      .classList.remove('show');
  }

  showCurrentSlide() {
    const aux = {
      scale: 1,
    };

    TweenLite.to(aux, 0.6, {
      scale: scaleSize,
      onUpdate: () => {
        this.balls[this.workIndex - 1].mesh.scale.set(
          aux.scale,
          aux.scale,
          aux.scale
        );
      },
    });

    this.workEl
      .querySelector(`.description div:nth-of-type(${this.workIndex})`)
      .classList.add('show');

    this.workEl
      .querySelector(`ul li:nth-of-type(${this.workIndex})`)
      .classList.add('show');

    this.workEl
      .querySelector(`.work_slider span:nth-of-type(${this.workIndex})`)
      .classList.add('show');
  }

  reset() {
    for (let ball of this.balls) {
      this.world.remove(ball.body);

      ball.body.position.x = 0;
      ball.body.position.y = 0;
      ball.body.position.z = 0;

      // ball.mesh.translateX(-ball.mesh.position.x);
      // ball.mesh.translateY(-ball.mesh.position.y);
    }

    for (let header of this.headers) {
      header.classList = '';
    }
  }
}
