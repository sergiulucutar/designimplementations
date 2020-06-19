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
#extension GL_OES_standard_derivatives : enable

varying vec3 vPosition;
varying vec2 vUv;

uniform mat4 modelMatrix;
uniform float uTime;
uniform float uWidth;

  
float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
    return step(threshold, value);
  #endif  
}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float line(vec2 uv, float width) {
  if (uv.x < 0.05 || uv.x > 1.0 - 0.05) {
    return 0.0;
  }

  return aastep(width, uv.x) - aastep(1.0 - width, uv.x);
}

void main() {
  // float color = 1.0 -smoothstep(0.8, 0.85, 1.0 - fract(pos + u_time / 10.0));
  vec2 newuv = vPosition.xy / 4.0;
  vec2 noise = vec2(cnoise(newuv + uTime / 100.0));
  newuv += noise;
  // float pos = (nUv.x + nUv.y) * 1.0;
  newuv = vec2(fract(newuv.x + noise.y));

  gl_FragColor = vec4(vec3(line(newuv, uWidth)), 1.0);
}
`;

const geom = new THREE.PlaneGeometry(100, 100);

export class Wall {
  constructor() {
    this.mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: {
          value: 0
        },
        uWidth: {
          value: 0.1
        }
      }
    });

    this.mesh = new THREE.Mesh(geom, this.mat);
  }

  update(time) {
    this.mat.uniforms.uTime.value = time;
  }
}
