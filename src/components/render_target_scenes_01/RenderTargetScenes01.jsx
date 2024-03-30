import { Suspense, useRef, useMemo } from "react";
import { Canvas, createPortal, useFrame, extend } from "@react-three/fiber";
import {
  OrbitControls,
  useFBO,
  Sky,
  Environment,
  OrthographicCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import { useControls } from "leva";

import "./renderTargetScenes01.css";

function RenderTargetScenes01() {
  return (
    <div className="renderTargetScenes01__main">
      <div className="renderTargetScenes01__canvasWrapper">
        <Canvas
          camera={{
            position: [0, 0, 6],
          }}
          dpr={[1, 2]}
          flat={true}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <OrbitControls
          // enableZoom={false}
          // autoRotate={true}
          // autoRotateSpeed={3}
          />
        </Canvas>
      </div>
    </div>
  );
}

function Scene() {
  const { progress } = useControls({
    progress: {
      value: 1,
      min: -1,
      max: 1,
    },
  });

  const sky = useRef(null);

  const object1 = useRef(null);
  const object2 = useRef(null);
  const object3 = useRef(null);
  const object4 = useRef(null);

  const scene1 = new THREE.Scene();
  const scene2 = new THREE.Scene();

  const renderTarget1 = useFBO();
  const renderTarget2 = useFBO();

  const screenMesh = useRef(null);

  useFrame(({ gl, scene, camera, clock }) => {
    sky.current.material.uniforms.sunPosition.value = new THREE.Vector3(
      10,
      10,
      0,
    );

    gl.setRenderTarget(renderTarget1);
    gl.render(scene1, camera);

    screenMesh.current.material.uniforms.uTexture1.value =
      renderTarget1.texture;

    // sky.current.material.uniforms.sunPosition.value = new THREE.Vector3(
    //   0,
    //   -0.3,
    //   -10,
    // );

    gl.setRenderTarget(renderTarget2);
    gl.render(scene2, camera);

    object1.current.rotation.x += 0.01;
    object1.current.rotation.y += 0.01;
    object1.current.rotation.z += 0.01;

    object2.current.rotation.x -= 0.01;
    object2.current.rotation.y -= 0.01;
    object2.current.rotation.z -= 0.01;

    object3.current.rotation.x -= 0.01;
    object3.current.rotation.y -= 0.01;
    object3.current.rotation.z -= 0.01;

    object4.current.rotation.x += 0.01;
    object4.current.rotation.y += 0.01;
    object4.current.rotation.z += 0.01;

    screenMesh.current.material.uniforms.uTexture2.value =
      renderTarget2.texture;

    screenMesh.current.material.uniforms.uTime.value = clock.elapsedTime;

    screenMesh.current.material.uniforms.uProgress.value = Math.sin(
      clock.elapsedTime,
    );

    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <>
          <Sky />
          <Environment preset="dawn" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 0]} intensity={1} />
          <mesh ref={object1} position={[-2, 0, 0]}>
            <icosahedronGeometry args={[1]} />
            <meshPhysicalMaterial
              color="#73B9ED"
              roughness={0}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
          <mesh ref={object2} position={[2, 0, 0]}>
            <icosahedronGeometry args={[1]} />
            <meshPhysicalMaterial
              color="#73B9ED"
              roughness={0}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
        </>,
        scene1,
      )}
      {createPortal(
        <>
          <Sky ref={sky} />
          <Environment preset="dawn" />
          {/* <ambientLight intensity={0.5} /> */}
          <directionalLight position={[10, 10, 0]} intensity={1} />
          <mesh ref={object3} position={[-2, 0, 0]}>
            <torusKnotGeometry args={[0.5, 0.3, 128, 64]} />
            <meshPhysicalMaterial
              color="#73B9ED"
              roughness={0}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
          <mesh ref={object4} position={[2, 0, 0]}>
            <torusKnotGeometry args={[0.5, 0.3, 128, 64]} />
            <meshPhysicalMaterial
              color="#73B9ED"
              roughness={0}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={1}
            />
          </mesh>
        </>,
        scene2,
      )}
      <OrthographicCamera args={[-1, 1, 1, -1, 0, 1]} />
      <mesh ref={screenMesh}>
        <planeGeometry args={[12, 12]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={{
            uTexture1: { value: renderTarget1.texture },
            uTexture2: { value: renderTarget2.texture },
            uTime: { value: 0 },
            uProgress: { value: 0 },
          }}
          vertexShader={
            /* glsl */
            `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `
          }
          fragmentShader={
            /* glsl */
            `
            uniform sampler2D uTexture1;
            uniform sampler2D uTexture2;
            uniform float uTime;
            uniform float uProgress;
            varying vec2 vUv;

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

            vec2 fade(vec2 t) {
              return t*t*t*(t*(t*6.0-15.0)+10.0);
            }

            // Classic Perlin noise
            float cnoise(vec2 P)
            {
              vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
              vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
              Pi = mod289(Pi); // To avoid truncation effects in permutation
              vec4 ix = Pi.xzxz;
              vec4 iy = Pi.yyww;
              vec4 fx = Pf.xzxz;
              vec4 fy = Pf.yyww;

              vec4 i = permute(permute(ix) + iy);

              vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
              vec4 gy = abs(gx) - 0.5 ;
              vec4 tx = floor(gx + 0.5);
              gx = gx - tx;

              vec2 g00 = vec2(gx.x,gy.x);
              vec2 g10 = vec2(gx.y,gy.y);
              vec2 g01 = vec2(gx.z,gy.z);
              vec2 g11 = vec2(gx.w,gy.w);

              vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
              g00 *= norm.x;
              g01 *= norm.y;
              g10 *= norm.z;
              g11 *= norm.w;

              float n00 = dot(g00, vec2(fx.x, fy.x));
              float n10 = dot(g10, vec2(fx.y, fy.y));
              float n01 = dot(g01, vec2(fx.z, fy.z));
              float n11 = dot(g11, vec2(fx.w, fy.w));

              vec2 fade_xy = fade(Pf.xy);
              vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
              float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
              return 2.3 * n_xy;
            }

            void main() {
              vec2 uv = vUv;

              vec4 color1 = texture2D(uTexture1, uv);
              vec4 color2 = texture2D(uTexture2, uv);

              float noise = clamp(cnoise(vUv * 5.0) + uProgress * 2.0, 0.0, 1.0);

              gl_FragColor = mix(color1, color2, noise);
            }
          `
          }
        />
      </mesh>
    </>
  );
}

export default RenderTargetScenes01;
