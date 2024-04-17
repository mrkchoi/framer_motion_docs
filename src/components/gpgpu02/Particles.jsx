import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, createPortal, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

import {
  getDataTexture,
  getSphereTexture,
  getVelocityTexture,
} from "./util/getDataTexture";

import renderVertex from "./shaders/render/renderVertex";
import renderFragment from "./shaders/render/renderFragment";
// import simulationVertex from "./shaders/simulation/simulationVertex";
// import simulationFragment from "./shaders/simulation/simulationFragment";
import simFragmentPosition from "./shaders/simulation/simFragmentPosition";
import simFragmentVelocity from "./shaders/simulation/simFragmentVelocity";

const SIZE = 50;

function Particles() {
  const renderMaterial = useRef(null);
  const followMouseRef = useRef(null);
  const { viewport, gl } = useThree();
  const gpuCompute = useRef(new GPUComputationRenderer(SIZE, SIZE, gl));
  const positionVariable = useRef(null);
  const velocityUniforms = useRef(null);
  const positionUniforms = useRef(null);

  useEffect(() => {
    const pointsOnASphere = getSphereTexture(SIZE);

    positionVariable.current = gpuCompute.current.addVariable(
      "uCurrentPosition",
      simFragmentPosition,
      pointsOnASphere,
    );
    const velocityVariable = gpuCompute.current.addVariable(
      "uCurrentVelocity",
      simFragmentVelocity,
      getVelocityTexture(SIZE),
    );

    gpuCompute.current.setVariableDependencies(positionVariable.current, [
      positionVariable.current,
      velocityVariable,
    ]);

    gpuCompute.current.setVariableDependencies(velocityVariable, [
      positionVariable.current,
      velocityVariable,
    ]);

    positionUniforms.current = positionVariable.current.material.uniforms;
    velocityUniforms.current = velocityVariable.material.uniforms;

    velocityUniforms.current.uMouse = { value: new THREE.Vector3(0, 0, 0) };
    positionUniforms.current.uOriginalPosition = { value: pointsOnASphere };
    velocityUniforms.current.uOriginalPosition = { value: pointsOnASphere };

    gpuCompute.current.init();
  }, []);

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

  useFrame((state) => {
    gpuCompute.current.compute();
    renderMaterial.current.uniforms.uPosition.value =
      gpuCompute.current.getCurrentRenderTarget(
        positionVariable.current,
      ).texture;
  });

  useFrame(({ mouse }) => {
    followMouseRef.current.position.x = (mouse.x * viewport.width) / 2;
    followMouseRef.current.position.y = (mouse.y * viewport.height) / 2;

    velocityUniforms.current.uMouse.value.x = followMouseRef.current.position.x;
    velocityUniforms.current.uMouse.value.y = followMouseRef.current.position.y;
  });

  const renderUniforms = useMemo(
    () => ({
      uPosition: { value: null },
    }),
    [],
  );

  return (
    <>
      <mesh ref={followMouseRef} visible={true}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="red" />
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
