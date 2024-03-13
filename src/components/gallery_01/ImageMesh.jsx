import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

function ImageMesh({
  texture,
  textureSize,
  elementSize,
  meshRef,
  setMeshRef,
  hideDOMImage,
}) {
  const { frequencyX, frequencyY } = useControls({
    frequencyX: {
      label: "frequencyX",
      value: 10,
      config: {
        step: 0.01,
        min: 0,
        max: 20,
      },
    },
    frequencyY: {
      label: "frequencyY",
      value: 5,
      config: {
        step: 0.01,
        min: 0,
        max: 20,
      },
    },
  });

  console.log(meshRef);
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
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* <meshBasicMaterial side={THREE.DoubleSide} color={0xff0000} /> */}
      <imageShaderMaterial
        uTexture={texture}
        uTextureSize={new THREE.Vector2(textureSize.width, textureSize.height)}
        uElementSize={new THREE.Vector2(elementSize.width, elementSize.height)}
        uTime={0}
        uFrequency={new THREE.Vector2(frequencyX, frequencyY)}
        side={THREE.DoubleSide}
        // wireframe={true}
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
    uFrequency: new THREE.Vector2(10, 5),
    uTime: 0,
  },
  /* GLSL */ `
    uniform vec2 uFrequency;
    uniform float uTime;

    // attribute float aRandom;

    // varying float vRandom;
    varying vec2 vUv; 
    varying float vElevation;
    
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
      elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

      modelPosition.z += elevation;

      // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime * 0.4) * 0.1;
      // modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime * 0.4) * 0.1;
      // modelPosition.z += aRandom * 0.1;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      vUv = uv;
      vElevation = elevation;
    }
  `,
  /* GLSL */ `
    uniform sampler2D uTexture;
    // varying float vRandom;

    varying vec2 vUv; 
    varying float vElevation;

    void main() {
      vec4 textureColor = texture2D(uTexture, vUv);
      // textureColor.rgb *= vElevation * 2.0 + 1.0;

      // gl_FragColor = textureColor;
      vec4 color = vec4(vUv, 1.0, 1.0);
      color.rgb *= vElevation * 2.0 + 1.0;
      gl_FragColor = color;
      // gl_FragColor = vec4(0.5, 1.0, 1.0, 0.5);
    }
  `,
);

extend({ ImageShaderMaterial });
