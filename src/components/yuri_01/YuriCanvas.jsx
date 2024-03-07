import React, { useRef, useMemo, useEffect } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  useTexture,
} from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function YuriCanvas() {
  const texture01 = useLoader(
    TextureLoader,
    "./textures/yuri01/texture01.jpeg",
  );

  const imageAspect = useMemo(
    () => texture01.image.width / texture01.image.height,
    [texture01],
  );

  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 600]}
        fov={2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI)}
        near={100}
        far={1000}
      />
      <OrbitControls />
      <mesh>
        <planeGeometry args={[500, 500, 64, 64]} />
        <shaderMaterial
          uniforms={{
            uTime: { value: 0 },
            uTexture: { value: texture01 },
            uAspectRatio: { value: imageAspect },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `}
          fragmentShader={`          
            varying vec2 vUv;
            uniform sampler2D uTexture;
            uniform float uAspectRatio;
            
            void main() {
              vec2 gridSize = vec2(20.0, floor(20.0 / uAspectRatio));
              vec2 uv = floor(vUv * gridSize) / gridSize;
              vec4 texture = texture2D(uTexture, uv);
              gl_FragColor = texture;
            }
        `}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Canvas>
  );
}

export default YuriCanvas;
