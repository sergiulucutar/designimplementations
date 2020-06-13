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

uniform mat4 modelMatrix;
uniform float hoverIndex;

float sphereRim (vec3 spherePosition) {
  vec3 normal = normalize(spherePosition.xyz);
  vec3 worldNormal = normalize(mat3(modelMatrix) * normal.xyz);
  vec3 worldPosition = (modelMatrix * vec4(spherePosition, 1.0)).xyz;
  vec3 V = normalize(cameraPosition - worldPosition);
  // float rim = 1.0 - max(dot(V, worldNormal), 0.0);
  return pow(1.0 - dot(V, worldNormal), 1.0 - (spherePosition.z / 2.0 + spherePosition.y / 2.0) * hoverIndex );
}


void main() {
  vec3 fragColor = vec3(1.0, 1.0, 1.0);
  float rim = sphereRim(vPosition);
  fragColor *= rim;

  gl_FragColor = vec4(mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), fragColor), 1.0);
}
`;

const geom = new THREE.SphereGeometry(2, 32, 16);

export class Shape {
  constructor() {
    this.mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        hoverIndex: {
          value: 1
        }
      }
    });
    this.mesh = new THREE.Mesh(geom, this.mat);
    // this.mesh.add();
    // this.mesh.scale.multiplyScalar(1.5 * Math.random());
    // this.mesh.castShadow = true;
  }

  update(cursor) {
    // this.mat.uniforms.u_time.value = time;
    // this.mesh.position.y += 0.01;
    // if (this.mesh.position.y > 10) {
    //   this.mesh.position.y *= -1;
    // }
    // this.mat.uniforms.
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
