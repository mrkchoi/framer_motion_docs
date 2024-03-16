import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

function MeshImage({ image, idx, targetScroll, actualScroll }) {
  const meshRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // use DOM position and sizing of image to position and size mesh
    const handleImageResize = () => {
      const { width, height, top, left } = image.getBoundingClientRect();
      setSize({ width, height });
      setOffset({ x: left, y: top });
    };
    handleImageResize();

    window.addEventListener("resize", handleImageResize);
    window.addEventListener("scroll", handleImageResize);
    return () => {
      window.removeEventListener("resize", handleImageResize);
      window.removeEventListener("scroll", handleImageResize);
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // TODO: Account for width of scrollbar in width offset calculation
      meshRef.current.position.x =
        offset.x - (window.innerWidth - 16) / 2 + size.width / 2;
      meshRef.current.position.y =
        -offset.y + window.innerHeight / 2 - size.height / 2;
      meshRef.current.scale.x = size.width;
      meshRef.current.scale.y = size.height;

      // update the offset uniform in the shader based on scroll direction and velocity
      meshRef.current.material.uniforms.uOffset.value.set(
        0,
        -(targetScroll - actualScroll) * 0.0002,
      );
    }
  });

  const uniforms = useMemo(() => {
    return {
      uTexture: {
        value: new THREE.TextureLoader().load(image.src),
      },
      uOffset: {
        value: new THREE.Vector2(0, 0),
      },
    };
  }, [image.src]);

  return (
    <mesh
      key={idx}
      ref={meshRef}
      position={[idx * 200, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        // wireframe={true}
        uniforms={uniforms}
        vertexShader={`
          uniform vec2 uOffset;

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
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform vec2 uOffset;
          varying vec2 vUv;

          vec3 rgbShift(sampler2D imageTexture, vec2 uv, vec2 offset) {
            float r = texture2D(imageTexture, uv + offset).r;
            vec2 gb = texture2D(imageTexture, uv).gb;
            return vec3(r, gb);
          }

          void main() {
            vec3 color = rgbShift(uTexture, vUv, uOffset);
            gl_FragColor = vec4(color, 1.0);
            // gl_FragColor = vec4(vUv.x, 0, vUv.y, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default MeshImage;
