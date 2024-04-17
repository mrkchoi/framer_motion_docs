import React from "react";
import MeshImage from "./MeshImage";

function Scene({ images, offset, directionX, directionY }) {
  return (
    <>
      {images.map((image, idx) => (
        <MeshImage
          key={idx}
          idx={idx}
          image={image}
          offset={offset}
          directionX={directionX}
          directionY={directionY}
        />
      ))}
    </>
  );
}

export default Scene;
