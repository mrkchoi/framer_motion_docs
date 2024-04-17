import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

function mapRange(num, min1, max1, min2, max2, round = false) {
  const num1 = (num - min1) / (max1 - min1);
  const num2 = num1 * (max2 - min2) + min2;

  if (round) return Math.round(num2);

  return num2;
}

function MeshImage({
  src,
  text,
  idx,
  count,
  scrollCurrent,
  scrollLast,
  direction,
}) {
  // console.log(scrollCurrent, scrollLast);
  const meshRef = useRef(null);
  const sizes = useRef({
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    plane: {
      width: 0,
      height: 0,
    },
  });
  const position = useRef({
    x: 0,
    padding: 0,
    width: 0,
    widthTotal: 0,
    extra: 0,
    isBefore: false,
    isAfter: false,
  });

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const { naturalWidth, naturalHeight } = image;
      meshRef.current.material.uniforms.uImageNaturalSize.value.set(
        naturalWidth,
        naturalHeight,
      );
    };

    sizes.current.plane.height = Math.min(
      window.innerWidth * 0.6,
      window.innerHeight * 0.6,
    );
    sizes.current.plane.width = (sizes.current.plane.height * 4) / 5;

    meshRef.current.material.uniforms.uPlaneSize.value = new THREE.Vector2(
      sizes.current.plane.width,
      sizes.current.plane.height,
    );
  }, [src]);

  useEffect(() => {
    const handleResize = () => {
      sizes.current.viewport.width = window.innerWidth;
      sizes.current.viewport.height = window.innerHeight;

      sizes.current.plane.height = Math.min(
        window.innerWidth * 0.6,
        window.innerHeight * 0.6,
      );
      sizes.current.plane.width = (sizes.current.plane.height * 4) / 5;

      meshRef.current.scale.x = sizes.current.plane.width;
      meshRef.current.scale.y = sizes.current.plane.height;

      position.current.padding = sizes.current.plane.width * 0.2;
      position.current.width =
        sizes.current.plane.width + position.current.padding;
      position.current.widthTotal = position.current.width * count;

      // reset extra position when resizing
      position.current.x = position.current.width * idx;
      position.current.extra = 0;
    };
    // position.current.x = position.current.width * idx;

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count, idx]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Update mesh scale
      meshRef.current.scale.x = sizes.current.plane.width;
      meshRef.current.scale.y = sizes.current.plane.height;

      // // Update mesh position
      meshRef.current.position.x =
        position.current.x - scrollCurrent - position.current.extra;
      meshRef.current.position.y =
        Math.cos(
          (meshRef.current.position.x / position.current.widthTotal) *
            Math.PI *
            2,
        ) *
          1000 -
        999;
      meshRef.current.rotation.z = mapRange(
        meshRef.current.position.x,
        -position.current.widthTotal,
        position.current.widthTotal,
        Math.PI,
        -Math.PI,
      );

      // Infinite scroll effect
      const planeOffset = sizes.current.plane.width / 2;
      const viewportOffset = sizes.current.viewport.width / 2;

      position.current.isBefore =
        meshRef.current.position.x + planeOffset < -viewportOffset;
      position.current.isAfter =
        meshRef.current.position.x - planeOffset > viewportOffset;

      if (direction === "right" && position.current.isAfter) {
        position.current.extra += position.current.widthTotal;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }

      if (direction === "left" && position.current.isBefore) {
        position.current.extra -= position.current.widthTotal;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }

      // Update mesh uniforms

      meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
      meshRef.current.material.uniforms.uSpeed.value =
        scrollCurrent - scrollLast;
      // console.log(scrollCurrent, scrollLast);
      // console.log();
    }
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: new THREE.TextureLoader().load(src) },
      uImageNaturalSize: { value: new THREE.Vector2(0, 0) },
      uPlaneSize: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uSpeed: { value: 1 },
    }),
    [src],
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        key={uuidv4()}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uSpeed;
          
          varying vec2 vUv;
          void main() {
            vUv = uv;

            vec3 p = position;
            p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.6 + uSpeed * 0.025) * 20.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform vec2 uImageNaturalSize;
          uniform vec2 uPlaneSize;
          
          varying vec2 vUv;

          void main() {
            vec2 ratio = vec2(
              min((uPlaneSize.x / uPlaneSize.y) / (uImageNaturalSize.x / uImageNaturalSize.y), 1.0),
              min((uPlaneSize.y / uPlaneSize.x) / (uImageNaturalSize.y / uImageNaturalSize.x), 1.0)
            );

            vec2 uv = vec2(
              vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
              vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
            );

            vec4 color = texture2D(uTexture, uv);
            gl_FragColor = color;
          }
        `}
      />
    </mesh>
  );
}

export default MeshImage;
