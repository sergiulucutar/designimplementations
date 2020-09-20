import React, { Component } from 'react';
import { Sprite, withApp } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

import picture from '../../assets/image1.jpg';

class Slide extends Component {
  state = {
    resolution: 1
  };

  constructor(props) {
    super(props);

    this.overlay = React.createRef();

    this.transitionTiming = 0;
    this.toggleDetails = true;

    this.tweenReference = null;
  }

  componentWillMount() {
    const { bounds } = this.props;

    this.mask = new PIXI.Graphics();
    this.mask.beginFill(0x000000);
    this.mask.drawRect(0, 0, bounds.width / 2, bounds.height);
    this.mask.endFill();

    this.texture = PIXI.Texture.from(picture);

    //this needs to be changes
    if (this.texture.width > 1) {
      this.updateImageResolution(this.texture.width, this.texture.height);
    }

    this.texture.on('update', () =>
      this.updateImageResolution(this.texture.width, this.texture.height)
    );
  }

  updateImageResolution() {
    const delta_width =
      this.props.bounds.width / 2 / this.texture.baseTexture.width;
    this.texture.baseTexture.height *= delta_width;
  }

  render() {
    return (
      <Sprite
        visible={this.props.visible}
        width={this.props.bounds.width / 2}
        height={this.props.bounds.height}
        texture={this.texture}
        mask={this.mask}
      />
    );
  }
}

export default withApp(Slide);
