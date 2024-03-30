import { useRef, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  CuboidCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Experience() {
  const twisterRef = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion().setFromEuler(
      eulerRotation,
    );
    twisterRef.current?.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twisterRef.current?.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  const cubeCount = 1000;

  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < cubeCount; i++) {
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

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls enableDamping />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics gravity={[0, -9.81, 0]}>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            args={[null, null, cubeCount]}
            castShadow
            receiveShadow
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>

        {/* <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody
          ref={twisterRef}
          position={[0, -0.8, 0]}
          type="kinematicPosition"
          friction={0}
          onCollisionEnter={handleCollision}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody
          ref={cubeRef}
          colliders="cuboid"
          restitution={0}
          friction={0.7}
          gravityScale={1}
          mass={1}
        >
          <mesh
            castShadow
            position={[1, 4, 0]}
            onClick={handlePointerDown}
            scale={0.5}
          >
            <boxGeometry />
            <meshStandardMaterial color="skyblue" />
          </mesh>
        </RigidBody> */}
        {/* 
        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive
            object={hamburger.scene}
            position={[0, 0, 0]}
            scale={0.25}
          />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody> */}

        <RigidBody type="fixed" restitution={0} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 0.5, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 0.5, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 0.5, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 0.5, 0]} />
        </RigidBody>
      </Physics>
    </>
  );
}
