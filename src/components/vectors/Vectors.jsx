import { useEffect } from "react";
import Vector from "./vector";

function Vectors() {
  useEffect(() => {
    const v1 = new Vector(10, 5);
    console.log(v1.getLength());
    const v2 = v1.multiply(2);
    console.log(v2.getLength());
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      Vector (2D) class in source code
    </div>
  );
}

export default Vectors;
