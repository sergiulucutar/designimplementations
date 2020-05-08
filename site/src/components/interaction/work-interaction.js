import { Interaction3d } from './interaction';
import { TimelineLite, Power4, Elastic, Power2 } from 'gsap/gsap-core';
import { TweenLite } from 'gsap/gsap-core';

const scaleSize = 1.4;
export class WorkInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);

    this.isInteractible = true;
    this.showAnimation = null;

    this.workIndex = 1;
    this.workMaxCount = 5;

    // DOM elemenetss
    this.workEl = document.getElementById('work');
    this.headersEl = [...this.workEl.querySelectorAll('ul li')];
    this.workSliderEl = document.querySelector('.work_slider');
    this.sliderIndexEl = [
      ...this.workEl.querySelectorAll('.work_slider > span')
    ];
  }

  init() {
    super.init(5);

    for (let ball of this.balls) {
      ball.body.position.x = 0;
      ball.body.position.y = 0;
      this.physiscs.world.removeBody(ball.body);
    }

    this.balls[0].mesh.scale.set(scaleSize, scaleSize, scaleSize);

    this.domEl.addEventListener('click', this.onclick.bind(this));

    this.animationTimeline = new TimelineLite();
  }

  onclick() {
    if (!this.isInteractible) {
      return;
    }

    this.hideCurrentSlide();

    if (this.workIndex === this.workMaxCount) {
      this.isInteractible = false;

      const timeline = new TimelineLite({
        onComplete: () => (this.isInteractible = true)
      });

      timeline
        .to(this.workSliderEl, 0.4, {
          opacity: 0,
          ease: Power4.easeInOut
        })
        .call(this.reset.bind(this), null)
        .to(
          this.balls[0].mesh.scale,
          0.6,
          {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: Power2.easeOut,
            onStart: () => {
              this.balls[0].mesh.visible = true;
            }
          },
          1.4
        )
        .to(this.workSliderEl, 0.4, {
          opacity: 1,
          ease: Power4.easeInOut
        })
        .call(this.toNextSlide.bind(this), null, '-=0.4');
    } else {
      this.toNextSlide();
    }
  }

  toNextSlide() {
    this.workIndex = (this.workIndex % 5) + 1;
    this.showCurrentSlide();
  }

  hideCurrentSlide() {
    // If the intro tween has not finished, kill it
    if (this.showAnimation) {
      this.showAnimation.kill();
    }

    this.balls[this.workIndex - 1].mesh.scale.set(1, 1, 1);
    this.balls[this.workIndex - 1].body.velocity.set(
      100 * (Math.random() * 2 - 1),
      100 * (Math.random() * 2 - 1),
      0
    );
    this.physiscs.world.add(this.balls[this.workIndex - 1].body);

    // Animate project title -> out
    this.workEl.querySelector(
      `ul li:nth-of-type(${this.workIndex})`
    ).classList = 'prev';

    // Animate project index -> out
    this.workEl.querySelector(
      `.work_slider span:nth-of-type(${this.workIndex})`
    ).classList = 'prev';

    // Animate project description -> out
    this.workEl
      .querySelector(`.description div:nth-of-type(${this.workIndex})`)
      .classList.remove('show');
  }

  showCurrentSlide() {
    this.showAnimation = TweenLite.to(
      this.balls[this.workIndex - 1].mesh.scale,
      0.6,
      {
        x: scaleSize,
        y: scaleSize,
        z: scaleSize,
        ease: Power2.easeOut,
        onStart: () => (this.balls[this.workIndex - 1].mesh.visible = true)
      }
    );

    // Animate project title -> in
    this.workEl
      .querySelector(`ul li:nth-of-type(${this.workIndex})`)
      .classList.add('show');

    // Animate project description -> in
    this.workEl
      .querySelector(`.description div:nth-of-type(${this.workIndex})`)
      .classList.add('show');

    // Animate project slider -> in
    this.workEl
      .querySelector(`.work_slider span:nth-of-type(${this.workIndex})`)
      .classList.add('show');
  }

  reset() {
    // Reset visibility
    for (let i = 0; i < this.workMaxCount; i++) {
      this.headersEl[i].classList = '';
      this.sliderIndexEl[i].classList = '';
    }

    // Gather all spheres in the center
    for (let ball of this.balls) {
      this.physiscs.world.remove(ball.body);
      TweenLite.to(ball.body.position, 0.4, {
        x: 0,
        y: 0
      });
      TweenLite.to(ball.mesh.scale, 0.4, {
        x: 0.1,
        y: 0.1,
        z: 0.1,
        onComplete: () => {
          ball.mesh.visible = false;
          console.log('FALSE');
        }
      });
    }
  }
}
