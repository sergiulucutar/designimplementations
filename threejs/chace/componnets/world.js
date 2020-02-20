import * as THREE from 'three';

// SUN
const vertexShader = `
uniform vec3 viewVector;
varying float intensity;

void main() {
  vec3 vNormal = normalize(normalMatrix * normal);
  vec3 vNormel = normalize(normalMatrix * viewVector);

  intensity = pow(0.6 - dot(vNormal, vNormel), 2.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform vec3 glowColor;
varying float intensity;

void main() {
  vec3 glow = glowColor * intensity;
  gl_FragColor = vec4(glow, 1.0);
}
`


export default class World {

  constructor(camera) {
    this.geom = new THREE.SphereGeometry(100, 50, 50);
    this.mat = new THREE.MeshPhongMaterial({
      color: 0x434343,
      transparent: true,
      opacity: 1,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;


  //   const glowMaterial = new THREE.ShaderMaterial({
  //     uniforms: {
  //       glowColor: { type: 'c', value: new THREE.Color(0x0CFFFF) },
  //       viewVector: { type: 'vec3', value: camera.position }
  //     },
  //     vertexShader,
  //     fragmentShader,
  //     side: THREE.BackSide,
  //     blending: THREE.AdditiveBlending,
  //     transparent: true
  //   });

  //   this.glowMesh = new THREE.Mesh(this.geom, glowMaterial);
  //   this.glowMesh.position.x = 0;
  //   this.glowMesh.position.y = 0;
  //   this.glowMesh.position.z = 0;
  //   this.glowMesh.scale.multiplyScalar(1.2);
  }
}
