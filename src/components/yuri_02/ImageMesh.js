import { useEffect, useRef } from "react";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

function ImageMesh({
  uColor,
  texture,
  uPixels,
  textureSize,
  elementSize,
  meshRef,
  setMeshRef,
  hideDOMImage,
}) {
  const {
    byp,
    amount,
    angle,
    seed,
    seed_x,
    seed_y,
    distortion_x,
    distortion_y,
    col_s,
  } = useControls({
    byp: { value: 0, min: 0, max: 1 },
    amount: { value: 0.03, min: 0, max: 0.1, step: 0.001 },
    angle: { value: 0.3, min: 0, max: 1 },
    seed: { value: 0.0, min: 0, max: 1 },
    seed_x: { value: 0.02, min: 0, max: 1 },
    seed_y: { value: 0.02, min: 0, max: 1 },
    distortion_x: { value: 1, min: 0, max: 1 },
    distortion_y: { value: 1, min: 0, max: 1 },
    col_s: { value: 0.0, min: 0, max: 1 },
  });
  const materialRef = useRef(null);
  useFrame(({ clock }) => {
    if (meshRef) {
      // console.log(meshRef);
      meshRef.material.uniforms.uTime.value = clock.elapsedTime;
      // console.log(
      //   "materialRef.current.uniforms.uShift: ",
      //   materialRef.current.uniforms.uShift,
      // );
      // materialRef.current.uniforms.uShift.value = clock.elapsedTime;
    }
  });

  // useEffect(() => {
  //   if (materialRef.current) {
  //     // console.log("uShift: ", meshRef?.material?.uniforms?.uShift);
  //   }
  // }, [meshRef?.material?.uniforms?.uShift]);

  // const state = useThree();
  return (
    <mesh ref={setMeshRef} onAfterRender={hideDOMImage}>
      <planeGeometry args={[1, 1]} />
      {/* <meshBasicMaterial map={texture} side={THREE.DoubleSide} /> */}
      <imageShaderMaterial
        ref={materialRef}
        uColor={uColor}
        transparent={true}
        uTexture={texture}
        // uTextureSize={new THREE.Vector2(textureSize.width, textureSize.height)}
        // uElementSize={new THREE.Vector2(elementSize.width, elementSize.height)}
        uTime={0}
        tDiffuse={texture}
        tDisp={texture}
        byp={byp}
        amount={amount}
        angle={angle}
        seed={seed}
        seed_x={seed_x}
        seed_y={seed_y}
        distortion_x={distortion_x}
        distortion_y={distortion_y}
        col_s={col_s}
      />
    </mesh>
  );
}

export default ImageMesh;

const ImageShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    tDiffuse: { value: null }, //diffuse texture
    tDisp: { value: null }, //displacement texture for digital glitch squares
    byp: { value: 0 }, //apply the glitch ?
    amount: { value: 0.08 },
    angle: { value: 0.02 },
    seed: { value: 0.02 },
    seed_x: { value: 0.02 }, //-1,1
    seed_y: { value: 0.02 }, //-1,1
    distortion_x: { value: 0.5 },
    distortion_y: { value: 0.6 },
    col_s: { value: 0.05 },
  },
  // Vertex Shader
  `
    varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}
  `,
  // Fragment Shader
  `
		uniform int byp; //should we apply the glitch ?

		uniform sampler2D tDiffuse;
		uniform sampler2D tDisp;

		uniform float amount;
		uniform float angle;
		uniform float seed;
		uniform float seed_x;
		uniform float seed_y;
		uniform float distortion_x;
		uniform float distortion_y;
		uniform float col_s;
    uniform float uTime;

		varying vec2 vUv;


		float rand(vec2 co){
			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}

		void main() {
			if(byp<1) {
				vec2 p = vUv;
				float xs = floor(gl_FragCoord.x / 0.5);
				float ys = floor(gl_FragCoord.y / 0.5);
				//based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
				float disp = texture2D(tDisp, p*seed*seed).r;
				if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {
					if(seed_x>0.){
						p.y = 1. - (p.y + distortion_y);
					}
					else {
						p.y = distortion_y;
					}
				}
				if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {
					if(seed_y>0.){
						p.x=distortion_x;
					}
					else {
						p.x = 1. - (p.x + distortion_x);
					}
				}
				p.x+=disp*seed_x*(seed/5.);
				p.y+=disp*seed_y*(seed/5.);
				//base from RGB shift shader
				vec2 offset = (amount * sin(uTime * 2.0)) * vec2( cos(angle), sin(angle));
				vec4 cr = texture2D(tDiffuse, p + offset);
				vec4 cga = texture2D(tDiffuse, p);
				vec4 cb = texture2D(tDiffuse, p - offset);
				gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
				//add noise
				vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);
				gl_FragColor = gl_FragColor+ snow;
			}
			else {
				gl_FragColor=texture2D (tDiffuse, vUv);
			}
		}
  `,
);

extend({ ImageShaderMaterial });
