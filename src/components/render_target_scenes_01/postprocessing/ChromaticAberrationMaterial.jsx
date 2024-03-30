import { shaderMaterial } from "@react-three/drei";

const ChromaticAberrationMaterial = shaderMaterial(
  {
    uTexture: null,
    uRedOffset: 10.0,
    uGreenOffset: 5.0,
    uBlueOffset: 3.0,
    uIntensity: 10.0,
  },
  /* GLSL */
  `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
  `,
  /* GLSL */
  `
    // Based on https://www.shadertoy.com/view/ltKBDd by battlebottle

    uniform sampler2D uTexture;
    uniform float uRedOffset;
    uniform float uGreenOffset;
    uniform float uBlueOffset;
    uniform float uIntensity;

    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;
        float rOffset = 0.001 * uRedOffset * uIntensity;
        float gOffset = 0.001 * uGreenOffset * uIntensity;
        float bOffset = 0.001 * uBlueOffset * uIntensity;

        float r = texture2D(uTexture, uv * (1.0 + rOffset) - (rOffset / 2.0)).r;
        float g = texture2D(uTexture, uv * (1.0 + gOffset) - (gOffset / 2.0)).g;
        float b = texture2D(uTexture, uv * (1.0 + bOffset) - (bOffset / 2.0)).b;

        gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
);

export default ChromaticAberrationMaterial;
