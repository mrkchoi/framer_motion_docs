import React, { useRef } from "react";
import { Transition, SwitchTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const ref = useRef(null);

  return (
    <SwitchTransition>
      <Transition
        nodeRef={ref}
        key={location.pathname}
        timeout={1000}
        onEnter={() => {
          const node = ref.current;
          gsap.set(node, { autoAlpha: 0, scale: 0.9, xPercent: -100 });
          gsap
            .timeline({ paused: true, defaults: { ease: "power4.inOut" } })
            .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.5 })
            .to(node, { scale: 1, duration: 0.5 })
            .play();
        }}
        onExit={() => {
          const node = ref.current;
          gsap
            .timeline({ paused: true, defaults: { ease: "power4.inOut" } })
            .to(node, { scale: 0.9, duration: 0.5 })
            .to(node, {
              xPercent: 100,
              autoAlpha: 0,
              duration: 0.7,
            })
            .play();
        }}
      >
        <div ref={ref} className="transition01__viewWrapper">
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionWrapper;
