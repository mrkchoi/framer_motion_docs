import React, { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import img01 from "./assets/images/image.jpg";
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
    <mesh ref={meshRef} scale={[500, 500, 500]}>
      <planeGeometry args={[2, 2, 32]} />
      {/* <sphereGeometry args={[1, 32, 32]} /> */}
      {/* <torusKnotGeometry args={[1, 0.4, 100, 16]} /> */}
      <bookMaterial key={BookMaterial.key} side={THREE.DoubleSide} />
    </mesh>
  );
}

const BookMaterial = shaderMaterial(
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

  void main() {
    vec2 uv = vUv * 6.0;

    for (int n = 1; n < 8; n++) {
		float i = float(n);
        uv += vec2(0.7 / i * sin(i * uv.y + uTime * uSpeed + 0.3 * i) + 0.8, 0.4 / i * sin(uv.x + uTime * uSpeed + 0.3 * i));
    }
    
    vec3 color = vec3(0.5 * sin(uv.x) + 0.8, 0.5 * sin(uv.y) + 0.3, sin(uv.x + uv.y));

    gl_FragColor = vec4(color,1.0);
}
`,
);

extend({ BookMaterial });

export default Mesh;
