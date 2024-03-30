import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, createPortal } from "@react-three/fiber";
import {
  OrbitControls,
  useFBO,
  Sky,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { Leva, useControls } from "leva";

import "./renderTarget02.css";

function RenderTarget02() {
  return (
    <div className="renderTarget02__main">
      <div className="renderTarget02__canvasWrapper">
        <Canvas
          camera={{
            position: [0, 0, 8],
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
  const { useBox } = useControls({
    useBox: true,
  });
  const meshRef = useRef(null);
  const otherMeshRef = useRef(null);
  const otherCameraRef = useRef(null);
  const otherScene = new THREE.Scene();
  const renderTarget = useFBO();

  useFrame(({ gl, scene, camera, clock }) => {
    otherCameraRef.current.matrixWorldInverse.copy(camera.matrixWorldInverse);

    gl.setRenderTarget(renderTarget);
    gl.render(otherScene, otherCameraRef.current);

    meshRef.current.material.map = renderTarget.texture;

    otherMeshRef.current.rotation.x = clock.elapsedTime * 0.25;
    otherMeshRef.current.rotation.y = clock.elapsedTime * 0.25;
    otherMeshRef.current.rotation.z = clock.elapsedTime * 0.25;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <OrbitControls attach="orbitControls" autoRotate autoRotateSpeed={3} />

      <PerspectiveCamera ref={otherCameraRef} manual aspect={1 / 1} />
      {createPortal(
        <>
          <Sky sunPosition={[0, 10, 10]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <mesh ref={otherMeshRef}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="hotpink"
              roughness={0.5}
              metalness={0.5}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
          <mesh position={[-3, 2, -1]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="hotpink"
              roughness={0.5}
              metalness={0.5}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
          <mesh position={[3, -2, 1]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="hotpink"
              roughness={0.5}
              metalness={0.5}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
          <Environment preset="city" />
        </>,
        otherScene,
      )}

      {useBox ? (
        <mesh ref={meshRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[4, 4, 4]} />
          <meshBasicMaterial />
        </mesh>
      ) : (
        <mesh ref={meshRef}>
          <planeGeometry args={[4, 4]} />
          <meshBasicMaterial side={THREE.DoubleSide} />
        </mesh>
      )}
    </>
  );
}

export default RenderTarget02;
