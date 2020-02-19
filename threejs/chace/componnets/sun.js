import * as THREE from 'three';
import Utils from './utils';

export class Sky {
  constructor(canvas) {
    // const canvas = document.createElement('canvas');
    const starCount = 600;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'white';
    for (let i = 0; i < starCount; i++) {
      ctx.beginPath();
      ctx.arc(Utils.random(0, window.innerWidth), Utils.random(0, window.innerHeight), Math.random() * 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

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

export class Sun {
  constructor(camera) {
    const geom = new THREE.SphereGeometry(40, 50, 50);
    const mat = new THREE.MeshBasicMaterial({ color: 0x0CFFFF });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;

    this.mesh.position.x = 200;
    this.mesh.position.y = 250;
    this.mesh.position.z = -500;

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { type: 'c', value: new THREE.Color(0x0CFFFF) },
        viewVector: { type: 'vec3', value: camera.position }
      },
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    this.glowMesh = new THREE.Mesh(geom, glowMaterial);
    this.glowMesh.position.x = 200;
    this.glowMesh.position.y = 350;
    this.glowMesh.position.z = -500;
    this.glowMesh.scale.multiplyScalar(1.2);
  }
}
