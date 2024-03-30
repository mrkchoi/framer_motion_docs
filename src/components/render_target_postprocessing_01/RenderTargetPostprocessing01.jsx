import { Suspense, useRef, useMemo } from "react";
import { Canvas, createPortal, useFrame, extend } from "@react-three/fiber";
import {
  OrbitControls,
  useFBO,
  Sky,
  Environment,
  OrthographicCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import "./renderTargetPostprocessing01.css";

import ChromaticAberrationMaterial from "./postprocessing/ChromaticAberrationMaterial";
import GlitchMaterial from "./postprocessing/GlitchMaterial";

const getFullscreenTriangle = () => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3),
  );
  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2),
  );

  return geometry;
};

function RenderTargetPostprocessing01() {
  return (
    <div className="renderTargetPostprocessing01__main">
      <div className="renderTargetPostprocessing01__canvasWrapper">
        <Canvas
          camera={{
            position: [0, 0, 6],
          }}
          dpr={[1, 2]}
          flat={true}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={3}
          />
        </Canvas>
      </div>
    </div>
  );
}

extend({ ChromaticAberrationMaterial, GlitchMaterial });

function Scene() {
  const sphere1 = useRef(null);
  const sphere2 = useRef(null);

  const material1 = useRef(null);
  const material2 = useRef(null);

  const magicScene = new THREE.Scene();

  const renderTarget1 = useFBO();
  const renderTarget2 = useFBO();

  const screenMesh = useRef(null);

  useFrame(({ gl, scene, camera, clock }) => {
    gl.setRenderTarget(renderTarget1);
    gl.render(magicScene, camera);

    material1.current.uniforms.uTexture.value = renderTarget1.texture;
    screenMesh.current.material = material1.current;

    gl.setRenderTarget(renderTarget2);
    gl.render(screenMesh.current, camera);

    material2.current.uniforms.uTexture.value = renderTarget2.texture;
    material2.current.uniforms.uTime.value = clock.elapsedTime;

    screenMesh.current.material = material2.current;

    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
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
          <mesh ref={sphere1} position={[-2, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color="#73B9ED"
              roughness={0}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
          <mesh ref={sphere2} position={[2, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color="#73B9ED"
              roughness={0}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
        </>,
        magicScene,
      )}
      <OrthographicCamera args={[-1, 1, 1, -1, 0, 1]} />
      <chromaticAberrationMaterial ref={material1} />
      <glitchMaterial ref={material2} />
      <mesh
        ref={screenMesh}
        geometry={getFullscreenTriangle()}
        shape="box"
        frustumCulled={false}
      ></mesh>
    </>
  );
}

export default RenderTargetPostprocessing01;
