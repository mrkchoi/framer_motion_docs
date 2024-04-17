import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, createPortal } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useFBO } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";

import FBO from "./FBO";

import texture1 from "./assets/images/logo.png";
import texture2 from "./assets/images/super.png";

const SIZE = 128;
const NUMBER = SIZE * SIZE;

const loadImage = (path) => {
  const img = new Image();
  img.src = path;
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

// CREATE DATA TEXTURE FROM IMAGE
const getPixelDataFromImage = async (url) => {
  let img = await loadImage(url);
  let width = 200;
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = width; // square source image
  ctx.drawImage(img, 0, 0, width, width);
  let canvasData = ctx.getImageData(0, 0, width, width).data;

  let pixels = [];

  for (let i = 0; i < canvasData.length; i += 4) {
    let x = (i / 4) % width;
    let y = Math.floor(i / 4 / width);
    if (canvasData[i] < 5) {
      pixels.push({ x: x / width - 0.5, y: 0.5 - y / width });
    }
  }

  const data = new Float32Array(NUMBER * 4);

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const idx = i * SIZE + j;
      let randomPixel = pixels[Math.floor(Math.random() * pixels.length)];
      if (Math.random() > 0.9) {
        randomPixel = {
          x: 3 * (Math.random() - 0.5),
          y: 3 * (Math.random() - 0.5),
        };
      }
      data[4 * idx + 0] = randomPixel.x + (Math.random() - 0.5) * 0.005;
      data[4 * idx + 1] = randomPixel.y + (Math.random() - 0.5) * 0.005;
      data[4 * idx + 2] = 1;
      data[4 * idx + 3] = 1;
    }
  }

  let dataTexture = new THREE.DataTexture(
    data,
    SIZE,
    SIZE,
    THREE.RGBAFormat,
    THREE.FloatType,
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
};

function Scene() {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const isDataLoaded = useMemo(() => data1 && data2, [data1, data2]);

  useEffect(() => {
    const loadTextures = async () => {
      const tex1 = await getPixelDataFromImage(texture1);
      const tex2 = await getPixelDataFromImage(texture2);

      setData1(tex1);
      setData2(tex2);
    };

    loadTextures();
  }, []);

  return isDataLoaded && <FBO data1={data1} data2={data2} />;
}

export default Scene;
