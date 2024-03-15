import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree, useLoader, extend } from "@react-three/fiber";
import {
  OrbitControls,
  shaderMaterial,
  useProgress,
  CubeCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Pixelation,
  Glitch,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const mouse = {
  x: 0,
  y: 0,
};

function Scene({ isLoaded, setIsLoaded }) {
  const materialRef = useRef(null);
  const meshRef = useRef(null);
  // const [meshRef, setMeshRef] = useState(null);

  // const [scrollRatio, setScrollRatio] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!meshRef.current) return;
    };

    const handleMouseMove = (e) => {
      if (!meshRef.current) return;
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value += 0.0025;
      meshRef.current.material.uniforms.uMouseX.value = mouse.x;
      meshRef.current.material.uniforms.uMouseY.value = mouse.y;
    }
  });

  return (
    <>
      <OrbitControls enableDamping />
      <mesh
        ref={meshRef}
        scale={[6, 6, 6]}
        // onAfterRender={() => {
        //   if (!isLoaded) setIsLoaded(true);
        // }}
      >
        {/* <planeGeometry args={[1, 1, 64, 64]} /> */}
        <sphereGeometry args={[2, 64, 64]} />
        <monopo2ShaderMaterial
          key={Monopo2ShaderMaterial.key}
          ref={materialRef}
          uMouseX={mouse.x}
          uMouseY={mouse.y}
          uResolution={new THREE.Vector4()}
          uTime={0}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

const Monopo2ShaderMaterial = shaderMaterial(
  {
    uMouseX: 0,
    uMouseY: 0,
    uTime: 0,
    uResolution: new THREE.Vector4(),
  },
  /* GLSL */
  `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  // uniform vec2 pixels;
  float PI = 3.141592653589793238;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  /* GLSL */
  `
  uniform float uTime;
  // uniform float progress;
  // uniform sampler2D texture1;
  uniform vec4 resolution;
  varying vec2 vUv;
  varying vec3 vPosition;
  float PI = 3.141592653589793238;

  // NOISE
  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);

      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);

      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);

      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));

      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

      return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  float lines(vec2 uv, float offset){
    return smoothstep(
      0., 0.5 + offset*0.5,
      0.5*abs((sin(uv.x*35.) + offset*2.))
    );
  }



  mat2 rotate2D(float angle){
    return mat2(
      cos(angle),-sin(angle),
      sin(angle),cos(angle)
    );
  }

  void main()	{

    vec3 baseFirst =  vec3(120./255., 158./255., 113./255.);
    vec3 accent =  vec3(0., 0., 0.);
    vec3 baseSecond =  vec3(224./255., 148./255., 66./255.);
    vec3 baseThird = vec3(232./255., 201./255., 73./255.);
    float n = noise(vPosition + uTime);
    // vec3 color1 = vec3(1.,0.,0.);
    // vec3 color2 = vec3(0.,1.,0.);
    // vec3 color3 = vec3(0.,0.,1.);

    vec2 baseUV = rotate2D(n)*vPosition.xy*0.1;
    float basePattern = lines(baseUV, 0.5);
    float secondPattern = lines(baseUV, 0.1);

    vec3 baseColor = mix(baseSecond,baseFirst,basePattern);
    vec3 secondBaseColor = mix(baseColor,accent,secondPattern);


    // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    gl_FragColor = vec4(vec3(secondBaseColor),1.);
  }  
  `,
);

extend({ Monopo2ShaderMaterial });

export default Scene;
