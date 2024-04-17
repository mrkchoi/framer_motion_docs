import React, { useMemo, useRef } from "react";
import { useFrame, createPortal, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";

import getDataTexture from "./util/getDataTexture";

import renderVertex from "./shaders/render/renderVertex";
import renderFragment from "./shaders/render/renderFragment";
import simulationVertex from "./shaders/simulation/simulationVertex";
import simulationFragment from "./shaders/simulation/simulationFragment";

const SIZE = 512;

function Particles() {
  const simMaterial = useRef(null);
  const renderMaterial = useRef(null);
  const followMouseRef = useRef(null);

  const { viewport } = useThree();

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  let renderTarget0 = useFBO(SIZE, SIZE, {
    magFilter: THREE.NearestFilter,
    minFilter: THREE.NearestFilter,
    type: THREE.FloatType,
  });
  let renderTarget1 = useFBO(SIZE, SIZE, {
    magFilter: THREE.NearestFilter,
    minFilter: THREE.NearestFilter,
    type: THREE.FloatType,
  });

  const particles = useMemo(() => {
    const output = new Float32Array(SIZE * SIZE * 3);

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const k = i * SIZE + j;
        output[k * 3 + 0] = (5 * i) / SIZE;
        output[k * 3 + 1] = (5 * j) / SIZE;
        output[k * 3 + 2] = 0;
      }
    }

    return output;
  }, []);

  const ref = useMemo(() => {
    const output = new Float32Array(SIZE * SIZE * 2);

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const k = i * SIZE + j;
        output[k * 2 + 0] = i / (SIZE - 1);
        output[k * 2 + 1] = j / (SIZE - 1);
      }
    }

    return output;
  }, []);

  const originalPosition = useMemo(() => getDataTexture(SIZE), []);

  useFrame((state) => {
    const { gl } = state;

    gl.setRenderTarget(renderTarget0);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    renderMaterial.current.uniforms.uPosition.value = renderTarget1.texture;
    simMaterial.current.uniforms.uPosition.value = renderTarget0.texture;

    const temp = renderTarget0;
    renderTarget0 = renderTarget1;
    renderTarget1 = temp;
  });

  useFrame(({ mouse }) => {
    followMouseRef.current.position.x = (mouse.x * viewport.width) / 2;
    followMouseRef.current.position.y = (mouse.y * viewport.height) / 2;

    simMaterial.current.uniforms.uMouse.value.x =
      followMouseRef.current.position.x;
    simMaterial.current.uniforms.uMouse.value.y =
      followMouseRef.current.position.y;
  });

  const renderUniforms = useMemo(
    () => ({
      uPosition: { value: null },
    }),
    [],
  );

  const simulationUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPosition: { value: originalPosition },
      uOriginalPosition: { value: originalPosition },
      uMouse: { value: new THREE.Vector3(-10, -10, 10) },
    }),
    [originalPosition],
  );

  return (
    <>
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial // simulationMaterial
            key={uuidv4()}
            ref={simMaterial}
            uniforms={simulationUniforms}
            vertexShader={simulationVertex}
            fragmentShader={simulationFragment}
          />
        </mesh>,
        scene,
      )}
      <mesh ref={followMouseRef} visible={false}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-ref"
            count={ref.length / 2}
            array={ref}
            itemSize={2}
          />
        </bufferGeometry>
        <shaderMaterial // renderMaterial
          key={uuidv4()}
          ref={renderMaterial}
          blending={THREE.AdditiveBlending}
          transparent={true}
          uniforms={renderUniforms}
          vertexShader={renderVertex}
          fragmentShader={renderFragment}
        />
      </points>
    </>
  );
}

export default Particles;
