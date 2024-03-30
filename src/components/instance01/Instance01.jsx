import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

function Instance01() {
  return (
    <div className="h-screen w-full">
      <Canvas
        shadows
        camera={{
          makeDefault: true,
          fov: 45,
          near: 0.1,
          far: 200,
          position: [40, 30, 40],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
}

export default Instance01;
