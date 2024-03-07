import React from "react";
import "./text3d.css";

export default function Text3D({
  primary = "Hover me",
  secondary = "Hover me",
  primaryColor = "black",
  secondaryColor = "gray",
  fontSize = "7rem",
  lineHeight = "7rem",
  fontWeight = "bold",
  offset = "3.5vw",
  speed = 400,
  textTransform = "none",
}) {
  return (
    <div
      className="perspectiveText3D__item"
      style={{ transition: `all ${speed}ms ease-in-out` }}
    >
      <p
        className="perspectiveText3D__item--primary"
        style={{
          color: primaryColor,
          fontSize,
          lineHeight,
          fontWeight,
          textTransform,
          transition: `all ${speed}ms ease-in-out`,
        }}
      >
        {primary}
      </p>
      <p
        className="perspectiveText3D__item--secondary"
        style={{
          color: secondaryColor,
          fontSize,
          lineHeight,
          fontWeight,
          textTransform,
          transform: `rotateX(-90deg) translateY(${offset})`,
          transition: `all ${speed}ms ease-in-out`,
        }}
      >
        {secondary}
      </p>
    </div>
  );
}
