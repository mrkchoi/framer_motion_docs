import React, { useEffect, useRef } from "react";

import "./canvas01.css";

function Canvas01() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.reset();

    // ctx.fillStyle = "blue";
    // ctx.fillRect(100, 100, 400, 400);

    ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.rect(100, 100, 400, 400);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.arc(300, 300, 100, 0, Math.PI * 2);
    // ctx.stroke();

    const width = 60;
    const height = 60;
    const gap = 20;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let x = 100 + (width + gap) * i;
        let y = 100 + (height + gap) * j;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();

        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.rect(x + 8, y + 8, width - 16, height - 16);
          ctx.stroke();
        }
      }
    }
  }, []);

  return (
    <div className="canvas01__main">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="canvas01__canvas"
      ></canvas>
    </div>
  );
}

export default Canvas01;
