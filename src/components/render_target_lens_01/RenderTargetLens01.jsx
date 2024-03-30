import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, createPortal } from "@react-three/fiber";
import {
  OrbitControls,
  useFBO,
  Sky,
  Environment,
  PerspectiveCamera,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { v4 as uuidv4 } from "uuid";

import "./renderTargetLens01.css";

function RenderTargetLens01() {
  return (
    <div className="renderTargetLens01__main">
      <div className="renderTargetLens01__canvasWrapper">
        <Canvas
          camera={{
            position: [0, 0, 5],
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
  const lens = useRef(null);
  const mesh1 = useRef(null);
  const mesh2 = useRef(null);
  const mesh3 = useRef(null);
  const mesh4 = useRef(null);
  // const otherCameraRef = useRef(null);
  // const otherScene = new THREE.Scene();
  const renderTarget = useFBO();

  useFrame(({ gl, scene, camera, clock, pointer, viewport }) => {
    const currentViewport = viewport.getCurrentViewport(camera, [0, 0, 2]);
    lens.current.position.x = THREE.MathUtils.lerp(
      lens.current.position.x,
      (pointer.x * currentViewport.width) / 2,
      0.1,
    );
    lens.current.position.y = THREE.MathUtils.lerp(
      lens.current.position.y,
      (pointer.y * currentViewport.height) / 2,
      0.1,
    );

    const prevMesh3Material = mesh3.current.material;
    const prevMesh4Material = mesh4.current.material;

    mesh3.current.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    mesh4.current.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    mesh3.current.material.wireframe = true;
    mesh4.current.material.wireframe = true;

    mesh1.current.visible = false;
    mesh2.current.visible = true;

    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);

    mesh3.current.material = prevMesh3Material;
    mesh4.current.material = prevMesh4Material;
    mesh3.current.material.wireframe = false;
    mesh4.current.material.wireframe = false;

    mesh1.current.visible = true;
    mesh2.current.visible = false;

    mesh1.current.rotation.x = clock.elapsedTime * 0.25;
    mesh1.current.rotation.y = clock.elapsedTime * 0.25;
    mesh1.current.rotation.z = clock.elapsedTime * 0.25;
    mesh2.current.rotation.x = clock.elapsedTime * 0.25;
    mesh2.current.rotation.y = clock.elapsedTime * 0.25;
    mesh2.current.rotation.z = clock.elapsedTime * 0.25;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <OrbitControls attach="orbitControls" />
      {/* <PerspectiveCamera ref={otherCameraRef} position={[0, 0, 8]} /> */}
      <Sky sunPosition={[10, 10, 0]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <mesh ref={mesh1}>
        <torusGeometry args={[1, 0.3, 64, 64]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <mesh ref={mesh2}>
        <dodecahedronGeometry args={[1.4, 0]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <mesh ref={mesh3} position={[-3, 2, -1]}>
        <icosahedronGeometry args={[1, 16]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <mesh ref={mesh4} position={[3, -2, 1]}>
        <icosahedronGeometry args={[1, 16]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <Environment preset="city" />
      <mesh ref={lens} position={[0, 0, 2.5]} scale={0.75}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          buffer={renderTarget.texture}
          ior={1.025}
          thickness={0.5}
          chromaticAberration={0.05}
          backside
        />
      </mesh>
    </>
  );
}

export default RenderTargetLens01;
