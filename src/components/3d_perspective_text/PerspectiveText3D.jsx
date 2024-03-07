import React, { useRef } from "react";
import "./perspectiveText3d.css";

export default function PerspectiveText3D() {
  const plane = useRef(null);
  const maxAngle = 45;

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const perspective = window.innerWidth * 4;
    const rotateX = maxAngle * x - maxAngle / 2;
    const rotateY = (maxAngle * y - maxAngle / 2) * -1;

    plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg ) rotateY(${rotateY}deg)`;
  };

  return (
    <div className="perspectiveText3D__body">
      <div
        ref={plane}
        className="perspectiveText3D__main"
        onMouseMove={handleMouseMove}
      >
        <div className="perspectiveText3D__container">
          <Text3D primary="Turning" secondary="Turning" />
          <Text3D primary="Spaces" secondary="Spaces" />
          <Text3D primary="Into" secondary="Into" />
          <Text3D primary="Shapes" secondary="Shapes" />
        </div>
      </div>
    </div>
  );
}

function Text3D({
  primary,
  secondary,
  primaryColor = "white",
  secondaryColor = "black",
}) {
  return (
    <div className="perspectiveText3D__item">
      <p
        className="perspectiveText3D__item--primary"
        style={{ color: primaryColor }}
      >
        {primary}
      </p>
      <p
        className="perspectiveText3D__item--secondary"
        style={{ color: secondaryColor }}
      >
        {secondary}
      </p>
    </div>
  );
}
