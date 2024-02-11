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

function ZajnoCanvas() {
  // const camera = new PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000,
  // );

  // camera.position.z = 5;
  const sizeRef = useRef({ width: 0, height: 0 });
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const cameraRef = useRef(null);

  let aberrationIntensity = 0.0;

  const texture = useLoader(TextureLoader, "./textures/zajno/zajno.avif");

  const imageAspect = useMemo(
    () => texture.image.width / texture.image.height,
    [texture],
  );

  useEffect(() => {
    sizeRef.current.width = window.innerWidth;
    sizeRef.current.height = window.innerHeight;

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onResize = () => {
    sizeRef.current.width = window.innerWidth;
    sizeRef.current.height = window.innerHeight;
  };

  // console.log("test");

  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 600]}
        fov={2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI)}
        near={100}
        far={2000}
      />
      <OrbitControls enableDamping />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerEnter={() => console.log("hover")}
        onPointerLeave={() => console.log("unhover")}
        onPointerMove={(e) => {
          // console.log(e);
          // const { clientX, clientY } = e;
          // const x = clientX / sizeRef.current.width;
          // const y = clientY / sizeRef.current.height;
          const { x, y } = e.uv;

          materialRef.current.uniforms.uMouse.value = { x, y };
          materialRef.current.uniforms.uPrevMouse.value =
            materialRef.current.uniforms.uMouse.value;
          materialRef.current.uniforms.uAbberation.value = 1;

          // console.log("uMouse: ", materialRef.current.uniforms.uMouse.value);
          // console.log(
          //   "uPrevMouse: ",
          //   materialRef.current.uniforms.uPrevMouse.value,
          // );
          // console.log('uAbberation: ', materialRef.current.uniforms.uAbberation.value);
          // console.log('-----------');
        }}
        // scale={[imageAspect, 1]}
      >
        <planeGeometry
          attach="geometry"
          args={[window.innerWidth, window.innerWidth / imageAspect, 64, 64]}
        />

        <shaderMaterial
          ref={materialRef}
          side={THREE.DoubleSide}
          uniforms={{
            uMouse: { value: { x: 0.5, y: 0.5 } },
            uPrevMouse: { value: { x: 0.5, y: 0.5 } },
            uAbberation: { value: 0.0 },
            uTexture: { value: texture },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            precision mediump float;

            uniform sampler2D uTexture;
            uniform vec2 uMouse;
            uniform vec2 uPrevMouse;
            uniform float uAbberation;

            varying vec2 vUv;

            void main() {
              vec2 gridUv = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
              vec2 centerOfPixel = gridUv + vec2(1.0/20.0, 1.0/20.0);

              vec2 mouseDirection = uMouse - uPrevMouse;

              vec2 pixelToMouseDirection = centerOfPixel - uMouse;
              float pixelDistanceToMouse = length(pixelToMouseDirection);
              float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

              vec2 uvOffset = strength * -mouseDirection * 1.0;
              vec2 uv = vUv - uvOffset;

              vec4 colorR = texture2D(uTexture, uv + vec2(strength * uAbberation * 0.1, 0.0));
              vec4 colorG = texture2D(uTexture, uv);
              vec4 colorB = texture2D(uTexture, uv - vec2(strength * uAbberation * 0.1, 0.0));

              // vec4 textureColor = texture2D(uTexture, vUv);
              gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
            }
          `}
        />
      </mesh>
    </Canvas>
  );
}

export default ZajnoCanvas;
