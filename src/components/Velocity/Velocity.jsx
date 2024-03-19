import React, { useEffect, useRef, useState } from "react";
import Vector from "./vector";
import Particle from "./particle";

function Velocity() {
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
    const particles = [];

    for (let i = 0; i < 100; i++) {
      const x = width / 2;
      const y = height / 2;
      const speed = Math.random() * 3 + 1;
      const direction = Math.random() * Math.PI * 2;
      particles.push(new Particle(x, y, speed, direction));
    }
    // const particle = new Particle(100, 100, 3, Math.PI / 6);

    const animate = () => {
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(context);
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <canvas ref={canvasRef} className="border"></canvas>
    </div>
  );
}

export default Velocity;
