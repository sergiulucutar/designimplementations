/**
 * Used in shader #2
 */
import * as THREE from 'three';

const vertexShader = /* glsl */ `

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
}
`;

const fragmentShader = /* glsl */ `

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // vec3 pct = vec3(vUv.y);

  float st = step(0.1,mod(vPosition.x, 1.0));
  // float st = mod(50.0, vUv.x);
  // float st = mod(vUv.x, 2)

  vec3 color = mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), vUv.y);

  // vec4 color = mix(vec4(color, 1.0), vec4(0.0, 0.0, 0.0, 0.0), st);
  // color += fract(5.0);

  gl_FragColor = vec4(color, 1.0);

  if(st == 1.0) {
    discard;
  }
}
`;

const geom = new THREE.PlaneGeometry(100, 100);

export class Wall {
  constructor() {
    this.mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader
    });

    this.mesh = new THREE.Mesh(geom, this.mat);
  }
}
