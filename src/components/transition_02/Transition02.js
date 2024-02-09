import TransitionRoutes from "./routes/TransitionRoutes";

import "./styles/fonts.css";
import "./styles/transition02.css";

// reference: https://tympanus.net/Tutorials/CoverPageTransition/

function Transition02() {
  return (
    <div className="transition02__main">
      <TransitionRoutes />
      <div className="transition02__transitionOverlay">
        <div className="transition02__transitionOverlayInner transition02__transitionOverlayTop"></div>
        <div className="transition02__transitionOverlayInner transition02__transitionOverlayBottom"></div>
      </div>
    </div>
  );
}

export default Transition02;
