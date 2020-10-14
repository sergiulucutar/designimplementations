export const vertexShader = /* GLSL */ `
  precision mediump float;

  attribute vec2 aVertexPosition;
  // attribute vec2 uvs;
  attribute vec2 aSize;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec2 vUvs;

  uniform vec2 uOffset;
  uniform vec2 uSize;
  uniform float uTime;

  #define M_PI 3.14

  vec2 deformationCurve(vec2 position, vec2 uv, vec2 offset) {
    position.x = position.x + offset.x * sin(uv.y * M_PI) * sin(uTime * M_PI);
    position.y = position.y + offset.y * sin(uv.x * M_PI) * sin(uTime * M_PI);
    return position;
  }

  void main() {
    vUvs = vec2(aVertexPosition.x / uSize.x, aVertexPosition.y / uSize.y);
    vec2 newPosition = deformationCurve(aVertexPosition, vUvs, vec2(uOffset));
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(newPosition, 1.0)).xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* GLSL */ `
precision mediump float;

varying vec2 vUvs;

uniform sampler2D uTexture;
// uniform float uOffset;

vec3 rgbShift(sampler2D texture, vec2 uv, vec2 offset) {
  float r = texture2D(uTexture,uv + offset).r;
  vec2 gb = texture2D(uTexture,uv).gb;
  return vec3(r,gb);
}

void main() {

  vec2 scale = vec2(vUvs.x, vUvs.y * 0.8);

  // vec3 color = rgbShift(uTexture,scale, vec2(uOffset));
  // color.b = color.b + color.b * vUvs.x;
  gl_FragColor = texture2D(uTexture,scale);
}
`;
