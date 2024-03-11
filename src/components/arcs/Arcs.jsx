import React, { useEffect, useRef } from "react";
import math from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

import "./arcs.css";

let dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function Arcs() {
  const canvasRef = useRef(null);

  const resize = () => {
    dimensions.width = window.innerWidth;
    dimensions.height = window.innerHeight;
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 40;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();

      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.lineWidth = random.range(5, 20);
      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(1, 5),
      );
      context.stroke();
      context.restore();
    }
  }, []);

  return (
    <div className="arcs__main">
      <canvas
        ref={canvasRef}
        width={Math.min(dimensions.width, dimensions.height)}
        height={Math.min(dimensions.width, dimensions.height)}
      ></canvas>
    </div>
  );
}

export default Arcs;
