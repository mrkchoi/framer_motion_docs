import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

function ImageMesh({
  texture,
  textureSize,
  elementSize,
  meshRef,
  setMeshRef,
  hideDOMImage,
}) {
  useFrame(({ clock }) => {
    if (meshRef) {
      meshRef.material.uniforms.uTime.value = clock.elapsedTime;
      // console.log(
      //   "meshRef.material.uniforms.uTime.value: ",
      //   meshRef.material.uniforms.uTime.value,
      // );
    }
  });

  // const state = useThree();
  return (
    <mesh ref={setMeshRef} onAfterRender={hideDOMImage}>
      <planeGeometry args={[1, 1]} />
      {/* <meshBasicMaterial map={texture} side={THREE.DoubleSide} /> */}
      <imageShaderMaterial
        uTexture={texture}
        uTextureSize={new THREE.Vector2(textureSize.width, textureSize.height)}
        uElementSize={new THREE.Vector2(elementSize.width, elementSize.height)}
        uTime={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default ImageMesh;

const ImageShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uTextureSize: null,
    uElementSize: null,
    uTime: 0,
  },
  /* GLSL */ `
    varying vec2 vUv;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* GLSL */ `
    //	Classic Perlin 2D Noise 
    //	by Stefan Gustavson
    //
    vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
    float cnoise(vec2 P){
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;
      vec4 i = permute(permute(ix) + iy);
      vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
      vec4 gy = abs(gx) - 0.5;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;
      vec2 g00 = vec2(gx.x,gy.x);
      vec2 g10 = vec2(gx.y,gy.y);
      vec2 g01 = vec2(gx.z,gy.z);
      vec2 g11 = vec2(gx.w,gy.w);
      vec4 norm = 1.79284291400159 - 0.85373472095314 * 
        vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
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

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec2 uTextureSize;
    uniform vec2 uElementSize;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;
      // uv.y += sin(uv.x * 10.0 + uTime) * 0.02;
      // uv.x += sin(uv.y * 10.0 + uTime) * 0.02;
      uv.y += cnoise(uv * 5.0 + uTime) * 0.1;
      uv.x += cnoise(uv * 20.0 + uTime) * 0.02;
      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `,
);

extend({ ImageShaderMaterial });
