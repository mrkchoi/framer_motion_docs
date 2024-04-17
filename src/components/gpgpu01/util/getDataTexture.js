import * as THREE from "three";

export default function getDataTexture(size) {
  let number = size * size;
  const data = new Float32Array(4 * number);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const idx = i * size + j;

      data[4 * idx] = 6 * (i / size - 0.5);
      data[4 * idx + 1] = 6 * (j / size - 0.5);
      data[4 * idx + 2] = 0;
      data[4 * idx + 3] = 0;
    }
  }

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType,
  );

  dataTexture.needsUpdate = true;

  return dataTexture;
}
