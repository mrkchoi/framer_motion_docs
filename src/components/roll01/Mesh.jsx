import React, { useEffect, useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { v4 as uuidv4 } from "uuid";

import img02 from "./assets/images/image02.jpg";
import img03 from "./assets/images/image03.jpg";

function Mesh() {
  const meshRef = useRef(null);
  const { progress, curlX, curlY, size } = useControls({
    progress: {
      value: 0.25,
      min: -1,
      max: 1,
      step: 0.01,
    },
    curlX: {
      value: 4.5,
      min: 0,
      max: 5,
      step: 0.01,
    },
    curlY: {
      value: 0.85,
      min: 0,
      max: 1,
      step: 0.01,
    },
    size: {
      value: 1.5,
      min: 0,
      max: 1.57,
      step: 0.01,
    },
  });

  useEffect(() => {
    // update uImageSize
    const image = new Image();
    image.src = img02;
    image.onload = () => {
      meshRef.current.material.uniforms.uImageSize.value.set(
        image.naturalWidth,
        image.naturalHeight,
      );
    };
  }, []);

  useFrame(() => {
    meshRef.current.material.uniforms.uTime.value += 0.01;
    meshRef.current.material.uniforms.uProgress.value = progress;
    meshRef.current.material.uniforms.uCurl.value = new THREE.Vector2(
      curlX,
      curlY,
    );
    meshRef.current.material.uniforms.uSize.value = size;
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: new THREE.TextureLoader().load(img02) },
      uTime: { value: 0 },
      uProgress: { value: 0.5 },
      uImageSize: { value: new THREE.Vector2(0, 0) },
      uCurl: { value: new THREE.Vector2(2.5, 0.45) },
      uSize: { value: 1.5 },
    }),
    [],
  );

  return (
    <mesh ref={meshRef} scale={[400, 400, 400]}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        key={uuidv4()}
        transparent={true}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        vertexShader={
          /* glsl */
          `
          #define PI 3.1415926535897932384626433832795

          uniform float uTime;
          uniform float uProgress;
          uniform vec2 uCurl;
          uniform float uSize;

          varying vec2 vUv;

          vec2 curlPlane(float originalX, float strength, float radius, float curvature, bool flip) {
            float startingY = flip ? strength * curvature : strength - strength * curvature;
            float size = strength > 0.0 ? 1.0 : -1.0;

            // threshold before going into the circle coords, because if r is 0, it
            // will return infinity, and causes a short flicker, so we prevent that
            // by setting a small non-noticeable threshold
            float threshold = 0.01;

            // start and endpoints of the plane before or after the curl
            float flatStartY = flip ? size * startingY : size * originalX;
            float flatEndY = flip ? size * originalX : size * startingY;
            
            // older gpus have troubles with "or operators" in the shader
            // so we split it in two conditions instead
            if (radius <= threshold) {
              return vec2(originalX, 0.0);
            }

            if (flatStartY <= flatEndY) {
              return vec2(originalX, 0.0);
            }

            float normalizedRadius = abs(strength) / radius;
            float halfPI = 1.5707963;

            // Transform the point on the plane to the point
            // on the new arc connected to the plane
            return vec2(
              startingY / normalizedRadius + cos(originalX / normalizedRadius - halfPI - startingY / normalizedRadius),
              -sin(originalX / normalizedRadius + halfPI - startingY / normalizedRadius) + 1.0
            ) * normalizedRadius;
          }       
                    
          void main() {
            vUv = uv;

            vec3 newPosition = position;
            float centerOffset = uSize * 0.5;
            // uProgress between -1 and 1 to determine curl direction
            bool flip = uProgress >= 0.0; 

            vec2 curledPosition = curlPlane(
              centerOffset + position.y,
              uSize,
              uCurl.x * abs(uProgress),
              uCurl.y,
              flip
            );

            newPosition.y = curledPosition.x - centerOffset;
            newPosition.z = curledPosition.y;
            

            vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
            vec4 projectedPosition = projectionMatrix * modelViewPosition;

            gl_Position = projectedPosition;
          }
        `
        }
        fragmentShader={
          /* glsl */ `
          uniform float uTime;
          uniform sampler2D uTexture;
          uniform vec2 uImageSize;
          
          varying vec2 vUv;

          // ASPECT RATIO CORRECTION (background-size: cover equivalent)
          vec2 bgCover(vec2 uv, vec2 uTextureSize, vec2 uPlaneResolution){
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
            vec2 uv = vUv;
            uv = bgCover(uv, uImageSize, vec2(400, 400));
            vec4 color = texture2D(uTexture, uv);
            gl_FragColor = color;
        }
        `
        }
      />
    </mesh>
  );
}

export default Mesh;
