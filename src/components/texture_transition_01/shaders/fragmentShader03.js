// Bubble Center

const fragmentShader03 =
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

  float radius = 0.9;
  float width = 0.35;

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

  float parabola( float x, float k ) {
    return pow( 4. * x * ( 1. - x ), k );
  }

  void main() {
    vec2 uv1 = vUv;
    vec2 uv2 = vUv;
    vec2 uvD = vUv;

    uv1 = getUV(uv1, uImageNaturalSize1, uImageRenderedSize);
    uv2 = getUV(uv2, uImageNaturalSize2, uImageRenderedSize);
    uvD = getUV(uvD, uDisplacementNaturalSize, uImageRenderedSize);

    vec2 p = uv1;
    vec2 start = vec2(0.5);
    float dt = parabola(uProgress, 1.0);
    vec4 noise = texture2D(uDisplacement, fract(uvD + uTime * 0.04));
    float prog = uProgress * 0.66 + noise.g * 0.04;
    float circ = 1.0 - smoothstep(-width, 0.0 , radius * distance(start, vUv) - prog * (1.0 + width));
    float intlp = pow(abs(circ), 1.0);

    vec4 texture1 = texture2D(uTexture1, (uv1 - 0.5) * (1.0 - intlp) + 0.5);
    vec4 texture2 = texture2D(uTexture2, (uv2 - 0.5) * intlp + 0.5);

    vec4 color = mix(texture1, texture2, intlp);
    gl_FragColor = color;
  }
`;

export default fragmentShader03;
