import React, { useEffect, useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { v4 as uuidv4 } from "uuid";
import gsap from "gsap";
import lerp from "lerp";

import desert01 from "./assets/images/desert01.jpeg";
import mountain01 from "./assets/images/mountain01.jpeg";
import portrait01 from "./assets/images/portrait.jpg";
import portrait02 from "./assets/images/portrait02.jpg";
import teamColor from "./assets/images/team01.jpeg";
import teamBW from "./assets/images/team02.jpeg";
import shape01 from "./assets/images/shape.jpg";
import shape02 from "./assets/images/shape02.jpg";
import shape03 from "./assets/images/shapeO.jpg";

// import vertexShader from "./shaders/vertex.glsl";
// import fragmentShader from "./shaders/fragment.glsl";

function Mesh() {
  const meshRef = useRef(null);
  const mouseRef = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.target.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.target.y = (e.clientY / window.innerHeight) * -2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const { camera } = state;
    meshRef.current.material.uniforms.uTime.value += 0.01;
    // meshRef.current.material.uniforms.uSpeed.value = speed;

    mouseRef.current.current.x = lerp(
      mouseRef.current.current.x,
      mouseRef.current.target.x,
      0.1,
    );
    mouseRef.current.current.y = lerp(
      mouseRef.current.current.y,
      mouseRef.current.target.y,
      0.1,
    );

    meshRef.current.material.uniforms.uMouse.value = new THREE.Vector2(
      mouseRef.current.current.x,
      mouseRef.current.current.y,
    );

    gsap.to(meshRef.current.rotation, {
      x: -mouseRef.current.current.y * 0.15,
      y: mouseRef.current.current.x * Math.PI * 0.1,
      duration: 0.5,
      ease: "power3.out",
    });

    // use raycaster to detect hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = mouseRef.current.current.x;
    mouse.y = -mouseRef.current.current.y;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([meshRef.current]);

    if (intersects.length > 0) {
      gsap.to(meshRef.current.material.uniforms.uHover, {
        value: 1,
        duration: 1,
        ease: "expo.out",
      });
    } else {
      gsap.to(meshRef.current.material.uniforms.uHover, {
        value: 0,
        duration: 1,
        ease: "expo.out",
      });
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uViewport: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      // uTexture: { value: new THREE.TextureLoader().load(desert01) },
      // uTexture2: { value: new THREE.TextureLoader().load(mountain01) },
      uTexture: { value: new THREE.TextureLoader().load(teamBW) },
      uTexture2: { value: new THREE.TextureLoader().load(teamColor) },
      uShape: { value: new THREE.TextureLoader().load(shape03) },
      uHover: { value: 0 },
    }),
    [],
  );

  return (
    <mesh ref={meshRef} scale={[320, 400, 400]}>
      <planeGeometry args={[2, 2, 32]} />
      {/* <sphereGeometry args={[1, 32, 32]} /> */}
      {/* <torusKnotGeometry args={[1, 0.4, 100, 16]} /> */}
      <shaderMaterial
        key={uuidv4()}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={
          /* GLSL */
          `
          uniform float uTime;

          varying vec2 vUv;

          void main() {
            vUv = uv;

            vec3 newPosition = position;

            vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
            vec4 projectedPosition = projectionMatrix * modelViewPosition;

            gl_Position = projectedPosition;
          }
        `
        }
        fragmentShader={
          /* GLSL */
          `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uViewport;
          uniform sampler2D uTexture;
          uniform sampler2D uTexture2;
          uniform sampler2D uShape;
          uniform float uHover;

          varying vec2 vUv;

          //	Simplex 3D Noise 
          //	by Ian McEwan, Ashima Arts
          //
          vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

          float snoise(vec3 v){ 
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

          // First corner
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;

          // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );

            //  x0 = x0 - 0. + 0.0 * C 
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1. + 3.0 * C.xxx;

          // Permutations
            i = mod(i, 289.0 ); 
            vec4 p = permute( permute( permute( 
                      i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

          // Gradients
          // ( N*N points uniformly over a square, mapped onto an octahedron.)
            float n_ = 1.0/7.0; // N=7
            vec3  ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );

            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);

          //Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

          // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                          dot(p2,x2), dot(p3,x3) ) );
          }        

          float circle(in vec2 _st, in float _radius, in float blurriness){
            vec2 dist = _st;
            return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
          }          

          void main() {
            vec2 uv = vUv;

            vec2 mouse = (-uMouse - .5) * 2.0;

            vec2 circlePos = uv + (mouse * 0.5);
            float c = circle(circlePos, 0.3, 0.5) * 2.5;

            float offX = uv.x + sin(uv.y + uTime * 0.1);
            float offY = uv.y - uTime * 0.1 - cos(uTime * 0.001) * 0.01;
            vec2 uvOff = vec2(offX, offY);

            float n = snoise(vec3(offX, offY, uTime * 0.1) * 9.0) - 1.0;

            // float finalMask = smoothstep(0.4, 0.5, n + c);
            // float finalMask = n + c;
            // float finalMask = n;

            vec4 image1 = texture2D(uTexture2, uv * 0.95 + 0.01 - uMouse * 0.05);
            vec4 image2 = texture2D(uTexture, uv * 0.98 + 0.01 - uMouse * 0.02);

            vec2 shapeUv = (uv - uMouse) * 0.85 + 0.08;
            vec4 shape = texture2D(uShape, shapeUv);

            // vec4 finalImage = mix(image1, image2, finalMask);

            float s = shape.r * 2.7;
            float finalMask = smoothstep(0.4, 0.6, n + s);

            // vec4 finalImage = shape;            
            vec4 finalImage = mix(image1, image2, finalMask);

            gl_FragColor = vec4(vec3(finalImage), 1.0);
            // gl_FragColor = finalImage;
            // gl_FragColor = vec4(vec3(n), 1.0);
            // gl_FragColor = vec4(vec3(0.0), 1.0);
          }
        `
        }
      />
    </mesh>
  );
}

export default Mesh;
