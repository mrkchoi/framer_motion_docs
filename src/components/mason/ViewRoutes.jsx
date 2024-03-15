import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Poulsen from "./pages/Poulsen";
import TransitionWrapper from "./transition/TransitionWrapper";
import gsap from "gsap";

function ViewRoutes() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <TransitionWrapper
            onExit={() => {
              gsap.to(".mason__homeWrapper", {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
              });
            }}
            onEnter={() => {
              gsap.set(".mason__homeWrapper", { opacity: 0 });
              gsap.to(".mason__homeWrapper", {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
              });
            }}
            timeout={0}
          >
            <Home
              isInitialLoad={isInitialLoad}
              setIsInitialLoad={setIsInitialLoad}
              isLoaderComplete={isLoaderComplete}
              setIsLoaderComplete={setIsLoaderComplete}
            />
          </TransitionWrapper>
        }
      />
      <Route
        path="/poulsen"
        element={
          <TransitionWrapper
            onExit={() => {
              gsap.to(".poulsen__wrapper", {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
              });
            }}
            onEnter={() => {}}
            timeout={0}
          >
            <Poulsen />
          </TransitionWrapper>
        }
      />
    </Routes>
  );
}

export default ViewRoutes;
