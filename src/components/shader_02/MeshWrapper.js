import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useScreenSize from "./util/useScreenSize";

import CustomShaderMaterial from "./ShaderMaterial";

function MeshWrapper({ canvasRef }) {
  const meshRef = useRef(null);
  const screenSize = useScreenSize();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    if (canvasRef) {
      meshRef.current.material.uniforms.uResolution.value.x =
        canvasRef.clientWidth;
      meshRef.current.material.uniforms.uResolution.value.y =
        canvasRef.clientHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(window.innerWidth, window.innerHeight, 1);
    }
  }, [screenSize]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <customShaderMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

export default MeshWrapper;
