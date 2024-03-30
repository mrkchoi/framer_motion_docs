import React, { forwardRef } from "react";
import CustomEffect from "./CustomEffect";

export default forwardRef(function CustomEffectPass(props, ref) {
  const effect = new CustomEffect(props);

  return <primitive ref={ref} object={effect} />;
});
