import React from "react";
import "./drei01.css";
import { Canvas } from "@react-three/fiber";
import DreiScene from "./DreiScene";

function Drei01() {
  return (
    <div className="drei__canvasContainer">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <DreiScene />
      </Canvas>
    </div>
  );
}

export default Drei01;
