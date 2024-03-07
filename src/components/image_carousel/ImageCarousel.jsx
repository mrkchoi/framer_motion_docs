import { motion, AnimatePresence, wrap } from "framer-motion";
import React, { useState } from "react";

export const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function ImageCarousel() {
  const [[idx, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([idx + newDirection, newDirection]);
  };

  const imageIdx = wrap(0, images.length, idx);

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#111]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={idx}
          src={images[imageIdx]}
          alt=""
          variants={variants}
          custom={direction}
          className="absolute z-10 w-full"
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div
        className="absolute left-0 z-20 flex h-12 w-12 translate-x-2 scale-[-1] cursor-pointer items-center justify-center rounded-full bg-white text-2xl"
        onClick={() => paginate(-1)}
      >
        <span className="relative -top-[.1rem]">‣</span>
      </div>
      <div
        className="absolute right-0 z-20 flex h-12 w-12 -translate-x-2 cursor-pointer items-center justify-center rounded-full bg-white text-2xl"
        onClick={() => paginate(1)}
      >
        <span className="relative -top-[.1rem]">‣</span>
      </div>
    </div>
  );
}
