import React, { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
// import img01 from "./assets/images/image.jpg";
// import vertexShader from "./shaders/vertex.glsl";
// import fragmentShader from "./shaders/fragment.glsl";

function Mesh() {
  const meshRef = useRef(null);
  const { speed } = useControls("Vision", {
    speed: {
      value: 1,
      min: 0.01,
      max: 20,
      step: 0.01,
    },
  });

  useFrame(() => {
    meshRef.current.material.uniforms.uTime.value += 0.01;
    meshRef.current.material.uniforms.uSpeed.value = speed;
  });

  return (
    <mesh ref={meshRef} scale={[400, 400, 400]}>
      <planeGeometry args={[2, 2, 32]} />
      {/* <sphereGeometry args={[1, 32, 32]} /> */}
      {/* <torusKnotGeometry args={[1, 0.4, 100, 16]} /> */}
      <book03Material key={Book03Material.key} side={THREE.DoubleSide} />
    </mesh>
  );
}

const Book03Material = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 1,
    // uTexture: new THREE.TextureLoader().load(img01),
  },
  /* VERTEX SHADER */
  /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    vec3 newPosition = position;

    vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;

    gl_Position = projectedPosition;
  }
`,
  /* FRAGMENT SHADER */
  /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  
  varying vec2 vUv;

  float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
  }

  float PI = 3.14159265359;

  void main() {
    vec2 uv = vUv;
    uv = uv * 2.0 - 1.0;

    // uv += vec2(cos(uTime * 2.0), sin(uTime * 2.0)) * 0.70;

    // uv = rotate2d(sin(uTime) * PI) * uv;

    // uv += vec2(0.5);
    // uv = uv * 2.0 - 1.0;

    float strength = step(-0.05, uv.x) - step(0.05, uv.x);
    strength += step(-0.05, uv.y) - step(0.05, uv.y);

    strength *= step(-0.25, uv.x) - step(0.25, uv.x);
    strength *= step(-0.25, uv.y) - step(0.25, uv.y);
   

    vec3 color = vec3(strength);
    gl_FragColor = vec4(color, 1.0);
}
`,
);

extend({ Book03Material });

export default Mesh;
