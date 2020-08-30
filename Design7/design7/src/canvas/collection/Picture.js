import React, { Component } from 'react';
import { Sprite } from 'react-pixi-fiber';
import { Texture, Graphics, Filter, Shader, Program } from 'pixi.js';

import picture from '../../assets/image1.jpg';
import { TweenLite } from 'gsap';
import { Power4 } from 'gsap/gsap-core';

/**
 * SHADER
 */
var vertexShader = /* GLSL */ `
  precision mediump float;

  attribute vec2 aVertexPosition;
  attribute vec2 aUvs;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec2 vUvs;

  #define M_PI 3.1415926535897932384626433832795

  vec2 deformationCurve(vec2 position, vec2 uv, vec2 offset) {
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
  }

  void main() {
    vUvs = aUvs;
    vec2 newPosition = deformationCurve(aVertexPosition, vUvs, vec2(50.0));
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(newPosition, 1.0)).xy, 0.0, 1.0);

  }
`;

var fragmentShader = `
precision mediump float;

varying vec2 vUvs;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

const shader = Shader.from(vertexShader, fragmentShader, {
  uOffset: 1
});

class Picture extends Component {
  constructor(props) {
    super(props);

    this.sprite = React.createRef();

    this.speed = Math.random();
  }

  componentWillMount() {
    this.bounds = {
      x: this.props.x,
      y: this.props.y,
      width: 400,
      height: 400 * 1.4
    };

    this.texture = Texture.from(picture);
    // this.mask = new Graphics();
    // this.mask.beginFill(0x000000);
    // this.mask.drawRect(
    //   this.props.x,
    //   this.props.y,
    //   this.bounds.width,
    //   this.bounds.height
    // );
    // this.mask.endFill();
  }

  componentWillReceiveProps(props) {
    TweenLite.killTweensOf(this.sprite.current);
    TweenLite.to(this.sprite.current, 1, {
      y: props.y / 2 + (props.y / 2) * this.speed,
      ease: Power4.easeOut,
      onUpdate: () => {
        // this.mask.clear();
        // this.mask.beginFill(0x000000);
        // this.mask.drawRect(
        //   this.props.x,
        //   this.sprite.current.y,
        //   this.bounds.width,
        //   this.bounds.height
        // );
        // this.mask.endFill();
      }
    });
  }

  render() {
    return (
      <Sprite
        ref={this.sprite}
        x={this.bounds.x}
        y={this.bounds.y}
        texture={this.texture}
        width={this.bounds.width}
        height={this.bounds.height}
        // mask={this.mask}
        zIndex={this.props.zIndex}
        filters={[shader]}
      />
    );
  }
}

export default Picture;
