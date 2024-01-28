import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import color from "./assets/color.jpg";
import normal from "./assets/normal.png";
import ao from "./assets/occlusion.jpg";

export default function Earth({ meshRef }) {
  const [colorMap, normalMap, aoMap] = useLoader(TextureLoader, [
    color,
    normal,
    ao,
  ]);

  return (
    <Canvas className="relative">
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[1, 0, -0.3]} />
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          aoMap={aoMap}
        />
      </mesh>
    </Canvas>
  );
}
