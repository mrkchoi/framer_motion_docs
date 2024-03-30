import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBO, Sky, Environment } from "@react-three/drei";
import * as THREE from "three";

import "./renderTarget01.css";

function RenderTarget01() {
  return (
    <div className="renderTarget01__main">
      <div className="renderTarget01__canvasWrapper">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000,
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

function Scene() {
  const meshRef = useRef(null);
  const renderTarget = useFBO();
  const secondRenderTarget = useFBO();

  useFrame(({ gl, scene, camera }) => {
    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);

    meshRef.current.material.map = renderTarget.texture;

    gl.setRenderTarget(secondRenderTarget);
    gl.render(scene, camera);

    meshRef.current.material.map = secondRenderTarget.texture;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <Sky sunPosition={[0, 10, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[2, 0, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0.5}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={1}
        />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0.5}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={1}
        />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0.5}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={1}
        />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0.5}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={1}
        />
      </mesh>

      <mesh ref={meshRef}>
        <planeGeometry args={[1.75, 1.75]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
      <Environment preset="city" />
    </>
  );
}

export default RenderTarget01;
