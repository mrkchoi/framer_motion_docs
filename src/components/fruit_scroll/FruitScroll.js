import React from "react";
import { motion } from "framer-motion";

const food = [
  ["🍅", "red"],
  ["🍊", "orange"],
  ["🍋", "yellow"],
  ["🍐", "green"],
  ["🫐", "blue"],
  ["🍆", "purple"],
  ["🍇", "cyan"],
];

const variants = {
  offscreen: {
    y: 500,
  },
  onscreen: {
    y: 100,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};
export default function FruitScroll() {
  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center pt-24">
      <div className="flex h-[100vh] items-center justify-center">
        Scroll down...
      </div>
      {food.map(([emoji, color], idx) => {
        return (
          <motion.div
            key={idx}
            className="card_container relative flex w-full items-center justify-center"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.9, once: true }}
          >
            <motion.div
              className="z-10 flex h-[450px] w-[300px] items-center justify-center rounded-3xl border-2 bg-white text-[150px] shadow-xl"
              variants={variants}
            >
              {emoji}
            </motion.div>
            <div
              className={[
                "card_bg absolute bottom-0 left-0 right-0 top-0 w-full",
              ].join(" ")}
              style={{ backgroundColor: color }}
            ></div>
          </motion.div>
        );
      })}
    </div>
  );
}
