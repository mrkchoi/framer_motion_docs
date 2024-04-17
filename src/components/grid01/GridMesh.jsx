import React, { useEffect, useMemo, useRef } from "react";
import { createPortal, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial, useFBO } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import img01 from "./assets/images/image.jpg";
import { v4 as uuidv4 } from "uuid";
import gsap from "gsap";

function GridMesh() {
  const meshRef = useRef(null);
  const outputRef = useRef(null);

  // const renderTarget = useFBO();
  // const gridScene = new THREE.Scene();

  // useEffect(() => {
  //   const handleMouseDown = () => {
  //     gsap.to(outputRef.current.material.uniforms.uPointerDown, {
  //       value: 1,
  //       duration: 0.2,
  //     });
  //   };

  //   const handleMouseUp = () => {
  //     gsap.to(outputRef.current.material.uniforms.uPointerDown, {
  //       value: 0,
  //       duration: 0.2,
  //     });
  //   };

  //   window.addEventListener("mousedown", handleMouseDown);
  //   window.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     window.removeEventListener("mousedown", handleMouseDown);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, []);

  useFrame((state) => {
    // const { gl, camera } = state;
    meshRef.current.scale.x = window.innerWidth;
    meshRef.current.scale.y = window.innerHeight;

    // outputRef.current.scale.x = window.innerWidth;
    // outputRef.current.scale.y = window.innerHeight;

    // gl.setRenderTarget(renderTarget);
    // gl.render(gridScene, camera);

    // outputRef.current.material.uniforms.uTexture.value = renderTarget.texture;

    // gl.setRenderTarget(null);
  });

  const uniforms = useMemo(
    () => ({
      // uTime: { value: 0 },
      uSpeed: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  // const outputUniforms = useMemo(
  //   () => ({
  //     uProgress: { value: 0 },
  //     uTexture: { value: null },
  //     uPointerDown: { value: 0 },
  //   }),
  //   [],
  // );

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1, 128, 128]} />
        <shaderMaterial
          key={uuidv4()}
          side={THREE.DoubleSide}
          uniforms={uniforms}
          vertexShader={
            /* glsl */ `

          #define PI 3.1415926535897932384626433832795

          uniform vec2 uSpeed;
          varying vec2 vUv;
          varying vec3 vWorldPos;

          void main() {
            vUv = uv;
            vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
            viewPos.z += cos(viewPos.x / uv.x * PI) * 500.0;

            gl_Position = projectionMatrix * viewPos;
          }
        `
          }
          fragmentShader={
            /* FRAGMENT SHADER */
            /* glsl */ `
          uniform float uProgress;
          uniform sampler2D uTexture;
          
          varying vec2 vUv;

          float isGridLine (vec2 coord) {
            vec2 pixelsPerGrid = vec2(100.0, 100.0);
            vec2 gridCoords = fract(coord / pixelsPerGrid);
            vec2 gridPixelCoords = gridCoords * pixelsPerGrid;
            vec2 gridLine = step(gridPixelCoords, vec2(1.0));
            float isGridLine = max(gridLine.x, gridLine.y);
            return isGridLine;
          }

          void main() {
            vec2 uv = vUv;
            vec2 coord = gl_FragCoord.xy;

            vec3 color = vec3(0.0);
            color.b = isGridLine(coord) * 0.9;
            
            gl_FragColor = vec4(color, 1.0);
        }
        `
          }
        />
      </mesh>
    </>
  );
}

export default GridMesh;
