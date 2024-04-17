const shader = /* GLSL */ `
  uniform sampler2D uCurrentPosition;
  uniform sampler2D uOriginalPosition;
  uniform sampler2D uOriginalPosition2;
  uniform vec3 uMouse;
  uniform float uProgress;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // gl_FragColor = color;
    vec2 position = texture2D(uCurrentPosition, uv).xy;
    vec2 original = texture2D(uOriginalPosition, uv).xy;
    vec2 original2 = texture2D(uOriginalPosition2, uv).xy;

    vec2 final = mix(original, original2, uProgress);

    vec2 force = final - uMouse.xy;
    float len = length(force);
    float forceFactor = 1.0 / max(1.0, len * 50.0);

    vec2 positionToGo = final + normalize(force) * forceFactor * 0.5;

    position.xy += (positionToGo - position.xy) * 0.05;

    // position.x += 2.0;
    // position.xy += normalize(position.xy) * 0.001;

    gl_FragColor = vec4(position, 0.0, 1.0);
  }
`;

export default shader;
