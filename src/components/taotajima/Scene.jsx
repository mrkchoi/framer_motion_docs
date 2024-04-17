import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import MeshImage from "./MeshImage";
import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/postprocessing/fragmentShader";
// import fragmentShader from "./shaders/postprocessing/fragmentShader02";

function Scene({ images }) {
  const viewportDOM = document.querySelector(".taotajima__main");
  const mouseRef = useRef({
    target: { x: 0.5, y: 0.5 },
    current: { x: 0.5, y: 0.5 },
    previous: { x: 0.5, y: 0.5 },
    targetSpeed: 0,
    speed: 0,
  });
  const outputMesh = useRef(null);
  const renderTarget = useFBO();
  const imageScene = new THREE.Scene();

  const scrollBarWidth = useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

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

    const { width, height, top, left } = viewportDOM.getBoundingClientRect();

    outputMesh.current.position.x =
      left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
    outputMesh.current.position.y = -top + window.innerHeight / 2 - height / 2;
    outputMesh.current.scale.x = width;
    outputMesh.current.scale.y = height;

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
        <planeGeometry args={[1, 1, 1, 1]} />
        {/* <ScreenQuad ref={outputMesh}> */}
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
        {/* </ScreenQuad> */}
      </mesh>
    </>
  );
}

export default Scene;
