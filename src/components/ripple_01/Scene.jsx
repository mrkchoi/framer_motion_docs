import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
// import { Perf } from "r3f-perf";

import img01 from "./assets/images/abstract.jpeg";
import img02 from "./assets/images/ocean.jpeg";
import img03 from "./assets/images/sky.jpeg";
import img04 from "./assets/images/abstract2.jpeg";

import brush01 from "./assets/images/brush.png";

import vertexShader from "./shaders/vertexShader";
import imageFragmentShader from "./shaders/imageFragmentShader";
import outputFragmentShader from "./shaders/outputFragmentShader";

const TEXTURES = [img01, img02, img03, img04];

const mouse = {
  current: { x: 0, y: 0 },
  prev: { x: 0, y: 0 },
};

const brushCount = 100;
const brushSize = 150;
const brushIndexes = [...Array.from({ length: brushCount }).keys()];

function Scene({ image }) {
  const textureIdx = useRef(0);
  const planeMesh = useRef(null);
  const outputMesh = useRef(null);
  const brushes = useRef({});
  const brush = new THREE.TextureLoader().load(brush01);
  const currentBrush = useRef(0);

  const sceneBrush = new THREE.Scene();
  const sceneImage = new THREE.Scene();

  const renderTarget1 = useFBO();
  const renderTarget2 = useFBO();

  const trackBrush = (mouseX, mouseY) => {
    if (
      Math.abs(mouseX - mouse.prev.x) < 1 ||
      Math.abs(mouseY - mouse.prev.y) < 1
    ) {
      mouse.prev = {
        x: mouseX,
        y: mouseY,
      };
      return;
    }

    const brush = brushes.current[currentBrush.current];
    brush.visible = true;
    brush.material.opacity = 0.5;
    brush.position.x = mouseX;
    brush.position.y = mouseY;
    brush.scale.x = 1;
    brush.scale.y = 1;

    currentBrush.current = (currentBrush.current + 1) % brushCount;
    mouse.prev = {
      x: mouseX,
      y: mouseY,
    };
  };

  useFrame((state, delta) => {
    const { gl, camera } = state;

    outputMesh.current.scale.x = window.innerWidth;
    outputMesh.current.scale.y = window.innerHeight;

    gl.setRenderTarget(renderTarget1);
    gl.render(sceneBrush, camera);

    outputMesh.current.material.uniforms.uTextureBrush.value =
      renderTarget1.texture;

    gl.setRenderTarget(renderTarget2);
    gl.render(sceneImage, camera);

    outputMesh.current.material.uniforms.uTextureImage.value =
      renderTarget2.texture;

    trackBrush(
      mouse.current.x - window.innerWidth / 2,
      -mouse.current.y + window.innerHeight / 2,
    );

    if (planeMesh.current) {
      planeMesh.current.scale.x = window.innerWidth;
      planeMesh.current.scale.y = window.innerHeight;

      brushIndexes.forEach((idx) => {
        const brush = brushes.current[idx];
        if (brush.visible === false) return;

        brush.rotation.z += 0.02;
        // brush.rotation.z += delta * 0.5;
        brush.material.opacity *= 0.96;
        brush.scale.x = brush.scale.x * 0.982 + 0.108;
        brush.scale.y = brush.scale.x;
        if (brush.material.opacity < 0.001) {
          brush.visible = false;
        }
      });
    }

    gl.setRenderTarget(null);
  });

  useEffect(() => {
    const { width, height } = image.getBoundingClientRect();

    if (planeMesh.current) {
      planeMesh.current.material.uniforms.uImageNaturalSize.value.set(
        image.naturalWidth,
        image.naturalHeight,
      );
      planeMesh.current.material.uniforms.uImageRenderedSize.value.set(
        width,
        height,
      );
    }
  }, [image]);

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = image.getBoundingClientRect();

      if (planeMesh.current) {
        planeMesh.current.material.uniforms.uImageNaturalSize.value.set(
          image.naturalWidth,
          image.naturalHeight,
        );
        planeMesh.current.material.uniforms.uImageRenderedSize.value.set(
          width,
          height,
        );
      }
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleClick = (e) => {
      textureIdx.current = (textureIdx.current + 1) % TEXTURES.length;
      planeMesh.current.material.uniforms.uTexture.value =
        new THREE.TextureLoader().load(TEXTURES[textureIdx.current]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const uniformsImage = useMemo(
    () => ({
      uTexture: {
        value: new THREE.TextureLoader().load(TEXTURES[textureIdx.current]),
      },
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uImageNaturalSize: { value: new THREE.Vector2(0, 0) },
      uImageRenderedSize: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  const uniformsOutput = useMemo(
    () => ({
      uTextureBrush: { value: null },
      uTextureImage: { value: null },
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uImageNaturalSize: { value: new THREE.Vector2(0, 0) },
      uImageRenderedSize: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  return (
    <>
      {/* <Perf /> */}
      {createPortal(
        <>
          <color attach="background" args={["#000"]} />
          {Array.from({ length: brushCount }).map((_, idx) => (
            <mesh
              key={idx}
              ref={(ref) => (brushes.current[idx] = ref)}
              rotation={[0, 0, Math.random() * Math.PI * 2]}
              position={[0, 0, 0]}
              visible={false}
            >
              <planeGeometry args={[brushSize, brushSize, 1]} />
              <meshBasicMaterial
                map={brush}
                blending={THREE.AdditiveBlending}
                transparent={true}
                depthTest={false}
                depthWrite={false}
              />
            </mesh>
          ))}
        </>,
        sceneBrush,
      )}
      {createPortal(
        <>
          <mesh ref={planeMesh} visible={true}>
            <planeGeometry args={[1, 1, 2]} />
            <shaderMaterial
              key={uuidv4()}
              uniforms={uniformsImage}
              vertexShader={vertexShader}
              fragmentShader={imageFragmentShader}
            />
          </mesh>
        </>,
        sceneImage,
      )}
      <mesh ref={outputMesh} visible={true}>
        <planeGeometry args={[1, 1, 2]} />
        <shaderMaterial
          key={uuidv4()}
          uniforms={uniformsOutput}
          vertexShader={vertexShader}
          fragmentShader={outputFragmentShader}
        />
      </mesh>
    </>
  );
}

export default Scene;
