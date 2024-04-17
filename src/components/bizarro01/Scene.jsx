import React from "react";
import MeshImage from "./MeshImage";

function Scene({ images, scrollCurrent, scrollLast, direction }) {
  // console.log(direction);
  return (
    <>
      {images.map((item, idx) => (
        <MeshImage
          key={idx}
          src={item.src}
          text={item.text}
          idx={idx}
          count={images.length}
          scrollCurrent={scrollCurrent}
          scrollLast={scrollLast}
          direction={direction}
        />
      ))}
    </>
  );
}

export default Scene;
