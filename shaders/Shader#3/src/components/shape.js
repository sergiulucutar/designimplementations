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

float line(vec2 uv, float width) {
  // float u;
  // if(uv.x < 0.01) {
  //   u = 0.0;
  // } else if(uv.x > 1.0 - 0.01) {
  //   u = 0.0;
  // } else {
  //   u = aastep(width, uv.x) - aastep(1.0 - width, uv.x);  
  // }
  
  // return u;
  
  if (uv.x < 0.05 || uv.x > 1.0 - 0.05) {
    return 0.0;
  }

  return aastep(width, uv.x) - aastep(1.0 - width, uv.x);
}

void main() {
  float pos = (vUv.x + vUv.y) * 30.0;
  // float color = 1.0 -smoothstep(0.8, 0.85, 1.0 - fract(pos + u_time / 10.0));
  vec2 newuv = vec2(fract(pos), vUv.y);

  gl_FragColor = vec4(vec3(line(newuv, uWidth)), 1.0);
}
`;

const geom = new THREE.SphereGeometry(3, 32, 16);

export class Shape {
  constructor() {
    this.mat = new THREE.MeshBasicMaterial({
      color: 'tomato'
    });
    // this.mat = new THREE.ShaderMaterial({
    //   vertexShader,
    //   fragmentShader,
    //   uniforms: {
    //     uTime: {
    //       value: 0
    //     },
    //     uWidth: {
    //       value: 0.1
    //     }
    //   }
    // });
    this.mesh = new THREE.Mesh(geom, this.mat);
  }

  update(time) {
    // this.mat.uniforms.uTime.value = time;
  }
}

//SHADER #1

// const vertexShader = /* glsl */ `
// varying vec2 vUv;
// varying vec3 vPosition;

// void main() {
//   vUv = uv;
//   vPosition = position;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
// }
// `;

// const fragmentShader = /* glsl */ `
// varying vec2 vUv;
// varying vec3 vPosition;

// uniform mat4 modelMatrix;

// uniform float u_time;
// uniform vec3 u_color;
// uniform vec3 u_dotColor;
// uniform vec3 u_bgColor;
// uniform vec3 u_points[POINT_COUNT];

// float sphereRim (vec3 spherePosition) {
//   vec3 normal = normalize(spherePosition.xyz);
//   vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
//   vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
//   vec3 V = normalize(cameraPosition - worldPosition);
//   float rim = 1.0 - max(dot(V, worldNormal), 0.0);
//   return pow(smoothstep(0.0, 1.0, rim), 0.5);
// }

// void main() {
//   float dist = 1000.0;

//   for(int i=0; i < POINT_COUNT; i++) {
//     vec3 p = u_points[i];
//     float d = distance(vPosition, p);
//     dist = min(d, dist);
//   }

//   float mask = 1.0 - smoothstep(0.25, 0.26, dist);
//   vec3 fragColor = mix(u_color, u_dotColor, mask);

//   float rim = sphereRim(vPosition);
//   fragColor += (1.0 - rim) * u_bgColor * 0.25;

//   float stroke = smoothstep(0.9, 0.91, rim);
//   fragColor = mix(fragColor, u_bgColor, stroke);

//   gl_FragColor = vec4(fragColor, 1);
// }
// `;

// const geom = new THREE.SphereGeometry(2, 32, 16);
// const baseGeom = new THREE.IcosahedronGeometry(2, 1);
// // const circleGeom = new THREE.CircleGeometry(1, 32);
// export class Shape {
//   constructor() {
//     const points = baseGeom.vertices;
//     this.mesh = new THREE.Object3D();
//     this.mat = new THREE.ShaderMaterial({
//       // color: new THREE.Color('tomato')
//       vertexShader,
//       fragmentShader,
//       defines: {
//         POINT_COUNT: points.length
//       },
//       uniforms: {
//         u_time: {
//           type: 'f',
//           value: 0.0
//         },
//         u_color: {
//           type: 'vec3',
//           value:
//             Math.random() > 0.5
//               ? new THREE.Color('#28AFB0')
//               : new THREE.Color('#19647E')
//         },
//         u_dotColor: {
//           type: 'vec3',
//           value: new THREE.Color('#37392E')
//         },
//         u_bgColor: {
//           type: 'vec3',
//           value: new THREE.Color('#EEE5E5')
//         },
//         u_points: {
//           value: points
//         }
//       }
//     });
//     this.mesh.add(new THREE.Mesh(geom, this.mat));
//     this.mesh.scale.multiplyScalar(1 - Math.random());

//     // if (Math.random() > 0.5) {
//     //   const aux = this.mat.uniforms.u_dotColor.value;
//     //   this.mat.uniforms.u_dotColor.value = this.mat.uniforms.u_color.value;
//     //   this.mat.uniforms.u_color.value = aux;
//     // }

//     // points.forEach(point => {
//     //   const mesh = new THREE.Mesh(
//     //     circleGeom,
//     //     new THREE.MeshBasicMaterial({
//     //       color: 'black',
//     //       side: THREE.DoubleSide
//     //     })
//     //   );
//     //   mesh.position.copy(point);
//     //   mesh.lookAt(new THREE.Vector3());
//     //   mesh.scale.setScalar(0.2 * Math.random());
//     //   this.mesh.add(mesh);
//     // });
//   }

//   update(time) {
//     this.mat.uniforms.u_time.value = time;
//   }
// }
