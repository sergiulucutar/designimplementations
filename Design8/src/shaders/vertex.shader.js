export const vertexShader = /* GLSL */ `
  precision mediump float;

  attribute vec2 aVertexPosition;
  attribute vec2 aSize;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec2 vUvs;

  uniform vec2 uSize;

  void main() {
    vUvs = vec2(aVertexPosition.x / uSize.x, aVertexPosition.y / uSize.y);
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  }
`;
