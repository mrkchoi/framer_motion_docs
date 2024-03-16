import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Scene from "./Scene";

function Maxime01() {
  return (
    <div className="maxime01__main flex h-screen w-full items-center justify-center">
      <Canvas camera={{ position: [0, 0, 40] }}>
        <Perf />

        <OrbitControls
          enableDamping
          // minAzimuthAngle={-Math.PI / 4}
          // maxAzimuthAngle={Math.PI / 4}
          // minPolarAngle={Math.PI / 6}
          // maxPolarAngle={Math.PI - Math.PI / 6}
        />
        <ambientLight intensity={2} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          color="white"
          castShadow
        />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Maxime01;
