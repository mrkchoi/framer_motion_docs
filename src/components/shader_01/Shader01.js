import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import CustomShaderMaterial from "./ShaderMaterial";

import "./shader01.css";

function Shader01() {
  const meshRef = useRef(null);

  return (
    <div className="shader01__main">
      <Suspense fallback={null}>
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
          }}
          eventSource={document.body}
        >
          <OrbitControls enableDamping />
          <ambientLight />
          <mesh ref={meshRef}>
            <planeGeometry args={[4, 4, 64, 64]} />
            <customShaderMaterial side={THREE.DoubleSide} />
          </mesh>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default Shader01;
