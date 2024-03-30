import MeshImage from "./MeshImage";

function Scene({ images }) {
  return (
    <>
      {images.map((image, idx) => (
        <MeshImage key={idx} image={image} />
      ))}
    </>
  );
}

export default Scene;
