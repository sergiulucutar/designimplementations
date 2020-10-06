import React, { Component } from 'react';
import { Sprite } from 'react-pixi-fiber';
import { Texture, Graphics, Geometry } from 'pixi.js';

import picture from '../../assets/slide1.jpg';
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

  uniform float uOffset;

  #define M_PI 3.1415926535897932384626433832795

  vec2 deformationCurve(vec2 position, vec2 uv, vec2 offset) {
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
  }

  void main() {
    vUvs = aUvs;
    vec2 newPosition = deformationCurve(aVertexPosition, vUvs, vec2(uOffset));
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

const width = 400;
const height = width * 1.4;
const geom = new Geometry()
  .addAttribute(
    'aVertexPosition',
    [
      -width / 2,
      -height / 2,
      width / 2,
      -height / 2,
      width / 2,
      height / 2,
      -width / 2,
      height / 2
    ],
    2
  )
  .addAttribute('aUvs', [0, 0, 1, 0, 1, 1, 0, 1], 2);

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
    this.mask = new Graphics();

    // this.mesh = new Mesh(geom, )
  }

  componentWillReceiveProps(props) {
    const distance =
      props.y / 2 + (props.y / 2) * this.speed - this.sprite.current.y;

    TweenLite.killTweensOf(this.sprite.current);
    const tween = TweenLite.to(this.sprite.current, 1, {
      y: `+=${distance}`,
      ease: Power4.easeOut,
      onUpdate: () => {
        const offset = (this.sprite.current.y - props.y) * 0.1;
        this.mask.clear();
        this.mask.beginFill(0x000000);
        this.mask.drawRect(
          this.props.x,
          this.sprite.current.y,
          this.bounds.width,
          this.bounds.height * 0.9 + offset
        );
        this.mask.endFill();
      }
    });
  }

  componentWillUnmount() {
    TweenLite.killTweensOf(this.sprite.current);
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
        mask={this.mask}
        zIndex={this.props.zIndex}
        // filters={[this.shader]}
      />
    );
  }
}

export default Picture;
