import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree, useLoader, extend } from "@react-three/fiber";
import { OrbitControls, shaderMaterial, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const mouse = {
  x: 0,
  y: 0,
};

function Scene({ isLoaded, setIsLoaded }) {
  const materialRef = useRef(null);
  const meshRef = useRef(null);
  // const [meshRef, setMeshRef] = useState(null);

  const [scrollRatio, setScrollRatio] = useState(0);
  // const { active, progress, errors, item, loaded, total } = useProgress();

  // console.log("progress: ", progress);
  // console.log("loaded: ", loaded);

  const settings = {
    uFrequency: {
      start: 0,
      end: 8,
    },
    uAmplitude: {
      start: 0,
      end: 2,
    },
    uDensity: {
      start: 0,
      end: 3,
    },
    uStrength: {
      start: 0,
      end: 1,
    },
    // fragment
    uDeepPurple: {
      start: 0.7,
      end: 0.4,
    },
    uOpacity: {
      start: 0.1,
      end: 0.66,
    },
    // rotationX: {
    //   start: 4.6,
    //   end: 4.6,
    // },
    // rotationY: {
    //   start: 0,
    //   max: 2 * Math.PI,
    // },
  };

  // const {
  //   uFrequency,
  //   uAmplitude,
  //   uDensity,
  //   uStrength,
  //   uDeepPurple,
  //   uOpacity,
  //   rotationX,
  //   rotationY,
  // } = useControls({
  //   uFrequency: {
  //     value: 8,
  //     min: 0,
  //     max: 8,
  //     step: 0.1,
  //   },
  //   uAmplitude: {
  //     value: 2,
  //     min: 1,
  //     max: 2,
  //     step: 0.1,
  //   },
  //   uDensity: {
  //     value: 1.2,
  //     min: 0,
  //     max: 1.2,
  //     step: 0.1,
  //   },
  //   uStrength: {
  //     value: 1,
  //     min: 0,
  //     max: 1,
  //     step: 0.1,
  //   },
  //   // fragment
  //   uDeepPurple: {
  //     value: 0.7,
  //     min: 0.4,
  //     max: 0.7,
  //     step: 0.01,
  //   },
  //   uOpacity: {
  //     value: 1,
  //     min: 0.1,
  //     max: 1,
  //     step: 0.01,
  //   },
  //   rotationX: {
  //     value: 4.6,
  //     min: 0,
  //     max: 2 * Math.PI,
  //     step: 0.01,
  //   },
  //   rotationY: {
  //     value: 5.1,
  //     min: 0,
  //     max: 2 * Math.PI,
  //     step: 0.01,
  //   },
  // });

  // const { camera } = useThree();

  useEffect(() => {
    const handleScroll = (e) => {
      if (!meshRef.current) return;
      const { scrollHeight, clientHeight } = e.target.documentElement;
      const scrollY = window.scrollY;
      const scrollRatio = scrollY / (scrollHeight - clientHeight);
      setScrollRatio(scrollRatio);

      for (const key in settings) {
        if (settings[key].start !== settings[key].end) {
          gsap.to(meshRef.current.material.uniforms[key], {
            value:
              settings[key].start +
              scrollRatio * (settings[key].end - settings[key].start),
            duration: 3,
          });
        }
      }
    };

    const handleMouseMove = (e) => {
      if (!meshRef.current) return;
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;

      // use gsap to change mesh rotation based on mouse position

      // console.log(x, y);
      // gsap.to(meshRef.current.rotation, {
      //   x: -y * 100,
      //   y: x * 100,
      //   duration: 1,
      // });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // useGSAP(() => {
  //   if (meshRef) {
  //     gsap.to(meshRef.scale, {
  //       x: 1 + scrollRatio * 0.2,
  //       y: 1 + scrollRatio * 0.2,
  //       z: 1 + scrollRatio * 0.2,
  //       duration: 1,
  //     });
  //   }
  // });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // material.current.uniforms.uTime.value = elapsedTime;
    // if (materialRef.current) {
    // materialRef.current.uniforms.uFrequency.value = 1;
    // materialRef.current.uniforms.uAmplitude.value = 1;
    // materialRef.current.uniforms.uDensity.value = 1;
    // materialRef.current.uniforms.uStrength.value = 1;
    // materialRef.current.uniforms.uDeepPurple.value = 1;
    // materialRef.current.uniforms.uOpacity.value = 1;
    // // }
    // materialRef.current.uniforms.uTime.value = elapsedTime;
    // console.log(materialRef.current);
    if (meshRef.current) {
      // console.log(meshRef);
      // meshRef.material.uniforms.uTime.value = elapsedTime;
      // meshRef.material.uniforms.uFrequency.value = uFrequency;
      // meshRef.material.uniforms.uAmplitude.value = uAmplitude;
      // meshRef.material.uniforms.uDensity.value = uDensity;
      // meshRef.material.uniforms.uStrength.value = uStrength;
      // meshRef.material.uniforms.uDeepPurple.value = uDeepPurple;
      // meshRef.material.uniforms.uOpacity.value = uOpacity;
      // meshRef.current.rotation.x = 3;
      meshRef.current.rotation.x = scrollRatio;
      meshRef.current.rotation.y = elapsedTime * 0.05 + scrollRatio * 2;
    }

    // camera.position.lerp(
    //   {
    //     x: -mouse.x * 2,
    //     y: -mouse.y * 2,
    //     z: 5,
    //   },
    //   0.05,
    // );
    // camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh
        ref={meshRef}
        scale={1.5}
        onAfterRender={() => {
          if (!isLoaded) setIsLoaded(true);
        }}
      >
        <icosahedronGeometry args={[1, 64]} />
        <logmaShaderMaterial
          key={LogmaShaderMaterial.key}
          ref={materialRef}
          // uFrequency={uFrequency}
          // uAmplitude={uAmplitude}
          // uDensity={uDensity}
          // uStrength={uStrength}
          // uDeepPurple={uDeepPurple}
          // uOpacity={uOpacity}
          uFrequency={settings.uFrequency.start}
          uAmplitude={settings.uAmplitude.start}
          uDensity={settings.uDensity.start}
          uStrength={settings.uStrength.start}
          uDeepPurple={settings.uDeepPurple.start}
          uOpacity={settings.uOpacity.start}
          uTime={0}
          wireframe={true}
          transparent={true}
        />
      </mesh>
    </>
  );
}

const LogmaShaderMaterial = shaderMaterial(
  {
    uFrequency: null,
    uAmplitude: null,
    uDensity: null,
    uStrength: null,
    uDeepPurple: null,
    uOpacity: null,
    uTime: 0,
  },
  /* GLSL */
  `
  // GLSL textureless classic 3D noise "cnoise",
  // with an RSL-style periodic variant "pnoise".
  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Version: 2011-10-11
  //
  // Many thanks to Ian McEwan of Ashima Arts for the
  // ideas for permutation and gradient selection.
  //
  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
  // Distributed under the MIT license. See LICENSE file.
  // https://github.com/ashima/webgl-noise
  //
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  // Classic Perlin noise, periodic variant
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
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

  // https://github.com/dmnsgn/glsl-rotate
  mat3 rotation3dY(float angle) {
      float s = sin(angle);
      float c = cos(angle);

      return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
      );
    }
    
  vec3 rotateY(vec3 v, float angle) {
    return rotation3dY(angle) * v;
  }

  //

  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uDensity;
  uniform float uStrength;

  varying float vDistortion;
  varying vec2 vUv;


  void main() {  
    float distortion = pnoise(normal * uDensity, vec3(10.)) * uStrength;

    vec3 pos = position + (normal * distortion);
    float angle = sin(uv.y * uFrequency) * uAmplitude;
    pos = rotateY(pos, angle);    
      
    vDistortion = distortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }
  `,
  /* GLSL */
  `
    uniform float uOpacity;
    uniform float uDeepPurple;
    
    varying float vDistortion;

    vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b * cos(6.28318 * (c * t + d));
      
    }     
    
    void main() {
      float distort = vDistortion * 3.;

      vec3 brightness = vec3(.1, .1, .9);
      vec3 contrast = vec3(.3, .3, .3);
      vec3 oscilation = vec3(.5, .5, .9);
      vec3 phase = vec3(.9, .1, .8);
    
      vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
      
      gl_FragColor = vec4(color, vDistortion);
      gl_FragColor += vec4(min(uDeepPurple, 1.), 0., .5, min(uOpacity, 1.));
    }
  `,
);

extend({ LogmaShaderMaterial });

export default Scene;
