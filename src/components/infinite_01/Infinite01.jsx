import React, { Suspense, useEffect, useRef, useState } from "react";

import "./infinite01.css";

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const scroll = {
  ease: 0.075,
  current: 0,
  target: 0,
  last: 0,
  position: 0,
  start: 0,
};

function Infinite01() {
  const listRef = useRef(null);
  const [direction, setDirection] = useState("up");

  // ANIMATION LOOP FOR SMOOTH SCROLL
  useEffect(() => {
    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

      if (scroll.current > scroll.last) {
        setDirection("up");
      } else {
        setDirection("down");
      }

      scroll.last = scroll.current;

      requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(update);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      scroll.target += e.deltaY;
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="infinite01__main">
      <div className="infinite01__listWrapper">
        <ul ref={listRef} className="infinite01__list">
          {Array.from({ length: 20 }).map((_, idx) => (
            <ListItem key={idx} idx={idx} direction={direction} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ListItem({ idx }) {
  const ref = useRef(null);
  const position = useRef({
    y: 0,
    offset: 0,
    isBefore: false,
    isAfter: false,
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    scroll.current = 0;
    scroll.target = 0;
    scroll.last = 0;
    position.current.offset = 0;

    const handleResize = () => {
      scroll.current = 0;
      scroll.target = 0;
      scroll.last = 0;
      position.current.offset = 0;
    };

    const handleWheel = (e) => {
      const list = document.querySelector(".infinite01__list");
      const listHeight = list.getBoundingClientRect().height;

      let direction = e.deltaY > 0 ? "up" : "down";

      if (direction === "up" && position.current.isBefore) {
        position.current.offset -= listHeight;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }

      if (direction === "down" && position.current.isAfter) {
        position.current.offset += listHeight;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const amount = -(scroll.current + position.current.offset);
      setAmount(amount);

      position.current.isBefore = rect.bottom < 0;
      position.current.isAfter = rect.top > window.innerHeight;

      ref.current.style.transform = `translate3d(0, ${amount}px, 0)`;

      requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(update);
  }, []);

  return (
    <li ref={ref} className="infinite01__listItem">
      <span className="infinite01__listItemText">
        {idx + 1}:{Math.round(amount)}
      </span>
    </li>
  );
}

export default Infinite01;
