import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { mapRange } from "canvas-sketch-util/math";

function MeshImage({ item, image, targetScroll, currentScroll }) {
  const mouseRef = useRef({
    viewport: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  });
  const meshRef = useRef(null);

  const scrollBarWidth = useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.viewport.x = e.clientX;
      mouseRef.current.viewport.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uImageSize.value.set(
        image.naturalWidth,
        image.naturalHeight,
      );
    }
  }, [image.naturalHeight, image.naturalWidth]);

  useFrame((state) => {
    const { clock } = state;
    // console.log(state.raycaster);
    const { width, height, top, left } = image.getBoundingClientRect();

    meshRef.current.position.x =
      left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
    meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
    meshRef.current.scale.x = width;
    meshRef.current.scale.y = height;

    meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
    // update uStrength based on difference between targetScroll and currentScroll
    meshRef.current.material.uniforms.uStrength.value =
      targetScroll - currentScroll;

    // use raycaster and updated uHover if mouse is over image
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (mouseRef.current.viewport.x / window.innerWidth) * 2 - 1;
    mouse.y = -(mouseRef.current.viewport.y / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, state.camera);
    const intersects = raycaster.intersectObject(meshRef.current);
    if (intersects.length > 0) {
      gsap.to(meshRef.current.material.uniforms.uHover, {
        value: 1,
        duration: 0.75,
        ease: "expo.out",
      });
    } else {
      gsap.to(meshRef.current.material.uniforms.uHover, {
        value: 0,
        duration: 0.75,
        ease: "expo.out",
      });
    }
  });

  useEffect(() => {
    const handleResize = () => {
      meshRef.current.material.uniforms.uViewportSize.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: new THREE.TextureLoader().load(image.src) },
      uImageSize: {
        value: new THREE.Vector2(0, 0),
      },
      uViewportSize: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uTime: { value: 0 },
      uStrength: { value: 1 },
      uHover: { value: 0 },
    }),
    [image.src],
  );

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniforms}
          transparent={true}
          // side={THREE.DoubleSide}
          vertexShader={
            /* GLSL */
            `
            #define PI 3.1415926535897932385

            uniform float uTime;
            uniform vec2 uImageSize;
            uniform vec2 uViewportSize;
            uniform float uStrength;
            uniform float uHover;
            
            varying vec2 vUv;
            varying float vDisplacement;

            vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
              position.x = position.x + (sin(uv.y * PI) * offset.x);
              position.y = position.y + (sin(uv.x * PI) * offset.y);
              return position;
            }            

            void main() {
              vUv = uv;
              vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
              float distortion = sin(newPosition.x / uViewportSize.x * PI + PI / 2.0) * 1.0;
              
              newPosition.z += distortion * 200.0;
              // newPosition.z += distortion * abs(uStrength) * 100.0;
              // newPosition.z += distortion * abs(uHover) * 100.0;
              newPosition.z += sin(uTime * 2.0 + uv.x * PI * 2.0) * 25.0 * uHover;

              newPosition = vec4(deformationCurve(newPosition.xyz, uv, vec2(-uStrength * 0.05, 0.0)), 1.0);

              gl_Position = projectionMatrix * newPosition;
            }`
          }
          fragmentShader={
            /* GLSL */
            `
            uniform sampler2D uTexture;
            uniform float uHover;
            uniform float uStrength;

            varying vec2 vUv;

            void main() {
              vec2 uv = vUv;

              vec3 color = texture2D(uTexture, uv).rgb;
              gl_FragColor = vec4(color, 1.0);
            }
          `
          }
        />
      </mesh>
    </>
  );
}

export default MeshImage;
