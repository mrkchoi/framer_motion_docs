import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { v4 as uuidv4 } from "uuid";

import vertex from "./shaders/vertex";
import fragment from "./shaders/fragment";
import simVertex from "./shaders/simVertex";
import simFragment from "./shaders/simFragment";

const lerp = (a, b, t) => a * (1 - t) + b * t;

const PERSPECTIVE = 1000;
const SIZE = 128;
const NUMBER = SIZE * SIZE;

function FBO({ data1, data2 }) {
  const { progress } = useControls({
    progress: { value: 0, min: 0, max: 1, step: 0.01 },
  });
  const { gl, camera } = useThree();
  const gpuCompute = useRef(new GPUComputationRenderer(SIZE, SIZE, gl));

  const positions = useRef(null);

  const aPositions = useMemo(() => new Float32Array(NUMBER * 3), []);
  const aUVs = useMemo(() => new Float32Array(NUMBER * 2), []);

  const simMaterial = useRef(null);
  const outputMaterial = useRef(null);

  const sceneFBO = new THREE.Scene();
  const cameraFBO = new THREE.OrthographicCamera(-1, 1, 1, -1, -2, 2);

  const mouseRef = useRef(null);

  let renderTarget1 = useFBO(SIZE, SIZE, {
    magFilter: THREE.NearestFilter,
    minFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });
  let renderTarget2 = useFBO(SIZE, SIZE, {
    magFilter: THREE.NearestFilter,
    minFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  useEffect(() => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const idx = i * SIZE + j;

        aPositions[3 * idx + 0] = j / SIZE - 0.5;
        aPositions[3 * idx + 1] = i / SIZE - 0.5;
        aPositions[3 * idx + 2] = 0;

        aUVs[2 * idx + 0] = j / (SIZE - 1);
        aUVs[2 * idx + 1] = i / (SIZE - 1);
      }
    }
  }, [aPositions, aUVs]);

  const currentPositionRef = useRef(null);
  const originalPositionRef = useRef(null);
  const originalPosition2Ref = useRef(null);
  const computeUniforms = useRef(null);

  useEffect(() => {
    currentPositionRef.current = gpuCompute.current.addVariable(
      "uCurrentPosition",
      simFragment,
      data1,
    );
    originalPositionRef.current = gpuCompute.current.addVariable(
      "uOriginalPosition",
      simFragment,
      data1,
    );
    originalPosition2Ref.current = gpuCompute.current.addVariable(
      "uOriginalPosition2",
      simFragment,
      data2,
    );

    gpuCompute.current.setVariableDependencies(currentPositionRef.current, [
      currentPositionRef.current,
      originalPositionRef.current,
      originalPosition2Ref.current,
    ]);
    gpuCompute.current.setVariableDependencies(originalPositionRef.current, [
      currentPositionRef.current,
      originalPositionRef.current,
      originalPosition2Ref.current,
    ]);
    gpuCompute.current.setVariableDependencies(originalPosition2Ref.current, [
      currentPositionRef.current,
      originalPositionRef.current,
      originalPosition2Ref.current,
    ]);

    computeUniforms.current = currentPositionRef.current.material.uniforms;
    // computeUniforms.current.uCurrentPosition = { value: data1 };
    // computeUniforms.current.uOriginalPosition = { value: data1 };
    // computeUniforms.current.uOriginalPosition2 = { value: data2 };
    computeUniforms.current.uProgress = { value: 0 };
    computeUniforms.current.uMouse = { value: new THREE.Vector3(-2, -2, -2) };

    // console.log(currentPositionRef.current);
    console.log(gpuCompute.current);
    // console.log(computeUniforms.current);

    gpuCompute.current.init();
  }, []);

  // MOUSE EVENTS
  useEffect(() => {
    // mouse events
    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial(),
    );

    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera({ x, y }, camera);
      // raycaster.setFromCamera({ x, y }, cameraRef?.current);
      const intersects = raycaster.intersectObjects([planeMesh]);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        mouseRef.current.position.copy(point);
        simMaterial.current.uniforms.uMouse.value = point;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // create output data texture
    const data = new Float32Array(NUMBER * 4);

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const idx = i * SIZE + j;

        data[4 * idx + 0] = lerp(-0.5, 0.5, j / (SIZE - 1));
        data[4 * idx + 1] = lerp(-0.5, 0.5, i / (SIZE - 1));
        data[4 * idx + 2] = 1;
        data[4 * idx + 3] = 1;
      }
    }

    positions.current = new THREE.DataTexture(
      data,
      SIZE,
      SIZE,
      THREE.RGBAFormat,
      THREE.FloatType,
    );
    positions.current.needsUpdate = true;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // update camera fov
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov =
        (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (simMaterial.current.uniforms.uProgress.value === 0) {
        simMaterial.current.uniforms.uProgress.value = 1;
      } else {
        simMaterial.current.uniforms.uProgress.value = 0;
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useFrame(({ gl, clock }) => {
    gl.setRenderTarget(renderTarget1);
    gl.render(sceneFBO, cameraFBO);
    gl.setRenderTarget(null);

    outputMaterial.current.uniforms.uTexture.value = renderTarget2.texture;
    simMaterial.current.uniforms.uCurrentPosition.value = renderTarget1.texture;
    // simMaterial.current.uniforms.uProgress.value = progress;

    // swap render targets
    const temp = renderTarget1;
    renderTarget1 = renderTarget2;
    renderTarget2 = temp;
  });

  const simUniforms = useMemo(
    () => ({
      uCurrentPosition: { value: data1 },
      uOriginalPosition: { value: data1 },
      uOriginalPosition2: { value: data2 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector3(-2, -2, -2) },
    }),
    [data1, data2],
  );

  const outputUniforms = useMemo(
    () => ({
      uTexture: { value: positions.current },
    }),
    [],
  );

  return (
    <>
      <mesh ref={mouseRef}>
        <sphereGeometry args={[0.01, 32, 32]} />
        <meshNormalMaterial />
      </mesh>
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial
            ref={simMaterial}
            uniforms={simUniforms}
            vertexShader={simVertex}
            fragmentShader={simFragment}
          />
        </mesh>,
        sceneFBO,
      )}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={aPositions.length / 3}
            array={aPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-uv"
            count={aUVs.length / 2}
            array={aUVs}
            itemSize={2}
          />
        </bufferGeometry>
        <shaderMaterial
          key={uuidv4()}
          ref={outputMaterial}
          uniforms={outputUniforms}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent={true}
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

export default FBO;
