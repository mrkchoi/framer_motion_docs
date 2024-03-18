import React, { useEffect, useRef } from "react";

function Math02() {
  const canvasRef = useRef(null);
  const circleAngleRef = useRef(0);
  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const resize = () => {
      const side = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      canvasRef.current.width = side;
      canvasRef.current.height = side;
    };
    resize();

    const mouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // let circleAngle = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let centerX = width / 2;
    let centerY = height / 2;
    let radius = height * 0.4;
    let speed = 0.01;

    const animate = () => {
      context.clearRect(0, 0, width, height);

      let arrowX = centerX + Math.cos(circleAngleRef.current) * radius;
      let arrowY = centerY + Math.sin(circleAngleRef.current) * radius;
      // calculate dx and dy from arrow to mouse while accounting for canvas position in relation to viewport
      let dx = mouseRef.current.x - arrowX;
      let dy = mouseRef.current.y - arrowY;
      dx -= canvas.getBoundingClientRect().left;
      dy -= canvas.getBoundingClientRect().top;

      let angle = Math.atan2(dy, dx);

      context.save();
      context.translate(arrowX, arrowY);
      context.rotate(angle);
      context.beginPath();
      context.strokeStyle = "black";
      context.lineWidth = 1;
      context.moveTo(20, 0);
      context.lineTo(-20, 0);
      context.moveTo(20, 0);
      context.lineTo(10, -10);
      context.moveTo(20, 0);
      context.lineTo(10, 10);
      context.stroke();
      context.restore();

      circleAngleRef.current += speed;
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

export default Math02;
