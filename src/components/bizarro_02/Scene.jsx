import React from "react";
import MeshImage from "./MeshImage";

function Scene({ items }) {
  return (
    <>
      {items.map((item, idx) => {
        const image = item.querySelector("img");
        return <MeshImage key={idx} item={item} image={image} idx={idx} />;
      })}
    </>
  );
}

export default Scene;
