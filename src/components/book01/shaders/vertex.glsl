uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;

    // use noise to displace the vertices
  vec3 newPosition = position;

  vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vec4 projectedPosition = projectionMatrix * modelViewPosition;

  gl_Position = projectedPosition;
}