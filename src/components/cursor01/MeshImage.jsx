import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

function MeshImage({
  image,
  idx,
  targetScroll,
  actualScroll,
  normalizedMouse,
  actualMouse,
}) {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    const { width, height, top, left } = image.getBoundingClientRect();
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
      // TODO: Account for width of scrollbar in width offset calculation
      // SYNC MESH POSITION + SCALE WITH DOM IMAGE
      meshRef.current.position.x =
        left - (window.innerWidth - 16) / 2 + width / 2;
      meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
      meshRef.current.scale.x = width;
      meshRef.current.scale.y = height;
      // UPDATE SHADER UNIFORM
      meshRef.current.material.uniforms.uOffset.value.set(
        0,
        -(targetScroll - actualScroll) * 0.0005,
      );

      meshRef.current.material.uniforms.uMouse.value.set(
        normalizedMouse.x,
        normalizedMouse.y,
      );

      // if cursor position is within the mesh position, set uHovered to 1 via gsap, otherwise, set uHovered to 0. This smoothly transitions hover effect
      if (
        actualMouse.x > left &&
        actualMouse.x < left + width &&
        actualMouse.y > top &&
        actualMouse.y < top + height
      ) {
        gsap.to(meshRef.current.material.uniforms.uHovered, {
          value: 1,
          duration: 1,
          ease: "expo.out",
        });
      } else {
        gsap.to(meshRef.current.material.uniforms.uHovered, {
          value: 0,
          duration: 1,
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
      uImageNaturalSize: {
        value: new THREE.Vector2(0, 0),
      },
      uImageRenderedSize: {
        value: new THREE.Vector2(0, 0),
      },
      uOffset: {
        value: new THREE.Vector2(0, 0),
      },
      uMouse: {
        value: new THREE.Vector2(0.5, 0.5),
      },
      uRadius: {
        value: 0.95,
      },
      uStrength: {
        value: 1.1,
      },
      uHovered: {
        value: 0,
      },
      uIntro: {
        value: 1,
      },
      uMouseIntro: {
        value: new THREE.Vector2(0.5, 0),
      },
      uTime: {
        value: 0,
      },
    };
  }, [image.src]);

  return (
    <mesh key={idx} ref={meshRef} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        // wireframe={true}
        uniforms={uniforms}
        vertexShader={`
          uniform vec2 uOffset;
          uniform vec2 uMouse;
          uniform float uHovered;
          uniform float uTime;

          varying vec2 vUv;

          float PI = 3.141592653589793238;

          vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
            position.x = position.x + (sin(uv.y * PI) * offset.x);
            position.y = position.y + (sin(uv.x * PI) * offset.y);
            return position;
          }

          void main() {
            vUv = uv;

            vec3 newPosition = position;
            newPosition = deformationCurve(newPosition, uv, uOffset);

            // on hover, uHovered is set to 1, on leave, uHovered is set to 0, when hovered, use uTime to animate subtle wave effect on uv
            newPosition.x += sin(uv.y * PI + uTime) * 0.01;
            newPosition.y += sin(uv.x * PI + uTime) * 0.01;

            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform vec2 uOffset;
          uniform vec2 uImageNaturalSize;
          uniform vec2 uImageRenderedSize;
          uniform vec2 uMouse;
          uniform float uRadius;
          uniform float uStrength;
          uniform float uHovered;
          uniform float uIntro;
          uniform vec2 uMouseIntro;

          varying vec2 vUv;

          // Preserve aspect ratio of texture
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

          vec2 bulge(vec2 uv, vec2 center) {
            uv -= center;
            float dist = length(uv) / uRadius; // distance from UVs
            float distPow = pow(dist, 4.0); // exponential
            float strengthAmount = uStrength / (1.0 + distPow); // strength
            uv *= (1.0 - uHovered) + uHovered * strengthAmount;; 
            uv += center;
            return uv;
          }

          void main() {
            vec2 mixMouse = mix(uMouseIntro, uMouse, uIntro);
            vec2 bulgeUV = bulge(vUv, mixMouse);
            vec2 uv = getUV(bulgeUV, uImageNaturalSize, uImageRenderedSize);
            vec3 color = texture2D(uTexture, uv).rgb;
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default MeshImage;
