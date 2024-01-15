import React from "react";
import "./infinite_marquee.css";

// NOTE:
// Gap between words in marquee row must match gap in keyframes animation transform calculation to prevent inconsistent spacing on infinite loop

export default function InfiniteMarquee() {
  return (
    <div className="flex h-screen flex-col justify-center">
      <InfiniteMarqueeRow
        direction="left"
        speed="27s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Infinite", outline: true },
          { text: "Scroll", outline: false },
          { text: "Example", outline: true },
          { text: "End", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="right"
        speed="50s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Testing", outline: true },
          { text: "Second", outline: false },
          { text: "Row", outline: true },
          { text: "Start", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="left"
        speed="15s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Frontend", outline: true },
          { text: "Engineer", outline: false },
          { text: "Javascript", outline: true },
          { text: "Expert", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="left"
        speed="50s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Christine", outline: true },
          { text: "Choi", outline: false },
          { text: "Visual", outline: true },
          { text: "Designer", outline: false },
        ]}
      />
      <InfiniteMarqueeRow
        direction="left"
        speed="15s"
        fontWeight="bold"
        fontSize="10rem"
        lineHeight="9rem"
        uppercase={false}
        content={[
          { text: "Frontend", outline: true },
          { text: "Engineer", outline: false },
          { text: "Javascript", outline: true },
          { text: "Expert", outline: false },
        ]}
      />
    </div>
  );
}

function InfiniteMarqueeRow({
  direction = "left",
  speed = "27s",
  fontWeight = "bold",
  fontSize = "10rem",
  lineHeight = "12rem",
  content = [
    { text: "Frontend", outline: true },
    { text: "Engineer", outline: false },
    { text: "Javascript", outline: true },
    { text: "Expert", outline: false },
  ],
  uppercase = false,
  bgColor = "transparent",
  gap = "4rem",
}) {
  return (
    <div className="marquee" style={{ backgroundColor: bgColor }}>
      {Array.from({ length: 2 }).map((_, idx) => (
        <div
          key={idx}
          className="marquee__content"
          style={{
            animation: `${
              direction === "right" ? "scrollRight" : "scrollLeft"
            } ${speed} linear infinite`,
            lineHeight: lineHeight,
          }}
        >
          {content.map((data, idx) => {
            return (
              <span
                key={idx}
                style={{
                  fontWeight,
                  fontSize,
                  lineHeight,
                }}
                className={data.outline ? "isOutline" : ""}
              >
                {uppercase ? data.text.toUpperCase() : data.text}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// function InfiniteRightMarquee() {
//   return (
//     <div className="marquee">
//       <div className="marquee__content animateRight">
//         <span className="text-10xl font-bold">Javascript</span>
//         <span className="isOutline text-10xl font-bold">React</span>
//         <span className="text-10xl font-bold">Tailwind</span>
//         <span className="isOutline text-10xl font-bold ">Next.js</span>
//       </div>
//       <div className="marquee__content animateRight">
//         <span className="text-10xl font-bold">Javascript</span>
//         <span className="isOutline text-10xl font-bold">React</span>
//         <span className="text-10xl font-bold">Tailwind</span>
//         <span className="isOutline text-10xl font-bold ">Next.js</span>
//       </div>
//     </div>
//   );
// }
