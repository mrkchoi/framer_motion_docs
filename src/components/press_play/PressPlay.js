import React, { useEffect, useRef } from "react";

import "./pressPlay.css";

const items = [
  { title: "Remy Martin x Lee Broom", color: "--yellow" },
  { title: "Hack Market", color: "--green" },
  { title: "Samaritaine", color: "--blue" },
  { title: "Astrology Club", color: "--red" },
  { title: "Play Your Power", color: "--yellow" },
  { title: "The Female Gaze", color: "--green" },
  { title: "Flea Tickets", color: "--blue" },
  { title: "Oney", color: "--red" },
  { title: "Dookey Dash", color: "--yellow" },
];

export default function PressPlay() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    console.log(marqueeRef.current.getBoundingClientRect());
  }, []);

  return (
    <div className="pressPlay__main">
      <div className="pressPlay__container">
        {items.map((item, idx) => (
          <div key={idx} className="pressPlay__item--outer">
            <div className="pressPlay__item--inner">
              <span className="pressPlay__title pressPlay__title--primary">
                {item.title}
              </span>
              <div
                ref={marqueeRef}
                className="pressPlay__titleSecondary--wrapper"
              >
                {Array.from({ length: 6 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="pressPlay__title pressPlay__title--secondary"
                    style={{ backgroundColor: `var(${item.color})` }}
                  >
                    {item.title}&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
