import React, { Component } from 'react';
import { Container, Graphics } from 'react-pixi-fiber';
import { Power2, TimelineLite } from 'gsap';
import { SlideShaded } from './SlideShaded';
import * as PIXI from 'pixi.js';

import slide1 from '../../assets/slide1.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import slide4 from '../../assets/slide4.jpg';

class CanvasHome extends Component {
  constructor(props) {
    super(props);

    this.activeSlide = 0;

    this.container = React.createRef();
    this.graphic = React.createRef();

    this.isSliding = false;
    this.slides = [];

    this.init();
  }

  init() {
    const slides = [slide1, slide2, slide3, slide4];

    for (let i = 0; i < 4; i++) {
      const texture = PIXI.Texture.from(slides[i]);
      const slide = new SlideShaded(this.props.bounds, texture);
      this.slides.push(slide);
    }
  }

  nextSlideNumber(delta) {
    const totalSlides = this.container.current.children.length;
    return (this.activeSlide + totalSlides + delta) % totalSlides;
  }

  scroll(event) {
    if (this.isSliding) {
      return;
    }
    this.isSliding = true;

    const delta = Math.sign(event.deltaY);
    const currentItem = this.slides[this.activeSlide]; ///this.container.current.getChildAt(this.activeSlide);
    this.activeSlide = this.nextSlideNumber(delta);
    const nextItem = this.slides[this.activeSlide]; //this.container.current.getChildAt(this.activeSlide);

    currentItem.mesh.zIndex = 1;
    nextItem.mesh.zIndex = 0;
    this.container.current.sortChildren();

    const timeline = new TimelineLite({
      onStart: () => {
        nextItem.mesh.visible = true;
        currentItem.transitionDirection = delta;
      },
      onComplete: () => {
        currentItem.mesh.visible = false;
        this.isSliding = false;
      }
    });
    timeline
      .set(currentItem.mesh.position, { y: 0 })
      .set(nextItem.mesh.position, { y: 0 })
      .to(currentItem.mesh.position, 1.2, {
        y: delta * this.props.bounds.height,
        ease: Power2.easeInOut
      })
      .from(
        currentItem,
        1.2,
        {
          transitionTime: 1,
          ease: Power2.easeInOut
        },
        0
      );
  }

  componentDidMount() {
    const graphicEl = this.graphic.current;
    graphicEl.beginFill(0xff7d00);
    graphicEl.drawCircle(
      (this.props.bounds.width / 4) * 3,
      (this.props.bounds.height / 3) * 2,
      Math.min(this.props.bounds.width * 0.3, 180)
    );
    graphicEl.endFill();

    // Add slide meshes to Stage and mark the first one as visible
    const container = this.container.current;
    for (let slide of this.slides) {
      container.addChild(slide.mesh);
    }
    container.getChildAt(0).visible = true;
  }

  render() {
    return (
      <Container>
        <Container ref={this.container} sortableChildren={true} />
        <Graphics ref={this.graphic} />
      </Container>
    );
  }
}

export default CanvasHome;
