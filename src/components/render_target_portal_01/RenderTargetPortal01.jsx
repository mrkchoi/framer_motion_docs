import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBO, Sky, Environment } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import "./renderTargetPortal01.css";

import vertexShader from "./shaders/vertexShader.js";
import fragmentShader from "./shaders/fragmentShader.js";

function RenderTargetPortal01() {
  return (
    <div className="renderTargetPortal01__main">
      <div className="renderTargetPortal01__canvasWrapper">
        <Canvas
          camera={{
            position: [0, 0, 12],
          }}
          dpr={[1, 2]}
          flat={true}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            // autoRotate={true}
            // autoRotateSpeed={3}
          />
        </Canvas>
      </div>
    </div>
  );
}

function Scene() {
  const box = useRef(null);
  const knot = useRef(null);
  const cylinder1 = useRef(null);
  const cylinder2 = useRef(null);

  const renderTarget1 = useFBO();
  const renderTarget2 = useFBO();

  const uniforms = useMemo(() => {
    return {
      uTexture: { value: 0 },
      windowResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight,
        ).multiplyScalar(window.devicePixelRatio),
      },
    };
  }, []);

  useFrame(({ gl, scene, camera, clock }) => {
    box.current.visible = false;
    knot.current.visible = true;

    gl.setRenderTarget(renderTarget1);
    gl.render(scene, camera);

    cylinder1.current?.material.forEach((material) => {
      if (material.type === "ShaderMaterial") {
        material.uniforms.windowResolution.value = new THREE.Vector2(
          window.innerWidth,
          window.innerHeight,
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2));
      }
    });

    box.current.visible = true;
    knot.current.visible = false;

    gl.setRenderTarget(renderTarget2);
    gl.render(scene, camera);

    cylinder2.current?.material.forEach((material) => {
      if (material.type === "ShaderMaterial") {
        material.uniforms.windowResolution.value = new THREE.Vector2(
          window.innerWidth,
          window.innerHeight,
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2));
      }
    });

    box.current.rotation.x = Math.cos(clock.elapsedTime / 2);
    box.current.rotation.y = Math.sin(clock.elapsedTime / 2);
    box.current.rotation.z = Math.sin(clock.elapsedTime / 2);

    knot.current.rotation.x = Math.cos(clock.elapsedTime / 2);
    knot.current.rotation.y = Math.sin(clock.elapsedTime / 2);
    knot.current.rotation.z = Math.sin(clock.elapsedTime / 2);

    box.current.position.z = Math.sin(clock.elapsedTime) * 4;
    knot.current.position.z = Math.sin(clock.elapsedTime) * 4;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <Sky
        sunPosition={[10, 5, 0]}
        turbidity={50}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={1}
        inclination={0.25}
        azimuth={0.5}
      />
      <Environment preset="dawn" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 0]} intensity={1} />
      <mesh ref={cylinder1} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 4]}>
        <cylinderGeometry args={[3, 3, 8, 32]} />
        <shaderMaterial
          key={uuidv4()}
          attach="material-0"
          uniforms={{ ...uniforms, uTexture: { value: renderTarget1.texture } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />

        <shaderMaterial
          key={uuidv4()}
          attach="material-1"
          uniforms={{ ...uniforms, uTexture: { value: renderTarget1.texture } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
        <meshStandardMaterial
          attach="material-2"
          color="green"
          transparent
          opacity={0}
        />
      </mesh>
      <mesh
        ref={cylinder2}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -4]}
      >
        <cylinderGeometry args={[3, 3, 8, 32]} />
        <shaderMaterial
          key={uuidv4()}
          attach="material-0"
          uniforms={{ ...uniforms, uTexture: { value: renderTarget2.texture } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
        <meshStandardMaterial
          attach="material-1"
          color="green"
          transparent
          opacity={0}
        />
        <shaderMaterial
          key={uuidv4()}
          attach="material-2"
          uniforms={{ ...uniforms, uTexture: { value: renderTarget2.texture } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[3, 0.2, 64, 64]} />
        <meshStandardMaterial color="white" roughness={0.1} metalness={0.1} />
      </mesh>

      <mesh ref={box}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={1}
        />
      </mesh>
      <mesh ref={knot} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={0.1}>
        <torusKnotGeometry args={[10, 3, 160, 20, 2, 3]} />
        <meshPhysicalMaterial
          color="hotpink"
          roughness={0}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={1}
        />
      </mesh>
    </>
  );
}

export default RenderTargetPortal01;
