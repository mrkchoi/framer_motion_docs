import React, { Suspense } from "react";
import ZajnoCanvas from "./ZajnoCanvas";

import "./zajno.css";

function Zajno() {
  return (
    <div className="zajno__main">
      <Suspense fallback={null}>
        <ZajnoCanvas />
      </Suspense>
    </div>
  );
}

export default Zajno;
