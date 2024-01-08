import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TabsFruit() {
  const [selectedTab, setSelectedTab] = useState(ingredients[0]);
  return (
    <div className="flex h-screen w-full items-center justify-center bg-purple-300">
      <div className="tabsfruit_container flex flex-col rounded-lg bg-white">
        <nav>
          <ul className="flex p-[.1rem]">
            {ingredients.map((item) => (
              <motion.li
                key={item.icon}
                className={[
                  "relative  flex-1 cursor-pointer rounded-t-lg py-2 text-center text-sm",
                  selectedTab === item ? "bg-gray-200" : "",
                ].join(" ")}
                onClick={() => setSelectedTab(item)}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
                {selectedTab === item ? (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-purple-700"
                    layoutId="underline"
                  ></motion.div>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </nav>
        <AnimatePresence mode="wait">
          <motion.main
            key={selectedTab ? selectedTab.label : "empty"}
            className="flex items-center justify-center px-32 py-16 text-9xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.icon}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}

const ingredients = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
  // { icon: "🥕", label: "Carrot" },
  // { icon: "🍌", label: "Banana" },
  // { icon: "🫐", label: "Blueberries" },
  // { icon: "🥂", label: "Champers?" },
];
