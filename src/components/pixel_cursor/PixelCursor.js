import React, { useEffect, useState } from "react";
import "./pixelCursor.css";

export default function PixelCursor() {
  const [windowSize, setWindowSize] = useState({
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const getWindowSize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowSize({ innerHeight, innerWidth });
    };
    getWindowSize();
    window.addEventListener("resize", getWindowSize);
    return () => window.removeEventListener("resize", getWindowSize);
  }, []);

  return (
    <div className="mainParent relative flex h-screen w-screen items-center justify-center overflow-hidden bg-white">
      <div className="content p-6">
        <p className="max-w-[1000px] text-center text-8xl font-bold uppercase">
          We specialize in turning space into complex shapes
        </p>
      </div>
      <div className="bgContainer absolute flex overflow-hidden">
        {Array.from({ length: 20 }).map((_, col) => (
          <Row key={col} windowSize={windowSize} />
        ))}
      </div>
    </div>
  );
}

function Row({ windowSize }) {
  const { innerHeight, innerWidth } = windowSize;
  const blockSize = innerWidth * 0.05;
  const numBlocks = Math.ceil(innerHeight / blockSize);

  const colorize = (e) => {
    e.target.style.backgroundColor = "black";
    setTimeout(() => {
      e.target.style.backgroundColor = "transparent";
    }, 300);
  };

  return (
    <div className="w-[5vw]">
      {Array.from({ length: numBlocks }).map((_, row) => (
        <div
          key={row}
          className="h-[5vw] w-full transition-all duration-200"
          onMouseEnter={(e) => colorize(e)}
        ></div>
      ))}
    </div>
  );
}
