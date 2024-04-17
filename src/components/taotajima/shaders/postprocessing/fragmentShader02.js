// RGB Shift Distortion

const fragmentShader02 =
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

  vec3 rgbShift(sampler2D imageTexture, vec2 uv, float circle, float velocity) {
    float r = texture2D(imageTexture, uv += circle * (velocity * 0.75)).r;
    float g = texture2D(imageTexture, uv += circle * (velocity * 0.8)).g;
    float b = texture2D(imageTexture, uv += circle * (velocity * 0.755)).b;
    return vec3(r, g, b);
  }

  void main() {
    vec2 uv = vUv;

    float c = circle(uv, uMouse, 0.0, 0.2);

    vec3 color = rgbShift(uTexture, uv, c, uVelo);
    gl_FragColor = vec4(color, 1.0);

    

    // gl_FragColor = vec4(r, g, b, 1.0);
    // gl_FragColor = texture2D(uTexture, warpedUV) + texture2D(uTexture, warpedUV) * vec4(vec3(c), 0.75);
  }
`;

export default fragmentShader02;
