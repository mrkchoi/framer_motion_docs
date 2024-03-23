import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "./slider.css";

import img01 from "./assets/images/img01.avif";
import img02 from "./assets/images/img02.avif";
import img03 from "./assets/images/img03.avif";
import img04 from "./assets/images/img04.avif";
import img05 from "./assets/images/img05.avif";
import img06 from "./assets/images/img06.avif";

const IMAGES = [img01, img02, img03, img04, img05, img06];

function Slider() {
  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const isDragging = useRef(false);

  const startX = useRef(null);
  const startOffset = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderInner = sliderInnerRef.current;

    const clamp = (value, min, max) => {
      return Math.min(Math.max(value, min), max);
    };

    const mouseDown = (e) => {
      const sliderBounds = slider.getBoundingClientRect();
      const sliderInnerBounds = sliderInner.getBoundingClientRect();

      isDragging.current = true;
      startX.current = e.clientX;
      startOffset.current = sliderInnerBounds.left - sliderBounds.left;
      slider.style.cursor = "grabbing";
    };

    const mouseMove = (e) => {
      if (!isDragging.current) return;

      const sliderBounds = slider.getBoundingClientRect();
      const sliderInnerBounds = sliderInner.getBoundingClientRect();
      const diff = e.clientX - startX.current;

      const translateX = startOffset.current + diff;
      const clampedTranslateX = clamp(
        translateX,
        -sliderInnerBounds.width + sliderBounds.width,
        0,
      );

      const xTo = gsap.quickTo(sliderInner, "x", {
        duration: 0.1,
        ease: "none",
      });
      xTo(clampedTranslateX);
    };

    const mouseUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      slider.style.cursor = "grab";
    };

    slider.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <div className="slider__main">
      <div ref={sliderRef} className="slider__container">
        <div ref={sliderInnerRef} className="slider__inner">
          {IMAGES.map((img, index) => (
            <div key={index} className="slider__item">
              <img src={img} alt="" className="slider__img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
