import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Scene(props) {
  const meshRef = useRef(null);
  const gltf = useGLTF("./assets/models/RC2.glb");

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      rotation={[0, Math.PI * 1.25, 0]}
    />
  );
}

export default Scene;
