import React, { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import img01 from "./assets/images/image.jpg";
// import vertexShader from "./shaders/vertex.glsl";
// import fragmentShader from "./shaders/fragment.glsl";

function Mesh() {
  const meshRef = useRef(null);
  const { speed } = useControls("Vision", {
    speed: {
      value: 1,
      min: 0.01,
      max: 20,
      step: 0.01,
    },
  });

  useFrame(() => {
    meshRef.current.material.uniforms.uTime.value += 0.01;
    meshRef.current.material.uniforms.uSpeed.value = speed;
  });

  return (
    <mesh ref={meshRef} scale={[500, 500, 500]}>
      <planeGeometry args={[2, 2, 32]} />
      {/* <sphereGeometry args={[1, 32, 32]} /> */}
      {/* <torusKnotGeometry args={[1, 0.4, 100, 16]} /> */}
      <bookMaterial key={BookMaterial.key} side={THREE.DoubleSide} />
    </mesh>
  );
}

const BookMaterial = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 1,
    // uTexture: new THREE.TextureLoader().load(img01),
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

    // use noise to displace the vertices
    vec3 newPosition = position;


    vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;

    gl_Position = projectedPosition;
  }
`,
  /* FRAGMENT SHADER */
  /* glsl */ `
  #define PI 3.14159265359

  // uniform vec2 u_resolution;
  // uniform vec2 u_mouse;
  uniform float uTime;
  uniform float uSpeed;

  varying vec2 vUv;

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

  //  Function from Iñigo Quiles
  //  https://www.shadertoy.com/view/MsS3Wc
  vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                              6.0)-3.0)-1.0,
                      0.0,
                      1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
  }

  void main() {
    // vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = vUv;
    
    float time = uTime * 0.2 * uSpeed;
    
    vec3 color = vec3(0.0);
    vec2 toCenter = vec2(0.5) - uv;
    float angle = atan(toCenter.y, toCenter.x) + sin(time * 0.2) * 0.3;
    float radius = length(toCenter) * 2.0;
    
    color = hsb2rgb(vec3((angle / (PI * 2.0)) + 0.5, radius, 1.0));
    color = vec3(noise(color * 10.0 + time));    
    color = vec3(noise(sin(color * 4.0 + time)));    
    color.r = pow(color.g, 0.1);
    color.g = pow(color.b, 0.7);
    color.b = pow(color.g, 0.0);
    color.r *= 2.0;
    color.g *= 3.0;
    color.b *= 0.7;
    

    
    gl_FragColor = vec4(color, 1.0);
  }
`,
);

extend({ BookMaterial });

export default Mesh;
