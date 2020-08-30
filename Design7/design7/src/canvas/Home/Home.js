import React, { Component } from 'react';
import { Container, withApp } from 'react-pixi-fiber';
import { Power2, TimelineLite } from 'gsap';
import Slide from './Slide';

class CanvasHome extends Component {
  constructor(props) {
    super(props);

    this.activeSlide = 0;

    this.container = React.createRef();
  }

  scroll() {
    const currentItem = this.container.current.getChildAt(this.activeSlide);
    const nextitem = this.container.current.getChildAt(++this.activeSlide);

    nextitem.position.y = this.props.bounds.height;
    nextitem.visible = true;
    // currentItem.visible = true;
    const timeline = new TimelineLite({
      onComplete: () => {
        currentItem.visible = false;
        currentItem.position.y = 0;
      }
    });
    timeline
      .to(currentItem.position, 1.2, {
        y: -this.props.bounds.height,
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

  render() {
    return (
      <Container ref={this.container}>
        <Slide bounds={this.props.bounds} visible={true}></Slide>
        <Slide bounds={this.props.bounds} visible={false}></Slide>
        <Slide bounds={this.props.bounds} visible={false}></Slide>
      </Container>
    );
  }
}

export default CanvasHome;
