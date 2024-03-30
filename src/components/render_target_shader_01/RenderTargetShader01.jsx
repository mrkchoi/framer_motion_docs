import { Suspense, useEffect, useState, useRef, useMemo } from "react";
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
import { v4 as uuidv4 } from "uuid";

import "./renderTargetShader01.css";

function RenderTargetShader01() {
  return (
    <div className="renderTargetShader01__main">
      <div className="renderTargetShader01__canvasWrapper">
        <Canvas
          camera={{
            position: [0, 0, 3],
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
  const otherMeshRef = useRef(null);
  const otherCameraRef = useRef(null);
  const otherScene = new THREE.Scene();
  const renderTarget = useFBO();

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
    gl.setRenderTarget(renderTarget);
    gl.render(otherScene, otherCameraRef.current);

    meshRef.current.material.uniforms.uTexture.value = renderTarget.texture;
    meshRef.current.material.uniforms.windowResolution.value =
      new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
        window.devicePixelRatio,
      );

    otherMeshRef.current.rotation.x = clock.elapsedTime * 0.25;
    otherMeshRef.current.rotation.y = clock.elapsedTime * 0.25;
    otherMeshRef.current.rotation.z = clock.elapsedTime * 0.25;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <OrbitControls attach="orbitControls" />
      {createPortal(
        <>
          <PerspectiveCamera ref={otherCameraRef} position={[0, 0, 8]} />
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
      <mesh ref={meshRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniforms}
          vertexShader={
            /* glsl */
            `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `
          }
          fragmentShader={
            /* glsl */
            `
            uniform sampler2D uTexture;
            uniform vec2 windowResolution;
            varying vec2 vUv;

            vec4 fromLinear(vec4 linearRGB) {
              bvec3 cutoff = lessThan(linearRGB.rgb, vec3(0.0031308));
              vec3 higher = vec3(1.055)*pow(linearRGB.rgb, vec3(1.0/2.4)) - vec3(0.055);
              vec3 lower = linearRGB.rgb * vec3(12.92);

              return vec4(mix(higher, lower, cutoff), linearRGB.a);
            }

            void main() {
              vec2 uv = vUv;
              uv = gl_FragCoord.xy / windowResolution.xy;
              vec4 color = fromLinear(texture2D(uTexture, uv));
              gl_FragColor = color;
              // gl_FragColor = vec4(uv, 1.0, 1.0);
            }
          `
          }
        />
      </mesh>
    </>
  );
}

export default RenderTargetShader01;
