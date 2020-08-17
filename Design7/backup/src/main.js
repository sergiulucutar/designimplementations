import * as PIXI from 'pixi.js';
import { TweenLite, Power2, TimelineLite } from 'gsap';

class Canvas {
  constructor() {
    // Setup canvas
    this.bounds = [window.innerWidth, window.innerHeight];
    this.pixi = new PIXI.Application({
      width: this.bounds[0],
      height: this.bounds[1],
      antialias: true,
      transparent: false
    });
    this.pixi.renderer.autoResize = true;
    this.pixi.renderer.view.style.position = 'absolute';
    this.pixi.renderer.view.style.top = '0';
    this.pixi.renderer.view.style.display = 'block';
    this.pixi.renderer.view.style.zIndex = '-1';
    this.pixi.renderer.backgroundColor = 0x6d696a;
    this.pixi.renderer.autoResize = true;
    document.body.appendChild(this.pixi.view);

    this.slideIndex = 0;
    this.sliderOverlayTiming = 0;
    this.slides = [];
    this.toggleSlide = true;
  }

  init() {
    //left side graphic
    this.createSlides();

    // right side graphic
    let slideCircle = new PIXI.Graphics();
    slideCircle.beginFill(0xff7d00);
    slideCircle.drawCircle(0, 0, 200);
    slideCircle.endFill();
    slideCircle.x = this.bounds[0] * 0.25 * 3 - 80;
    slideCircle.y = this.bounds[1] / 2 + 100;
    this.pixi.stage.addChild(slideCircle);

    // Events
    const button = document.querySelector('.button');
    button.addEventListener('click', () => {
      if (this.toggleSlide) {
        slideCircle.visible = false;
        this.transitionIn();
      } else {
        slideCircle.visible = true;
        this.transitionOut();
      }

      this.toggleSlide = !this.toggleSlide;
    });

    document.addEventListener('wheel', event => this.scroll());
  }

  createSlides() {
    for (let i = 0; i < 3; i++) {
      const slide = new PIXI.Container();

      let img = new PIXI.Sprite(PIXI.Loader.shared.resources['image1'].texture);
      img.width = this.bounds[0] / 2;
      img.height = this.bounds[1] * (img.texture.height / img.texture.width);
      slide.addChild(img);

      let slideOverlayColor = new PIXI.Graphics();
      slide.addChild(slideOverlayColor);

      const mask = new PIXI.Graphics();
      mask.beginFill(0x000000);
      mask.drawCircle(this.bounds[0] / 4, this.bounds[1] / 2, this.bounds[1]);
      mask.endFill();
      img.mask = mask;

      this.slides.push({
        img,
        overlay: slideOverlayColor
      });
      slide.visible = false;
      this.pixi.stage.addChild(slide);
    }

    this.pixi.stage.getChildAt(this.slideIndex).visible = true;
  }

  scroll() {
    const currentItem = this.pixi.stage.getChildAt(this.slideIndex);
    const nextitem = this.pixi.stage.getChildAt(++this.slideIndex);

    nextitem.position.y = this.bounds[1];

    // currentItem.visible = true;
    nextitem.visible = true;

    const timeline = new TimelineLite({
      onComplete: () => {
        currentItem.visible = false;
        currentItem.position.y = 0;
      }
    });
    timeline
      .to(currentItem.position, 1.2, {
        y: -this.bounds[1],
        ease: Power2.easeInOut
      })
      .to(
        nextitem.position,
        1.2,
        {
          y: 0,
          ease: Power2.easeInOut
        },
        0
      );
  }

  transitionIn() {
    this.sliderOverlayTiming = 0;
    const activeSlide = this.slides[this.slideIndex];

    activeSlide.img.zIndex = 0;
    activeSlide.overlay.zIndex = 1;
    this.pixi.stage.getChildAt(this.slideIndex).sortChildren();

    activeSlide.overlay.clear();

    // TweenLite.kill;
    let rectWidth, rectHeight;
    TweenLite.to(this, 0.6, {
      sliderOverlayTiming: 1,
      ease: Power2.easeOut,
      onUpdate: () => {
        rectWidth = (this.bounds[0] / 2) * this.sliderOverlayTiming;
        rectHeight = this.bounds[1] * this.sliderOverlayTiming;
        activeSlide.overlay.clear();
        activeSlide.overlay.beginFill(0xff7d00);
        activeSlide.overlay.drawRect(0, 0, rectWidth, rectHeight);
        activeSlide.overlay.endFill();
        activeSlide.overlay.x = this.bounds[0] / 4 - rectWidth / 2;
        activeSlide.overlay.y = this.bounds[1] / 2 - rectHeight / 2;
      }
    });
  }

  transitionOut() {
    const activeSlide = this.slides[this.slideIndex];
    activeSlide.img.mask.clear();

    activeSlide.img.zIndex = 1;
    activeSlide.overlay.zIndex = 0;
    this.pixi.stage.getChildAt(this.slideIndex).sortChildren();

    TweenLite.from(this, 1.2, {
      sliderOverlayTiming: 0,
      ease: Power2.easeOut,
      onUpdate: () => {
        activeSlide.img.mask.clear();
        activeSlide.img.mask.beginFill(0x000000);
        activeSlide.img.mask.drawCircle(
          this.bounds[0] / 4,
          this.bounds[1] / 2,
          this.bounds[1] * 0.8 * this.sliderOverlayTiming
        );
        activeSlide.img.mask.endFill();
      }
    });
  }
}

const pixiapp = new Canvas();

PIXI.Loader.shared
  .add('image1', '/image1.jpg')
  .load(pixiapp.init.bind(pixiapp));
