import React, { useEffect, useRef, useState } from "react";
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js";
import Particles from "./Particles";

function Scene() {
  return (
    <>
      <Particles />
      <Box />
    </>
  );
}

function Box() {
  return (
    <mesh position={[-2, 1, -1]}>
      {/* <boxGeometry args={[2, 2, 2]} /> */}
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default Scene;
