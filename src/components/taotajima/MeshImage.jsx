import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { v4 as uuidv4 } from "uuid";

import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/image/fragmentShader";
import displacementImage from "./assets/images/disp1.jpg";

function MeshImage({ image }) {
  const mouseRef = useRef({
    viewport: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  });
  const meshRef = useRef(null);
  const videoSrc = image.getAttribute("data-video");
  const [video] = useState(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.crossOrigin = "anonymous";
    video.play();
    return video;
  });

  const videoTexture = useMemo(() => {
    return new THREE.VideoTexture(video);
  }, [video]);

  const imageTexture = useMemo(() => {
    return new THREE.TextureLoader().load(image.src);
  }, [image.src]);

  const displacementTexture = useMemo(() => {
    return new THREE.TextureLoader().load(displacementImage);
  }, []);

  const scrollBarWidth = useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

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

  const uniforms = useMemo(
    () => ({
      uTextureImage: { value: imageTexture },
      uTextureVideo: { value: videoTexture },
      uDisplacement: { value: displacementTexture },
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    [displacementTexture, imageTexture, videoTexture],
  );

  useFrame(({ clock }) => {
    const { width, height, top, left } = image.getBoundingClientRect();

    if (meshRef.current) {
      // Sync mesh with DOM image position/scale
      meshRef.current.position.x =
        left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
      meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
      meshRef.current.scale.x = width;
      meshRef.current.scale.y = height;

      meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;

      // if mouse is over image, update progress
      if (
        mouseRef.current.viewport.x > left &&
        mouseRef.current.viewport.x < left + width &&
        mouseRef.current.viewport.y > top &&
        mouseRef.current.viewport.y < top + height
      ) {
        gsap.to(meshRef.current.material.uniforms.uProgress, {
          duration: 0.75,
          value: 1,
          ease: "taotajima",
        });
      } else {
        gsap.to(meshRef.current.material.uniforms.uProgress, {
          duration: 0.75,
          value: 0,
          ease: "taotajima",
        });
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        key={uuidv4()}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default MeshImage;
