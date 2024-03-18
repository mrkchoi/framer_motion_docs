import React, { useEffect, useRef, useState } from "react";

function Math00() {
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

    const animate = () => {
      context.clearRect(0, 0, width, height);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <canvas ref={canvasRef} className="border"></canvas>
    </div>
  );
}

export default Math00;
