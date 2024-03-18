import React, { useEffect, useRef, useState } from "react";

function Math01() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () => {
      const side = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      setDimensions({
        width: side,
        height: side,
      });

      canvasRef.current.width = side;
      canvasRef.current.height = side;
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

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = height * 0.2;
    let angle = 0;
    const numObjects = 20;
    let slice = (Math.PI * 2) / numObjects;

    context.clearRect(0, 0, width, height);

    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.lineWidth = 1;

    for (let i = 0; i < numObjects; i++) {
      let x = centerX + Math.cos(angle) * radius;
      let y = centerY + Math.sin(angle) * radius;
      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2, false);
      context.fill();
      context.stroke();
      angle += slice;
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <canvas ref={canvasRef} className="border"></canvas>
    </div>
  );
}

export default Math01;
