import MeshImage from "./MeshImage";

function Scene({
  images,
  targetScroll,
  actualScroll,
  normalizedMouse,
  actualMouse,
}) {
  return (
    <>
      {images.map((image, idx) => (
        <MeshImage
          key={idx}
          image={image}
          idx={idx}
          targetScroll={targetScroll}
          actualScroll={actualScroll}
          normalizedMouse={normalizedMouse}
          actualMouse={actualMouse}
        />
      ))}
    </>
  );
}

export default Scene;
