const shader = /* GLSL*/ `
  uniform sampler2D uTexture;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 pos = position;
    vec4 color = texture2D(uTexture, vUv);
    pos.xy = color.xy;
    // pos.z += sin(uTime + position.x * 10.) * 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = 2.0 / -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export default shader;
