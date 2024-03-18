import React from "react";
import MeshImage from "./MeshImage";

function Scene({ activeImg, imgOpacity, offset }) {
  return (
    <>
      <MeshImage
        activeImg={activeImg}
        imgOpacity={imgOpacity}
        offset={offset}
      />
    </>
  );
}

export default Scene;
