import * as PIXI from 'pixi.js';
import React, { Component } from 'react';
import { Container, Graphics, Text } from 'react-pixi-fiber';
import { random } from 'gsap/gsap-core';
import { Image } from '../Image';
import { TimelineLite, TweenLite, TweenMax } from 'gsap';
import { Power2 } from 'gsap/gsap-core';
import gsap from 'gsap/gsap-core';

class CanvasCollection extends Component {
  constructor(props) {
    super(props);

    this.contentConatiner = React.createRef();
    this.background = React.createRef();
    this.images = [];
  }

  componentDidMount() {
    this.drawBackground();
    this.createImages();
    this.addImagesToScene();
  }

  componentWillUnmount() {
    this.killTimelines();
  }

  createImages() {
    const size = { width: 400, height: 400 * 1.4 };

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 4; i++) {
        const texture = PIXI.Loader.shared.resources[`image${i + 1}`].texture;
        const slide = new Image(size, texture, 50);
        slide.speed = 3;
        this.images.push(slide);
      }
    }
  }

  addImagesToScene() {
    let lastIndex = 0,
      currentIndex = 0;
    this.images.forEach((image, index) => {
      lastIndex = currentIndex;

      do {
        currentIndex = Math.floor(random(0, 5));
      } while (lastIndex === currentIndex);

      image.mesh.position.x =
        (this.props.bounds.width / 6) * currentIndex +
        this.props.bounds.width * 0.1;
      image.mesh.position.y = 500 * index;
      image.mesh.zIndex = Math.floor(Math.random() * 2) - 1;

      this.contentConatiner.current.addChild(image.mesh);
    });
  }

  drawBackground() {
    this.background.current.clear();
    this.background.current.beginFill(0xff7d00);
    this.background.current.drawRect(
      0,
      0,
      this.props.bounds.width / 2,
      this.props.bounds.height
    );
    this.background.current.endFill();
  }

  updatePicturesPosition(event) {
    // const distance =
    // props.y / 2 + (props.y / 2) * this.speed - this.sprite.current.y;
    this.killTimelines();
    this.images.forEach(image => {
      const distance = event.deltaY * image.speed;
      image.offset = Math.abs(distance * 0.05);
      image.transitionDirection = Math.sign(event.deltaY);

      image.timeline = new TimelineLite()
        .to(image.mesh.position, 0.8, {
          y: `+=${distance}`,
          ease: Power2.easeOut
        })
        .from(
          image,
          0.8,
          {
            transitionTime: 1,
            ease: Power2.easeOut
          },
          0
        );
    });
  }

  killTimelines() {
    this.images.forEach(image => {
      if (image.timeline) {
        image.timeline.kill();
        delete image.timeline;
      }
    });
  }

  scroll(event) {
    this.updatePicturesPosition(event);
  }

  render() {
    const fontOptions = {
      fontFamily: 'WremenaLight',
      fontSize: 90,
      fill: 0xffffff,
      align: 'center'
    };

    const TextAnchor = {
      x: 0.5,
      y: 0.5
    };

    return (
      <Container>
        <Graphics ref={this.background} />
        <Container ref={this.contentConatiner} sortableChildren={true}>
          <Text
            text='CMGHT 
          Collection'
            x={this.props.bounds.width / 2}
            y={this.props.bounds.height / 2}
            style={fontOptions}
            anchor={TextAnchor}
            zIndex={0}
          ></Text>
        </Container>
      </Container>
    );
  }
}

export default CanvasCollection;
