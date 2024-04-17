import React, { useRef } from "react";
import MeshImage from "./MeshImage";
import { useFrame } from "@react-three/fiber";

function Scene({ items, targetScroll, currentScroll }) {
  const groupRef = useRef(null);

  useFrame(() => {
    groupRef.current.rotation.z = 0.1;
  });

  return (
    <>
      <group ref={groupRef}>
        {items.map((item, idx) => {
          const image = item.querySelector("img");
          return (
            <MeshImage
              key={idx}
              item={item}
              image={image}
              idx={idx}
              targetScroll={targetScroll}
              currentScroll={currentScroll}
            />
          );
        })}
      </group>
    </>
  );
}

export default Scene;
