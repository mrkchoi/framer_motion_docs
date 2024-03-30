// Side Swipe Melt (w/ noise distortion)

const fragmentShader01 =
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
  float intensity = 1.0;
  float angle1 = PI *0.25;
  float angle2 = -PI *0.75;

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

  mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec2 uv1 = vUv;
    vec2 uv2 = vUv;
    vec2 uvD = vUv;

    uv1 = getUV(uv1, uImageNaturalSize1, uImageRenderedSize);
    uv2 = getUV(uv2, uImageNaturalSize2, uImageRenderedSize);
    uvD = getUV(uvD, uDisplacementNaturalSize, uImageRenderedSize);

    vec4 disp = texture2D(uDisplacement, uvD);
    vec2 dispVec = vec2(disp.r, disp.g);

    vec2 distortedPosition1 = uv1 + getRotM(angle1) * dispVec * intensity * uProgress;
    vec2 distortedPosition2 = uv2 + getRotM(angle2) * dispVec * intensity * (1.0 - uProgress);

    vec4 texture1 = texture2D(uTexture1, distortedPosition1);
    vec4 texture2 = texture2D(uTexture2, distortedPosition2);

    vec4 color = mix(texture1, texture2, uProgress);
    gl_FragColor = color;
  }
`;

export default fragmentShader01;
