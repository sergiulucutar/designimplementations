import * as CANNON from 'cannon';
import * as THREE from 'three';
import { Utils } from '../../utils';

const vertexShader = /* glsl */ `
float refractionRatio = 1.02;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);

  vec3 I = worldPos.xyz - cameraPosition;

  vReflect = reflect(I, worldNormal);
  vRefract[0] = refract(normalize(I), worldNormal, refractionRatio);
  vRefract[1] = refract(normalize(I), worldNormal, refractionRatio * 0.99);
  vRefract[2] = refract(normalize(I), worldNormal, refractionRatio * 0.98);
  vReflectionFactor = 0.1  + 2.0 * pow(1.0 + dot(normalize(I), worldNormal), 2.0);

  gl_Position = projectionMatrix * mvPos;
}
`;
const fragmentShader = /* glsl */ `
uniform samplerCube cube;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
  vec4 reflectedColor = textureCube(cube, vec3(-vReflect.x, vReflect.yz));
  vec4 refractedColor = vec4(1.0);

  refractedColor.r = textureCube( cube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
  refractedColor.g = textureCube( cube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
  refractedColor.b = textureCube( cube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;

  gl_FragColor = mix(refractedColor, reflectedColor, clamp(vReflectionFactor, 0.0, 1.0));
}
`;
export const shapeSize =
  (2 * (window.innerWidth + window.innerHeight)) /
  Math.min(window.innerHeight, window.innerWidth);
const sphereGeom = new THREE.BoxBufferGeometry(shapeSize, shapeSize, shapeSize);
const sphereMat = new THREE.MeshStandardMaterial({
  color: Utils.palette.purple,
  roughness: 0.5
});
export const defaultBallMass = 10;
const shape = new CANNON.Box(
  new CANNON.Vec3(shapeSize / 2, shapeSize / 2, shapeSize / 2)
);

class SphereProto {
  constructor() {
    this.mesh = new THREE.Mesh(sphereGeom);

    this.body = new CANNON.Body({
      mass: defaultBallMass,
      position: new CANNON.Vec3(0, 0, 0),
      shape
    });
    this.body.mass = 4 * shape.volume();
    this.body.angularDamping = 0;
  }

  update() {
    this.body.position.z = 0;

    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;
    this.mesh.quaternion.x = this.body.quaternion.x;
    this.mesh.quaternion.y = this.body.quaternion.y;
    this.mesh.quaternion.z = this.body.quaternion.z;
    this.mesh.quaternion.w = this.body.quaternion.w;
  }
}

export class Sphere extends SphereProto {
  constructor() {
    super();
    this.mesh.material = sphereMat;
  }
}

export class ReflectiveSphere extends SphereProto {
  constructor() {
    super();
    this.cubeCam = new THREE.CubeCamera(0.1, 80, 1024);
    this.cubeCam.lookAt(0, 0, 60);

    this.mesh.material = new THREE.ShaderMaterial({
      uniforms: {
        cube: {
          type: 't',
          value: this.cubeCam.renderTarget.texture
        }
      },
      fragmentShader,
      vertexShader
    });
  }

  update() {
    super.update();

    this.cubeCam.position.set(
      this.mesh.position.x,
      this.mesh.position.y,
      this.mesh.position.z
    );
  }
}
