import { useFrame, extend } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

function MeshImage({ image }) {
  const meshRef = useRef(null);
  // const { speed } = useControls("Vision", {
  //   speed: {
  //     value: 1,
  //     min: 0.01,
  //     max: 20,
  //     step: 0.01,
  //   },
  // });

  const imageTexture = useMemo(() => {
    return new THREE.TextureLoader().load(image.src);
  }, [image.src]);
  const scrollBarWidth = useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  useFrame(({ clock }) => {
    const { width, height, top, left } = image.getBoundingClientRect();
    const elapsedTime = clock.getElapsedTime();

    if (meshRef.current) {
      // Sync mesh with DOM image position/scale
      meshRef.current.position.x =
        left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
      meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
      meshRef.current.scale.x = width;
      meshRef.current.scale.y = height;

      // Update shader uniforms
      meshRef.current.material.uniforms.uTime.value = elapsedTime;
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

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 32]} />
      {/* <sphereGeometry args={[1, 32, 32]} /> */}
      {/* <torusKnotGeometry args={[1, 0.4, 100, 16]} /> */}
      <homunculus01Material
        key={Homunculus01Material.key}
        side={THREE.DoubleSide}
        uTexture={imageTexture}
      />
    </mesh>
  );
}

const Homunculus01Material = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 1,
    uTexture: null,
    uImageNaturalSize: new THREE.Vector2(0, 0),
    uImageRenderedSize: new THREE.Vector2(0, 0),
  },
  /* VERTEX SHADER */
  /* glsl */ `
  float PI = 3.141592653589793238;
  
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;


    vec3 newPosition = position;
    newPosition.z += sin(uv.x * PI + uTime * 1.5) * 12.0;
    newPosition.y += sin(uv.x * PI + uTime * 1.5) * 0.02;

    vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;

    gl_Position = projectedPosition;
  }
`,
  /* FRAGMENT SHADER */
  /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform sampler2D uTexture;
  uniform vec2 uImageNaturalSize;
  uniform vec2 uImageRenderedSize;
  
  varying vec2 vUv;

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

  float gamma = 2.2;
  // GAMMA CORRECTION (image texture)
  vec4 colorCorrection(vec4 color, float gamma) {
    return pow(color, vec4(1.0 / gamma));
  }

  void main() {
    vec2 uv = getUV(vUv, uImageNaturalSize, uImageRenderedSize);

    vec4 color = texture2D(uTexture, uv);

    // color = colorCorrection(color, gamma);

    gl_FragColor = color;
    // gl_FragColor = vec4(uv, 1.0, 1.0);
}
`,
);

extend({ Homunculus01Material });

export default MeshImage;
