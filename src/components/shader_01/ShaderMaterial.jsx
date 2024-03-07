import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const CustomShaderMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  // Vertex Shader
  /* GLSL */ `
    varying vec2 vUv;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  /* GLSL */ `
    precision mediump float;

    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    }
  `,
);

// declaratively
extend({ CustomShaderMaterial });

export default CustomShaderMaterial;
