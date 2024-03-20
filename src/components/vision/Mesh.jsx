import React, { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
// import WebGL from "three/examples/jsm/capabilities/WebGL";
import img01 from "./assets/images/image.jpg";

function Mesh() {
  const meshRef = useRef(null);
  const { uRadius } = useControls("Vision", {
    uRadius: {
      value: 0.5,
      min: 0.01,
      max: 1,
      step: 0.01,
    },
  });

  useEffect(() => {
    // console.log(meshRef.current);
    // console.log("WebGL.isWebGLAvailable(): ", WebGL.isWebGLAvailable());
  }, []);

  useFrame(() => {
    meshRef.current.material.uniforms.uTime.value += 0.01;
    meshRef.current.material.uniforms.uRadius.value = uRadius;
  });

  return (
    <mesh ref={meshRef} scale={[250, 250, 250]}>
      <planeGeometry args={[2, 2, 32]} />
      {/* <sphereGeometry args={[1, 32, 32]} /> */}
      <visionMaterial key={VisionMaterial.key} side={THREE.DoubleSide} />
    </mesh>
  );
}

const VisionMaterial = shaderMaterial(
  {
    uTime: 0,
    uRadius: 0.5,
    uTexture: new THREE.TextureLoader().load(img01),
  },
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

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;

    gl_Position = projectedPosition;
  }
`,
  /* FRAGMENT SHADER */
  /* glsl */ `
  uniform float uTime;
  uniform float uRadius;
  uniform sampler2D uTexture;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  // Signed distanced fields
  float drawCircle(vec2 position, vec2 center, float radius) {
    return step(radius, distance(position, center));
  }
 
  float sdBox( in vec2 p, in vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
  }

  //	Classic Perlin 3D Noise 
  //	by Stefan Gustavson
  //
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float noise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }  

  void main() {
    vec2 uv = vUv;

    // line
    // gl_FragColor = vec4(vec3(step(0.998, 1.0 - abs(vUv.y - 0.5))), 1); 
    
    // circle
    // gl_FragColor = vec4(vec3(step(uRadius, length(vUv - 0.5))), 1);
    
    // const vec2 center = vec2(0.5);
    // gl_FragColor = vec4(vec3(drawCircle(vUv, center, uRadius)), 1);
    
    // sdf box
    // gl_FragColor = vec4(vec3(step(0.9, 1.0 - sdBox(vUv - 0.5, vec2(0.15)))), 1);

    // texture
    const vec3 DESATURATE = vec3(0.2126, 0.7152, 0.0122);
    vec3 color = texture2D(uTexture, uv).xyz;
    float finalColor = dot(DESATURATE, color);
    gl_FragColor = vec4(vec3(finalColor), 1.0);
  }
`,
);

extend({ VisionMaterial });

export default Mesh;
