import React, { useMemo, useRef, useEffect, useState } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import gsap from "gsap";
import { useControls } from "leva";
// import { Perf } from "r3f-perf";

import disp01 from "./assets/images/disp1.jpg";

import vertexShader from "./shaders/vertexShader";
import fragmentShader01 from "./shaders/fragmentShader01";
import fragmentShader02 from "./shaders/fragmentShader02";
import fragmentShader03 from "./shaders/fragmentShader03";
import fragmentShader04 from "./shaders/fragmentShader04";
import fragmentShader05 from "./shaders/fragmentShader05";
import fragmentShader06 from "./shaders/fragmentShader06";
import fragmentShader07 from "./shaders/fragmentShader07";
import fragmentShader08 from "./shaders/fragmentShader08";
import fragmentShader09 from "./shaders/fragmentShader09";
import fragmentShader10 from "./shaders/fragmentShader10";

const FRAGMENT_SHADERS = [
  fragmentShader01,
  fragmentShader02,
  fragmentShader03,
  fragmentShader04,
  fragmentShader05,
  fragmentShader06,
  fragmentShader07,
  fragmentShader08,
  fragmentShader09,
  fragmentShader10,
];

function Scene({ textures, displacementTexture }) {
  const outputMesh = useRef(null);
  const currentIdx = useRef(0);
  const isRunning = useRef(false);
  const { effect } = useControls({
    effect: {
      options: {
        "01 Side Melt": 0,
        "02 Bubble Down": 1,
        "03 Bubble Center": 2,
        "04 Swipe Noise": 3,
        "05 Vertical Melt": 4,
        "06 Cross Fade": 5,
        "07 Vertical Blinds": 6,
        "08 Horizontal Blinds": 7,
        "09 Bubble Side": 8,
        "10 Bubble Angle*": 9,
      },
    },
  });

  useEffect(() => {
    const imgWrapper = document.querySelector(
      ".textureTransition01__imgWrapper",
    );
    const { width, height } = imgWrapper.getBoundingClientRect();
    const texture1 = textures[currentIdx.current];
    const texture2 = textures[(currentIdx.current + 1) % textures.length];

    if (outputMesh.current) {
      outputMesh.current.material.uniforms.uImageNaturalSize1.value.set(
        texture1.image.naturalWidth,
        texture1.image.naturalHeight,
      );
      outputMesh.current.material.uniforms.uImageNaturalSize2.value.set(
        texture2.image.naturalWidth,
        texture2.image.naturalHeight,
      );
      outputMesh.current.material.uniforms.uDisplacementNaturalSize.value.set(
        displacementTexture.image.naturalWidth,
        displacementTexture.image.naturalHeight,
      );

      outputMesh.current.material.uniforms.uImageRenderedSize.value.set(
        width,
        height,
      );
      outputMesh.current.material.uniforms.uTexture1.value = texture1;
      outputMesh.current.material.uniforms.uTexture2.value = texture2;

      outputMesh.current.scale.x = width;
      outputMesh.current.scale.y = height;
    }
  }, [
    displacementTexture.image.naturalHeight,
    displacementTexture.image.naturalWidth,
    textures,
  ]);

  useFrame((state, delta) => {
    const { clock } = state;
    outputMesh.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  useEffect(() => {
    const handleResize = () => {
      const imgWrapper = document.querySelector(
        ".textureTransition01__imgWrapper",
      );
      const { width, height } = imgWrapper.getBoundingClientRect();
      const texture1 = textures[currentIdx.current];
      const texture2 = textures[(currentIdx.current + 1) % textures.length];

      if (outputMesh.current) {
        outputMesh.current.material.uniforms.uImageNaturalSize1.value.set(
          texture1.image.naturalWidth,
          texture1.image.naturalHeight,
        );
        outputMesh.current.material.uniforms.uImageNaturalSize2.value.set(
          texture2.image.naturalWidth,
          texture2.image.naturalHeight,
        );
        outputMesh.current.material.uniforms.uImageRenderedSize.value.set(
          width,
          height,
        );

        outputMesh.current.scale.x = width;
        outputMesh.current.scale.y = height;
      }
    };

    const handleClick = (e) => {
      const classList = [...e.target.classList];
      const isLeva = classList.some((className) => className.includes("leva"));
      if (isLeva || isRunning.current) return;
      isRunning.current = true;
      const nextTexture = textures[(currentIdx.current + 1) % textures.length];
      outputMesh.current.material.uniforms.uTexture2.value = nextTexture;
      outputMesh.current.material.uniforms.uImageNaturalSize2.value.set(
        nextTexture.image.naturalWidth,
        nextTexture.image.naturalHeight,
      );

      gsap.to(outputMesh.current.material.uniforms.uProgress, {
        value: 1,
        duration: 1,
        onComplete: () => {
          outputMesh.current.material.uniforms.uTexture1.value = nextTexture;
          outputMesh.current.material.uniforms.uImageNaturalSize1.value.set(
            nextTexture.image.naturalWidth,
            nextTexture.image.naturalHeight,
          );
          outputMesh.current.material.uniforms.uProgress.value = 0;
          currentIdx.current = (currentIdx.current + 1) % textures.length;
          isRunning.current = false;
        },
      });
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTexture1: { value: null },
      uTexture2: { value: null },
      uDisplacement: { value: new THREE.TextureLoader().load(disp01) },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uImageNaturalSize1: { value: new THREE.Vector2(0, 0) },
      uImageNaturalSize2: { value: new THREE.Vector2(0, 0) },
      uDisplacementNaturalSize: { value: new THREE.Vector2(0, 0) },
      uImageRenderedSize: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  return (
    <>
      <mesh ref={outputMesh} visible={true}>
        <planeGeometry args={[1, 1, 2]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={FRAGMENT_SHADERS[effect]}
        />
      </mesh>
    </>
  );
}

export default Scene;
