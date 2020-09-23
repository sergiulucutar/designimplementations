import React, { Component } from 'react';
import { Container, Graphics } from 'react-pixi-fiber';
import { Power2, TimelineLite } from 'gsap';
import { SlideShaded } from './SlideShaded';
import * as PIXI from 'pixi.js';
import { Bubble } from './Bubble';

class CanvasHome extends Component {
  constructor(props) {
    super(props);

    this.activeSlide = 0;

    this.container = React.createRef();
    this.wrapper = React.createRef();

    this.isSliding = false;
    this.slides = [];

    this.init();
  }

  init() {
    for (let i = 0; i < 4; i++) {
      const texture = PIXI.Loader.shared.resources[`image${i + 1}`].texture;
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
    // Add slide meshes to Stage and mark the first one as visible
    const container = this.container.current;
    for (let slide of this.slides) {
      slide.mesh.visible = false;
      container.addChild(slide.mesh);
    }
    container.getChildAt(this.activeSlide).visible = true;

    this.bubble = new Bubble(
      (this.props.bounds.width / 4) * 3,
      (this.props.bounds.height / 3) * 2,
      Math.min(this.props.bounds.width * 0.3, 180),
      this.props.bounds.width / 2,
      this.props.bounds.height
    );

    this.wrapper.current.addChild(this.bubble.graphic);
  }

  close() {
    this.bubble.moveTo(
      this.props.bounds.width / 4,
      this.props.bounds.height / 2,
      1
    );
  }

  render() {
    return (
      <Container ref={this.wrapper}>
        <Container ref={this.container} sortableChildren={true} />
        <Graphics ref={this.graphic} />
      </Container>
    );
  }
}

export default CanvasHome;
