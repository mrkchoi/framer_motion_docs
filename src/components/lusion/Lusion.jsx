import React, { useRef, useMemo } from "react";
import { Perf } from "r3f-perf";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

import "./lusion.css";
import { EffectComposer, N8AO } from "@react-three/postprocessing";

const CONNECTORS = [
  { color: "white", roughness: 0.1 },
  { color: "white", roughness: 0.1 },
  { color: "white", roughness: 0.25 },
  { color: "#ddd", roughness: 0.5 },
  { color: "#ddd", roughness: 0.75 },
  { color: "#444", roughness: 0.1 },
  { color: "#444", roughness: 0.75 },
  { color: "#111", roughness: 0.5 },
  { color: "#111", roughness: 0.1 },
  { color: "#4060ff", roughness: 0.25 },
  { color: "#4060ff", roughness: 0.5 },
  { color: "#4060ff", roughness: 0.1 },
  { color: "#4060ff", roughness: 0.75 },
];

function Lusion() {
  return (
    <div className="lusion__main">
      <div className="lusion__canvasWrapper">
        <Canvas
          shadows
          camera={{
            makeDefault: true,
            fov: 20,
            near: 1,
            far: 50,
            position: [0, 0, 30],
          }}
        >
          <Perf position="top-left" />
          <color attach="background" args={["#141622"]} />
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
          <Physics gravity={[0, 0, 0]}>
            {CONNECTORS.map((props, idx) => (
              <Connector key={idx} {...props} />
            ))}
            <Connector position={[7, 7, 15]}>
              <Model>
                <MeshTransmissionMaterial
                  clearcoat={1}
                  thickness={0.1}
                  chromaticAberration={0.25}
                  transmission={1}
                />
              </Model>
            </Connector>
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
          <Environment preset="city">
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
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

function Connector({
  color = "white",
  roughness = ".1",
  vec = new THREE.Vector3(),
  position,
  children,
}) {
  const ref = useRef(null);
  const pos = useMemo(() => {
    const randomPosFn = THREE.MathUtils.randFloatSpread;
    return position ?? [randomPosFn(10), randomPosFn(10), randomPosFn(10)];
  }, []);

  useFrame((state, delta) => {
    ref.current?.applyImpulse(
      vec.copy(ref.current.translation()).negate().multiplyScalar(0.25),
    );
  });

  return (
    <RigidBody
      ref={ref}
      position={pos}
      colliders={false}
      friction={0.1}
      angularDamping={0.9}
      linearDamping={4}
    >
      <CuboidCollider args={[1.28, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 1.28, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.28]} />
      {children ? children : <Model color={color} roughness={roughness} />}
      <pointLight color={color} intensity={4} distance={2} />
    </RigidBody>
  );
}

function Model({ color = "white", roughness = ".1", children }) {
  const {
    nodes: { connector },
    materials,
  } = useGLTF("./assets/models/connector.glb");

  return (
    <mesh geometry={connector.geometry} castShadow receiveShadow scale={10}>
      <meshStandardMaterial
        map={materials.base.map}
        metalness={0.2}
        roughness={roughness}
        color={color}
      />
      {children}
    </mesh>
  );
}

export default Lusion;
