import React, { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function MeshImage({ image }) {
  const meshRef = useRef(null);
  const mouseRef = useRef({
    viewport: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  });
  const scrollBarWidth = useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  // Mousemove - Global Viewport Cursor Coords
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.viewport.x = e.clientX;
      mouseRef.current.viewport.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Mousemove - Update Shader Params
  useEffect(() => {
    const onMouseMove = (e) => {
      const { width, height, top, left } = image.getBoundingClientRect();

      // Only update shader values on hovered
      if (
        mouseRef.current.viewport.x > left &&
        mouseRef.current.viewport.x < left + width &&
        mouseRef.current.viewport.y > top &&
        mouseRef.current.viewport.y < top + height
      ) {
        mouseRef.current.current.x = mouseRef.current.target.x =
          (e.clientX - left) / width;
        mouseRef.current.current.y = mouseRef.current.target.y =
          (e.clientY - top) / height;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [image]);

  useFrame(({ clock }) => {
    const { width, height, top, left } = image.getBoundingClientRect();
    if (meshRef.current) {
      // SYNC MESH POSITION + SCALE WITH DOM IMAGE
      meshRef.current.position.x =
        left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
      meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
      meshRef.current.scale.x = width;
      meshRef.current.scale.y = height;
      // UPDATE SHADER UNIFORM
      meshRef.current.material.uniforms.uMouse.value.set(
        (mouseRef.current.current.x * 2 - 1) / 2,
        (1.0 - mouseRef.current.current.y * 2 - 1) / 2 + 0.5,
      );
      // if cursor position is within the mesh position, set uHovered to 1 via gsap, otherwise, set uHovered to 0. This smoothly transitions hover effect
      if (
        mouseRef.current.viewport.x > left &&
        mouseRef.current.viewport.x < left + width &&
        mouseRef.current.viewport.y > top &&
        mouseRef.current.viewport.y < top + height
      ) {
        gsap.to(meshRef.current.material.uniforms.uHovered, {
          value: 1,
          duration: 2,
          ease: "expo.out",
        });
      } else {
        gsap.to(meshRef.current.material.uniforms.uHovered, {
          value: 0,
          duration: 2,
          ease: "expo.out",
        });
      }
    }
  });

  useEffect(() => {
    const { width, height } = image.getBoundingClientRect();

    if (meshRef.current) {
      meshRef.current.material.uniforms.uImageNaturalSize.value.set(
        image.naturalWidth,
        image.naturalHeight,
      );
      meshRef.current.material.uniforms.uImageRenderedSize.value.set(
        width,
        height,
      );
    }
  }, [image]);

  const uniforms = useMemo(() => {
    return {
      uTexture: {
        value: new THREE.TextureLoader().load(image.src),
      },
      uDepth: {
        value: new THREE.TextureLoader().load(
          image.getAttribute("data-depth-map"),
        ),
      },
      uImageNaturalSize: {
        value: new THREE.Vector2(0, 0),
      },
      uImageRenderedSize: {
        value: new THREE.Vector2(0, 0),
      },
      uMouse: {
        value: new THREE.Vector2(0.5, 0.5),
      },
      uHovered: {
        value: 0,
      },
      uIntensity: {
        value: image.getAttribute("data-intensity"),
      },
    };
  }, [image]);

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={
          /* VERTEX SHADER */
          /* glsl */ `
          uniform float uTime;

          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vNormal;

          void main() {
            vUv = uv;
            vPosition = position;
            vNormal = normal;

            vec3 newPosition = position;

            vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
            vec4 projectedPosition = projectionMatrix * modelViewPosition;

            gl_Position = projectedPosition;
          }
        `
        }
        fragmentShader={
          /* FRAGMENT SHADER */
          /* glsl */ `
          uniform vec2 uImageNaturalSize;
          uniform vec2 uImageRenderedSize;
          uniform vec2 uMouse;
          uniform sampler2D uTexture;
          uniform sampler2D uDepth;
          uniform float uHovered;
          uniform float uIntensity;
          
          varying vec2 vUv;

          

          // GAMMA CORRECTION (image texture)
          vec4 colorCorrection(vec4 color, float gamma) {
            return pow(color, vec4(1.0 / gamma));
          }

          // ASPECT RATIO CORRECTION (background-size: cover equivalent)
          vec2 getUV(vec2 uv, vec2 uTextureSize, vec2 uPlaneResolution){
            vec2 tempUV = uv - vec2(0.5);
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
            vec2 uv = getUV(vUv, uImageNaturalSize, uImageRenderedSize);
            vec4 depthColor = texture2D(uDepth, uv);
            vec2 uvOffset = vec2(uv.x + (depthColor.r - 0.5) * uMouse.x * uIntensity * uHovered, uv.y + (depthColor.r - 0.5) * uMouse.y * uIntensity * uHovered);
            vec4 textureColor = texture2D(uTexture, uvOffset);
            gl_FragColor = textureColor;
        }
        `
        }
      />
    </mesh>
  );
}

export default MeshImage;
