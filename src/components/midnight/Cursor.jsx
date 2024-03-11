import React, { useEffect, useRef } from "react";
import "./midnight.css";

let points = [];
let segments = 100;
let mouse = { x: 0, y: 0 };

function Cursor() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      mouse.x = x;
      mouse.y = y;

      if (points.length === 0) {
        for (let i = 0; i < segments; i++) {
          points.push({
            x: x,
            y: y,
          });
        }
      }

      points = points.slice(points.length - 20);
    };

    const animate = () => {
      const path = pathRef.current;
      if (!path) return;

      let px = mouse.x;
      let py = mouse.y;

      points.forEach((p, idx) => {
        p.x = px;
        p.y = py;

        let n = points[idx + 1];

        if (n) {
          px = px - (p.x - n.x) * 0.6;
          py = py - (p.y - n.y) * 0.6;
        }
      });

      path.setAttribute(
        "d",
        `M ${
          points.length
            ? points
                .map((point) => {
                  return `${point.x} ${point.y}`;
                })
                .join(" L ")
            : "200 200"
        }`,
      );
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      // set svg viewBox and width and height to match window
      if (!svgRef.current) return;
      svgRef.current.setAttribute(
        "viewBox",
        `0 0 ${window.innerWidth} ${window.innerHeight}`,
      );
      svgRef.current.setAttribute("width", window.innerWidth);
      svgRef.current.setAttribute("height", window.innerHeight);
    };

    handleResize();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <svg ref={svgRef} className="midnight__cursorSvg" viewBox="0 0 1 1">
      <path ref={pathRef} d="M 100 100 L 200 200"></path>
    </svg>
  );
}

export default Cursor;
