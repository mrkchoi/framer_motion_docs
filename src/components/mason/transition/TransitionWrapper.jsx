import React, { useRef } from "react";
import { Transition, SwitchTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

function TransitionWrapper({ children, onExit, onEnter, timeout }) {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <Transition
        nodeRef={nodeRef}
        key={location.pathname}
        timeout={timeout}
        onExit={onExit}
        onEnter={onEnter}
      >
        <div ref={nodeRef} className="mason__pageWrapper">
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
}

export default TransitionWrapper;
