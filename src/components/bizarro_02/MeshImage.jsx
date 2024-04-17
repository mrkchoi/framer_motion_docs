import React, { useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";

function MeshImage({ item, image, idx }) {
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
    if (meshRef.current) {
      meshRef.current.material.uniforms.uImageSize.value.set(
        image.naturalWidth,
        image.naturalHeight,
      );
      meshRef.current.material.uniforms.uDirection.value =
        idx % 2 === 0 ? 0.5 : -0.5;
    }
  }, [idx, image.naturalHeight, image.naturalWidth]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.viewport.x = e.clientX;
      mouseRef.current.viewport.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ clock }) => {
    const { width, height, top, left } = image.getBoundingClientRect();

    meshRef.current.position.x =
      left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
    meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
    meshRef.current.scale.x = width;
    meshRef.current.scale.y = height;

    meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;

    const itemBounds = item.getBoundingClientRect();
    const itemWidth = itemBounds.width;
    const itemHeight = itemBounds.height;
    const itemTop = itemBounds.top;
    const itemLeft = itemBounds.left;

    if (
      mouseRef.current.viewport.x > itemLeft &&
      mouseRef.current.viewport.x < itemLeft + itemWidth &&
      mouseRef.current.viewport.y > itemTop &&
      mouseRef.current.viewport.y < itemTop + itemHeight
    ) {
      gsap.to(meshRef.current.material.uniforms.uHover, {
        duration: 0.2,
        value: 1,
      });
      gsap.to(meshRef.current.material.uniforms.uProgress, {
        duration: 0.5,
        value: 1,
      });
    } else {
      gsap.to(meshRef.current.material.uniforms.uHover, {
        duration: 0.2,
        value: 0,
      });
      gsap.to(meshRef.current.material.uniforms.uProgress, {
        duration: 0.5,
        value: 0,
      });
    }
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: new THREE.TextureLoader().load(image.src) },
      uImageSize: {
        value: new THREE.Vector2(0, 0),
      },
      uTime: { value: 0 },
      uDirection: { value: 0 },
      uHover: { value: 0 },
      uProgress: { value: 0 },
      uMultiplier: { value: 1.25 },
      uSpeed: { value: 1.5 },
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
          side={THREE.DoubleSide}
          vertexShader={
            /* GLSL */
            `
            uniform float uTime;
            uniform float uDirection;
            uniform float uMultiplier;
            uniform float uSpeed;
            
            varying vec2 vUv;
            varying float vDisplacement;

            void main() {
              vUv = uv;

              vec3 p = position;
              float z = cos(uTime * 2.0 * uSpeed + p.x * mix(1.0, 3.0, uMultiplier));
              p.z += z * (position.x - uDirection) * 50.0;
              vDisplacement = p.z;
              p.z *= uMultiplier;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }`
          }
          fragmentShader={
            /* GLSL */
            `
            uniform sampler2D uTexture;
            uniform float uHover;
            uniform float uMultiplier;

            varying vec2 vUv;
            varying float vDisplacement;
            
            vec3 saturation(vec3 rgb, float adjustment) {
                const vec3 W = vec3(0.2125, 0.7154, 0.0721);
                vec3 intensity = vec3(dot(rgb, W));
                return mix(intensity, rgb, adjustment);
            }

            void main() {
              vec3 color = texture2D(uTexture, vUv).rgb;
              float value = 1.0;
              float strength = 0.0075;
              if (vDisplacement > 0.0) {
                color += vDisplacement * strength * mix(0.2, 0.7, uMultiplier);
                value = 1.0 + vDisplacement * strength * 2.0;
              }
              color = saturation(color, value);

              gl_FragColor = vec4(color.rgb, uHover);
            }
          `
          }
        />
      </mesh>
    </>
  );
}

export default MeshImage;
