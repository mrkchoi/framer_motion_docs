import React from "react";

import "./textRotate3d.css";

const items = [
  "Imber",
  "Apricus",
  "Crepusculum",
  "Omnia",
  "Perrenius",
  "Aurora",
];

export default function TextRotate3d() {
  return (
    <div className="textRotate3d__main">
      <div className="textRotate3d__menu">
        {items.map((item, idx) => (
          <a
            key={idx}
            href="/"
            className="textRotate3d__menuItem"
            aria-label={item}
          >
            {Array.from({ length: 2 }).map((_, childIdx) => (
              <div key={childIdx} aria-hidden={childIdx > 0}>
                {item.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="textRotate3d__menuItemText"
                    style={{ "--index": charIdx }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </a>
        ))}
      </div>
    </div>
  );
}
