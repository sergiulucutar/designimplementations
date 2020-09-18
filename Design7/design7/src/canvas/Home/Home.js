import React, { Component } from 'react';
import { Container, Graphics, Circle } from 'react-pixi-fiber';
import { Power2, TimelineLite } from 'gsap';
import Slide from './Slide';

class CanvasHome extends Component {
  constructor(props) {
    super(props);

    this.activeSlide = 0;

    this.container = React.createRef();
    this.graphic = React.createRef();

    this.isSliding = false;
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
    const currentItem = this.container.current.getChildAt(this.activeSlide);
    this.activeSlide = this.nextSlideNumber(delta);
    const nextitem = this.container.current.getChildAt(this.activeSlide);

    const timeline = new TimelineLite({
      onStart: () => {
        nextitem.visible = true;
      },
      onComplete: () => {
        currentItem.visible = false;
        currentItem.position.y = 0;
        this.isSliding = false;
      }
    });
    timeline
      .set(currentItem.position, { y: 0 })
      .set(nextitem.position, { y: -delta * this.props.bounds.height })
      .to(currentItem.position, 1.2, {
        y: delta * this.props.bounds.height,
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

  componentDidMount() {
    const graphicEl = this.graphic.current;
    graphicEl.beginFill(0xff7d00);
    graphicEl.drawCircle(
      (this.props.bounds.width / 4) * 3,
      (this.props.bounds.height / 3) * 2,
      Math.min(this.props.bounds.width * 0.3, 180)
    );
    graphicEl.endFill();
  }

  render() {
    return (
      <Container>
        <Container ref={this.container}>
          <Slide bounds={this.props.bounds} visible={true}></Slide>
          <Slide bounds={this.props.bounds} visible={false}></Slide>
          <Slide bounds={this.props.bounds} visible={false}></Slide>
        </Container>
        <Graphics ref={this.graphic} />
      </Container>
    );
  }
}

export default CanvasHome;
