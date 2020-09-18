import React, { Component } from 'react';
import { Sprite, withApp, Container, Graphics } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { TweenLite, Power2 } from 'gsap';

import picture from '../../assets/image1.jpg';

class Slide extends Component {
  state = {
    resolution: 1
  };

  constructor(props) {
    super(props);

    this.container = React.createRef();
    this.overlay = React.createRef();

    this.transitionTiming = 0;
    this.toggleDetails = true;

    this.tweenReference = null;
  }

  componentWillMount() {
    const { bounds } = this.props;

    this.mask = new PIXI.Graphics();
    this.mask.beginFill(0x000000);
    this.mask.drawCircle(
      bounds.width / 4,
      bounds.height / 2,
      bounds.height * 0.8
    );
    this.mask.endFill();

    this.texture = PIXI.Texture.from(picture);

    //this needs to be changes
    if (this.texture.width > 1) {
      this.updateImageResolution(this.texture.width, this.texture.height);
    }

    this.texture.on('update', () =>
      this.updateImageResolution(this.texture.width, this.texture.height)
    );

    // window.appHistory.listen(location => {
    //   if (this.tweenReference) {
    //     this.tweenReference.kill();
    //   }

    //   console.log('This is a location', location);
    //   if (location.pathname !== '/') {
    //     this.transitionIn();
    //   } else {
    //     this.transitionOut();
    //   }
    // });
  }

  componentDidMount() {
    // document.querySelector('.button').addEventListener('click', event => {
    //   if (this.tweenReference) {
    //     this.tweenReference.kill();
    //   }
    //   if (this.toggleDetails) {
    //     this.transitionIn();
    //   } else {
    //     this.transitionOut();
    //   }
    //   this.toggleDetails = !this.toggleDetails;
    // });
  }

  transitionIn() {
    this.transitionTiming = 0;
    this.overlay.current.clear();

    this.overlay.current.zIndex = 1;
    this.container.current.sortChildren();

    const { bounds } = this.props;
    // TweenLite.kill;
    let rectWidth, rectHeight;
    this.tweenReference = TweenLite.to(this, 0.6, {
      transitionTiming: 1,
      ease: Power2.easeOut,
      onUpdate: () => {
        rectWidth = (bounds.width / 2) * this.transitionTiming;
        rectHeight = bounds.height * this.transitionTiming;
        this.overlay.current.clear();
        this.overlay.current.beginFill(0xff7d00);
        this.overlay.current.drawRect(0, 0, rectWidth, rectHeight);
        this.overlay.current.endFill();
        this.overlay.current.x = bounds.width / 4 - rectWidth / 2;
        this.overlay.current.y = bounds.height / 2 - rectHeight / 2;
      }
    });
  }

  transitionOut() {
    this.mask.clear();
    this.transitionTiming = 0;

    this.overlay.current.zIndex = -1;
    this.container.current.sortChildren();

    const { bounds } = this.props;
    this.tweenReference = TweenLite.to(this, 1.2, {
      transitionTiming: 1,
      ease: Power2.easeOut,
      onUpdate: () => {
        this.mask.clear();
        this.mask.beginFill(0x000000);
        this.mask.drawCircle(
          bounds.width / 4,
          bounds.height / 2,
          bounds.height * 0.8 * this.transitionTiming
        );
        this.mask.endFill();
      }
    });
  }

  updateImageResolution(width, height) {
    this.setState({
      resolution: height / width
    });
  }

  render() {
    return (
      <Container ref={this.container} visible={this.props.visible}>
        <Sprite
          texture={this.texture}
          width={this.props.bounds.width / 2}
          height={this.props.bounds.height * this.state.resolution}
          mask={this.mask}
        />
        <Graphics ref={this.overlay}></Graphics>
      </Container>
    );
  }
}

export default withApp(Slide);
