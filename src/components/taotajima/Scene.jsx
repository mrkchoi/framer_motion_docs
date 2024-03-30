import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import MeshImage from "./MeshImage";
import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/postprocessing/fragmentShader";

function Scene({ images }) {
  const mouseRef = useRef({
    target: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    previous: { x: 0, y: 0 },
    targetSpeed: 0,
    speed: 0,
  });
  const outputMesh = useRef(null);
  const renderTarget = useFBO();
  const imageScene = new THREE.Scene();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.target.x = e.clientX / window.innerWidth;
      mouseRef.current.target.y = 1 - e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const { gl, camera } = state;

    outputMesh.current.scale.x = window.innerWidth;
    outputMesh.current.scale.y = window.innerHeight;

    gl.setRenderTarget(renderTarget);
    gl.render(imageScene, camera);

    getSpeed();

    outputMesh.current.material.uniforms.uTexture.value = renderTarget.texture;
    outputMesh.current.material.uniforms.uMouse.value = new THREE.Vector2(
      mouseRef.current.current.x,
      mouseRef.current.current.y,
    );
    outputMesh.current.material.uniforms.uVelo.value = Math.min(
      mouseRef.current.targetSpeed,
      0.05,
    );
    mouseRef.current.targetSpeed *= 0.999;

    gl.setRenderTarget(null);
  });

  const getSpeed = () => {
    const { current, previous, target, speed, targetSpeed } = mouseRef.current;

    mouseRef.current.speed = Math.sqrt(
      (previous.x - target.x) ** 2 + (previous.y - target.y) ** 2,
    );

    mouseRef.current.targetSpeed -= 0.1 * (targetSpeed - speed);
    mouseRef.current.current.x -= 0.1 * (current.x - target.x);
    mouseRef.current.current.y -= 0.1 * (current.y - target.y);

    mouseRef.current.previous.x = target.x;
    mouseRef.current.previous.y = target.y;
  };

  const uniforms = useMemo(
    () => ({
      uTexture: { value: null },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uVelo: { value: 0 },
    }),
    [],
  );

  return (
    <>
      {createPortal(
        <>
          {images.map((image, idx) => (
            <MeshImage key={idx} image={image} />
          ))}
        </>,
        imageScene,
      )}
      <mesh ref={outputMesh}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  );
}

export default Scene;
