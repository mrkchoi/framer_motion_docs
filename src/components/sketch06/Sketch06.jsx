import React, { useEffect, useRef, useState } from "react";
import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import Lenis from "@studio-freight/lenis";

const mouse = { x: 0, y: 0 };

function Sketch06() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      cancelAnimationFrame(animationRef.current);
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

    const flowField = new FlowFieldEffect(context, width, height);
    animationRef.current = flowField.animate(0);
  }, [dimensions]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="bg-black"
      ></canvas>
    </div>
  );
}

class FlowFieldEffect {
  #context;
  #width;
  #height;

  constructor(context, width, height) {
    this.#context = context;
    this.#context.lineWidth = 1;
    this.#width = width;
    this.#height = height;
    this.angle = 0;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
    this.cellSize = 15;
    this.gradient = this.#context.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height,
    );
    this.#createGradient();
    this.#context.strokeStyle = this.gradient;
    this.radius = 0;
    this.vr = 0.03;
  }

  #createGradient() {
    this.gradient = this.#context.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height,
    );
    this.gradient.addColorStop("0.1", "#ff5c33");
    this.gradient.addColorStop("0.2", "#ff66b3");
    this.gradient.addColorStop("0.4", "#ccccff");
    this.gradient.addColorStop("0.5", "#b3ffff");
    this.gradient.addColorStop("0.8", "#80ff80");
    this.gradient.addColorStop("0.9", "#ffff33");
  }

  #draw(x, y) {
    this.#context.beginPath();
    this.#context.moveTo(x, y);
    this.#context.lineTo(mouse.x, mouse.y);
    this.#context.stroke();
  }
  #drawLine(angle, x, y) {
    let positionX = x;
    let positionY = y;
    let dx = mouse.x - positionX;
    let dy = mouse.y - positionY;
    let distance = dx * dx + dy * dy;
    if (distance > 500000) {
      distance = 500000;
    } else if (distance < 50000) {
      distance = 50000;
    }

    const length = distance / 10000;
    this.#context.beginPath();
    this.#context.moveTo(x, y);
    // this.#context.lineTo(x + 5, y + 5);
    // this.#context.lineTo(mouse.x, mouse.y);
    this.#context.lineTo(
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length,
    );
    this.#context.stroke();
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    if (this.timer > this.interval) {
      this.timer = 0;
      this.#context.clearRect(0, 0, this.#width, this.#height);
      this.radius += this.vr;
      if (this.radius > 5 || this.radius < -5) {
        this.vr *= -1;
      }
      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          const angle =
            Math.cos(mouse.x * x * 0.00001) +
            Math.sin(mouse.y * y * 0.00001) +
            this.radius;
          this.#drawLine(angle, x, y);
        }
      }
    } else {
      this.timer += deltaTime;
    }
    return requestAnimationFrame(this.animate.bind(this));
  }
}

export default Sketch06;
