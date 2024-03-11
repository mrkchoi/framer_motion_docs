import React, { useEffect, useRef, useState } from "react";
import math from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

function CanvasStyles() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      canvasRef.current.width = Math.min(dimensions.width, dimensions.height);
      canvasRef.current.height = Math.min(dimensions.width, dimensions.height);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    context.globalAlpha = 0.25;
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "yellow";
    context.fillRect(0, 0, width / 2, height / 2);
    context.fillStyle = "green";
    context.fillRect(width / 2, 0, width / 2, height / 2);
    context.fillStyle = "blue";
    context.fillRect(0, height / 2, width / 2, height / 2);
    context.fillStyle = "red";
    context.fillRect(width / 2, height / 2, width / 2, height / 2);

    context.globalAlpha = 0.2;
    context.fillStyle = "white";
    for (let i = 0; i < 10; i++) {
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        (width / 18) * i,
        0,
        Math.PI * 2,
        true,
      );
      context.fill();
    }
  }, [dimensions]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <canvas
        ref={canvasRef}
        width={Math.min(window.innerWidth, window.innerHeight)}
        height={Math.min(window.innerWidth, window.innerHeight)}
      ></canvas>
    </div>
  );
}

export default CanvasStyles;
