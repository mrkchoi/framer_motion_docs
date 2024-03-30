const fragmentShader =
  /* GLSL */
  `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uVelo;

  varying vec2 vUv;

  float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
    uv -= disc_center;
    float dist = sqrt(dot(uv, uv));
    return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
  }

  void main() {
    vec2 uv = vUv;

    float c = circle(vUv, uMouse, 0.05, 0.1 + uVelo * 2.0) * 40.0 * uVelo;
    vec2 offsetVector = normalize(uMouse - uv);
    vec2 warpedUV = mix(uv, uMouse, c * 0.99);

    gl_FragColor = texture2D(uTexture, warpedUV);
    // gl_FragColor = texture2D(uTexture, warpedUV) + texture2D(uTexture, warpedUV) * vec4(vec3(c), 0.75);
  }
`;

export default fragmentShader;
