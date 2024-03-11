import React, { useEffect, useRef, useState } from "react";
import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
// import { useTweaks, usePaneInput } from "use-tweaks";

function Sketch04() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // const pane = useTweaks({
  //   cols: { value: 10, min: 2, max: 50 },
  //   rows: { value: 10, min: 2, max: 50 },
  // });

  // const [cols, setCols] = usePaneInput(pane, "cols", 10);
  // const [rows, setRows] = usePaneInput(pane, "rows", 10);

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
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 20;
    const rows = 20;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const marginx = (width - gridw) * 0.5;
    const marginy = (height - gridh) * 0.5;

    let prev = Date.now();

    function animate() {
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      let delta = Date.now() - prev;

      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = col * cellw;
        const y = row * cellh;

        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const noise = random.noise2D(x + delta * 0.1, y + delta * 0.15, 0.001);
        // const noise = random.noise3D(x, y, delta * 0.2, 0.001);
        const angle = noise * Math.PI * 0.2;
        const scale = math.mapRange(noise, -1, 1, 1, 30);

        context.save();
        context.translate(x, y);
        context.translate(marginx, marginy);
        context.translate(cellw * 0.5, cellh * 0.5);
        context.rotate(angle);

        context.lineWidth = scale;
        context.lineCap = "square";

        context.beginPath();
        context.moveTo(w * 0.5, 0);
        context.lineTo(w * -0.5, 0);
        context.stroke();

        context.restore();
      }
      // prev = Date.now();
      requestAnimationFrame(animate);
    }

    // function createPane() {
    //   const pane = new Pane();
    //   const c = pane.addBinding(params, "cols", {
    //     min: 2,
    //     max: 50,
    //     step: 1,
    //   });
    //   const r = pane.addBinding(params, "rows", {
    //     min: 2,
    //     max: 50,
    //     step: 1,
    //   });
    //   c.on("change", (value) => {
    //     setParams({ ...params, cols: value });
    //   });
    //   r.on("change", (value) => {
    //     setParams({ ...params, rows: value });
    //   });
    // }

    // createPane();
    animate();
  }, [dimensions]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <canvas
        className="border"
        ref={canvasRef}
        width={Math.min(window.innerWidth, window.innerHeight)}
        height={Math.min(window.innerWidth, window.innerHeight)}
      ></canvas>
    </div>
  );
}

export default Sketch04;
