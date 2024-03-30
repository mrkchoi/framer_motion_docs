// Vertical Blinds

const fragmentShader07 =
  /* glsl */
  `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uDisplacement;
  uniform vec2 uImageNaturalSize1;
  uniform vec2 uImageNaturalSize2;
  uniform vec2 uDisplacementNaturalSize;
  uniform vec2 uImageRenderedSize;
  uniform float uProgress;
  uniform float uTime;

  varying vec2 vUv;

  const float PI = 3.141592653589793;
  float intensity = 50.0;

  // Preserve aspect ratio of texture
  vec2 getUV(vec2 uv, vec2 uTextureSize, vec2 uPlaneResolution){
    vec2 tempUV = uv - vec2(0.5);

    float planeAspect = uPlaneResolution.x / uPlaneResolution.y;
    float textureAspect = uTextureSize.x / uTextureSize.y;
    if (planeAspect < textureAspect) {
      tempUV = tempUV * vec2(planeAspect / textureAspect, 1.0);
    } else {
      tempUV = tempUV * vec2(1.0, textureAspect / planeAspect);
    }

    tempUV += vec2(0.5);
    return tempUV;
  }

  mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec2 uv1 = vUv;
    vec2 uv2 = vUv;

    uv1 = getUV(uv1, uImageNaturalSize1, uImageRenderedSize);
    uv2 = getUV(uv2, uImageNaturalSize2, uImageRenderedSize);

    vec2 uvDivided = fract(uv1 * vec2(intensity, 1.0));

    vec2 uvDisplaced1 = uv1 + rotate(PI * 0.25) * uvDivided * uProgress * 0.1;
    vec2 uvDisplaced2 = uv2 + rotate(PI * 0.25) * uvDivided * (1.0 - uProgress) * 0.1;

    vec4 texture1 = texture2D(uTexture1, uvDisplaced1);
    vec4 texture2 = texture2D(uTexture2, uvDisplaced2);

    vec4 color = mix(texture1, texture2, uProgress);
    gl_FragColor = color;
  }
`;

export default fragmentShader07;
