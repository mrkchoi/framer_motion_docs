import React, { useRef, useMemo } from "react";
import { Perf } from "r3f-perf";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import {
  Environment,
  Lightformer,
  OrbitControls,
  shaderMaterial,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

import "./lusion02.css";
import { EffectComposer, N8AO } from "@react-three/postprocessing";

// const CONNECTORS = [
//   { color: "white", roughness: 0.1 },
//   { color: "white", roughness: 0.1 },
//   { color: "white", roughness: 0.25 },
//   { color: "#ddd", roughness: 0.5 },
//   { color: "#ddd", roughness: 0.75 },
//   { color: "#444", roughness: 0.1 },
//   { color: "#444", roughness: 0.75 },
//   { color: "#111", roughness: 0.5 },
//   { color: "#111", roughness: 0.1 },
//   { color: "#4060ff", roughness: 0.25 },
//   { color: "#4060ff", roughness: 0.5 },
//   { color: "#4060ff", roughness: 0.1 },
//   { color: "#4060ff", roughness: 0.75 },
// ];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.1,
  envMapIntensity: 1,
});

function Lusion02() {
  return (
    <div className="lusion02__main">
      <div className="lusion02__canvasWrapper">
        <Canvas
          shadows
          camera={{
            makeDefault: true,
            fov: 20,
            near: 1,
            far: 75,
            position: [0, 0, 50],
          }}
        >
          {/* <Perf position="top-left" /> */}
          {/* <color attach="background" args={["#141622"]} /> */}
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <OrbitControls enableDamping />
          <Physics gravity={[2, 0, 0]}>
            <Objects />
            <Pointer />
          </Physics>
          <EffectComposer disableNormalPass>
            <N8AO
              luminanceThreshold={0.5}
              luminanceSmoothing={0.5}
              luminanceBlur={0.5}
              luminancePasses={4}
              resolution={256}
              intensity={5}
              aoRadius={10}
            />
          </EffectComposer>
          <Environment
            // preset="city"
            files="./assets/textures/environment/adamsbridge.hdr"
          >
            <Lightformer form="circle" intensity={10} />
          </Environment>
        </Canvas>
      </div>
    </div>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef(null);

  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0,
      ),
    );
  });

  return (
    <RigidBody
      ref={ref}
      position={[10, 10, 0]}
      colliders={false}
      type="kinematicPosition"
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function Objects({ vec = new THREE.Vector3() }) {
  const ref = useRef(null);
  const texture = useTexture("./assets/textures/cross.jpg");

  const sphereCount = 100;

  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < sphereCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotate: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // iterate through each instanced mesh and apply impulse
    for (let i = 0; i < sphereCount; i++) {
      ref.current[i]?.applyImpulse(
        vec.copy(ref.current[i].translation()).negate().multiplyScalar(0.5),
      );
    }
  });

  return (
    <InstancedRigidBodies
      ref={ref}
      instances={instances}
      colliders="ball"
      friction={0.1}
      angularDamping={0.9}
      linearDamping={4}
    >
      <instancedMesh
        castShadow
        receiveShadow
        args={[sphereGeometry, sphereMaterial, sphereCount]}
        material-map={texture}
      ></instancedMesh>
    </InstancedRigidBodies>
  );
}
export default Lusion02;
