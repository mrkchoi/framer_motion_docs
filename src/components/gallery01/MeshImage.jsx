import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
// import { mapRange } from "gsap";
import { mapRange } from "canvas-sketch-util/math";

function MeshImage({ idx, image, offset, directionX, directionY }) {
  const meshRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const container = useRef({ width: 0, height: 0 });
  const extra = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);

  const scrollBarWidth = useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const { width, height, top, left } = image.getBoundingClientRect();

      meshRef.current.material.uniforms.uImageSize.value.set(
        image.naturalWidth,
        image.naturalHeight,
      );
      meshRef.current.material.uniforms.uPlaneSize.value.set(width, height);
      meshRef.current.position.x =
        left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
      meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
      meshRef.current.scale.x = width;
      meshRef.current.scale.y = height;
    }

    const gridContainer = document.querySelector(".gallery01__grid");
    const bounds = gridContainer.getBoundingClientRect();

    container.current.width = bounds.width;
    container.current.height = bounds.height;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const { width, height, top, left } = image.getBoundingClientRect();

      meshRef.current.position.x =
        left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
      meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
      meshRef.current.material.uniforms.uViewportSize.value.set(
        window.innerWidth,
        window.innerHeight,
      );

      const gridContainer = document.querySelector(".gallery01__grid");
      const bounds = gridContainer.getBoundingClientRect();

      container.current.width = bounds.width;
      container.current.height = bounds.height;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleWheel = (e) => {
      clearTimeout(timeoutRef.current);
      setIsMouseDown(true);

      timeoutRef.current = setTimeout(() => {
        setIsMouseDown(false);
      }, 100);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useFrame((state) => {
    const { width, height, top, left } = image.getBoundingClientRect();
    meshRef.current.scale.x = width;
    meshRef.current.scale.y = height;

    const xPos = meshRef.current.position.x;
    const yPos = meshRef.current.position.y;
    const multiplier = 1.5;

    if (directionX === "left") {
      if (xPos + width / 2 < (-window.innerWidth / 2) * multiplier) {
        extra.current.x += container.current.width;
      }
    } else if (directionX === "right") {
      if (xPos - width / 2 > (window.innerWidth / 2) * multiplier) {
        extra.current.x -= container.current.width;
      }
    }

    if (directionY === "up") {
      if (yPos - height / 2 > (window.innerHeight / 2) * multiplier) {
        extra.current.y -= container.current.height;
      }
    } else if (directionY === "down") {
      if (yPos + height / 2 < (-window.innerHeight / 2) * multiplier) {
        extra.current.y += container.current.height;
      }
    }

    if (extra.current.x > 0) {
      meshRef.current.position.x =
        meshRef.current.position.x -
        offset.x * 0.2 +
        extra.current.x +
        window.innerHeight * 0.25;
    } else if (extra.current.x < 0) {
      meshRef.current.position.x =
        meshRef.current.position.x -
        offset.x * 0.2 +
        extra.current.x -
        window.innerHeight * 0.25;
    } else {
      meshRef.current.position.x = meshRef.current.position.x - offset.x * 0.2;
    }

    if (extra.current.y > 0) {
      meshRef.current.position.y =
        meshRef.current.position.y +
        offset.y * 0.2 +
        extra.current.y +
        window.innerHeight * 0.25;
    } else if (extra.current.y < 0) {
      meshRef.current.position.y =
        meshRef.current.position.y +
        offset.y * 0.2 +
        extra.current.y -
        window.innerHeight * 0.25;
    } else {
      meshRef.current.position.y = meshRef.current.position.y + offset.y * 0.2;
    }

    extra.current.x = 0;
    extra.current.y = 0;

    meshRef.current.material.uniforms.uPlaneSize.value.set(width, height);
    meshRef.current.material.uniforms.uSpeed.value = new THREE.Vector2(
      offset.x,
      offset.y,
    );

    if (isMouseDown) {
      gsap.to(meshRef.current.material.uniforms.uMouseDown, {
        value: 1,
        duration: 1,
      });
    } else {
      gsap.to(meshRef.current.material.uniforms.uMouseDown, {
        value: 0,
        duration: 1,
      });
    }
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: new THREE.TextureLoader().load(image.src) },
      uImageSize: {
        value: new THREE.Vector2(0, 0),
      },
      uPlaneSize: {
        value: new THREE.Vector2(0, 0),
      },
      uViewportSize: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uMouseDown: {
        value: 0,
      },
      uSpeed: {
        value: new THREE.Vector2(0, 0),
      },
    }),
    [image.src],
  );

  return (
    <>
      <mesh ref={meshRef} frustumCulled={false}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniforms}
          transparent={true}
          // side={THREE.DoubleSide}
          vertexShader={
            /* GLSL */
            `
            #define PI 3.141592653589793238462643

            uniform vec2 uImageSize;
            uniform vec2 uViewportSize;
            uniform float uMouseDown;
            uniform vec2 uSpeed;
            
            varying vec2 vUv;         
            varying vec3 vWorldPos;

            void main() {
              vUv = uv;
              vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
              vWorldPos = newPosition.xyz;
              float dist = length(newPosition.xy);
              dist = pow(dist, 1.1);
              newPosition.xy += vec2(0.5, 0.5) * dist * 0.0005;
              newPosition.z -= dist * length(vec2(uMouseDown)) * 0.125;

              gl_Position = projectionMatrix * newPosition;
            }

            // void main() {
            //   vUv = uv;
            //   vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

            //   float maxLength = max(uViewportSize.x, uViewportSize.y);

            //   newPosition.z += (sin(newPosition.y / maxLength * PI + PI * 0.5) * 125.0) * uMouseDown;
            //   newPosition.z += (sin(newPosition.x / maxLength * PI + PI * 0.5) * 125.0) * uMouseDown;

            //   gl_Position = projectionMatrix * newPosition;
            // }
            `
          }
          fragmentShader={
            /* GLSL */
            `
            uniform sampler2D uTexture;
            uniform vec2 uImageSize;
            uniform vec2 uPlaneSize;
            uniform vec2 uViewportSize;

            varying vec2 vUv;
            varying vec3 vWorldPos;

            vec2 uUvScale = vec2(0.85, 0.85);

            // ASPECT RATIO CORRECTION (background-size: cover equivalent)
            vec2 bgCover(vec2 uv, vec2 uTextureSize, vec2 uPlaneResolution){
              vec2 tempUV = (uv - vec2(0.5)) * uUvScale;
              float planeAspect = uPlaneResolution.x / uPlaneResolution.y;
              float textureAspect = uTextureSize.x / uTextureSize.y;
              if (planeAspect < textureAspect) {
                tempUV = tempUV * vec2(planeAspect / textureAspect, 1.0);
              } else {
                tempUV = tempUV * vec2(1.0, textureAspect / planeAspect);
              }
              tempUV += vec2(0.5);
              return tempUV;
            }

            void main() {
              vec2 uv = vUv;
              uv = bgCover(uv, uImageSize, uPlaneSize);

              vec3 color = texture2D(uTexture, uv + vWorldPos.xy * 0.0001).rgb;
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
