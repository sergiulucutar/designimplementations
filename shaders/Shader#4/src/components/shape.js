import * as THREE from 'three';

// SHADER #2
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
varying vec3 vPosition;
varying vec2 vUv;

uniform mat4 modelMatrix;
uniform vec2 u_resolution;
uniform float uHovered;

float sphereRim (vec3 spherePosition) {
  vec3 normal = normalize(spherePosition.xyz);
  vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
  vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
  vec3 V = normalize(cameraPosition - worldPosition);
  // float rim = 1.0 - max(dot(V, worldNormal), 0.0);
  return pow(0.8 - dot(V, worldNormal), 1.0);
}


void main() {
  vec3 shaderPos = vPosition;
  shaderPos.y -= 5.0;
  float rim = sphereRim(shaderPos);

  // float offset = 1. -step(uHovered, vUv.x);

  vec3 color = mix(vec3(1.0, 1.0, 1.0), vec3(1.0, 0.5, 0.0), uHovered);

  gl_FragColor = vec4(mix(vec3(0.0, 0.0, 0.0), color, rim), 1.0);
}
`;

export const SHAPE_WIDTH = 1;
const geom = new THREE.BoxGeometry(SHAPE_WIDTH, 10, SHAPE_WIDTH);
export class Shape {
  constructor() {
    this.mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        hoverIndex: {
          value: 1
        },
        uHovered: {
          value: 0
        },
        resolution: {
          type: 'v4',
          value: new THREE.Vector4()
        }
      }
    });
    this.mesh = new THREE.Mesh(geom, this.mat);
  }

  hovered() {
    this.mat.uniforms.uHovered.value = 1;
  }
}
