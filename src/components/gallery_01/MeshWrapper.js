import { useState, useRef, useEffect, useLayoutEffect, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PerspectiveCamera, OrbitControls, View } from "@react-three/drei";
import * as THREE from "three";
import useScreenSize from "./util/useScreenSize";
import ImageMesh from "./ImageMesh";

function MeshWrapper({ ...props }) {
  const [texture, setTexture] = useState(null);
  const [textureSize, setTextureSize] = useState({ width: 0, height: 0 });
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const [meshRef, setMeshRef] = useState(null);
  const viewRef = useRef(null);
  const imageRef = useRef(null);
  const screenSize = useScreenSize();

  useEffect(() => {
    new THREE.TextureLoader()
      .loadAsync(props.url)
      .then((texture) => {
        const bounds = viewRef.current.getBoundingClientRect();
        setTexture(texture);
        setTextureSize({
          width: bounds.width,
          height: bounds.height,
        });
        // console.log("bounds: ", bounds);
        // console.log("texture: ", texture);
      })
      .catch((error) => {
        console.error("Error loading texture: ", error);
      });
  }, [props.url]);

  useEffect(() => {
    if (meshRef) {
      meshRef.scale.set(textureSize.width, textureSize.height, 1);
    }
  }, [meshRef]);

  useLayoutEffect(() => {
    if (meshRef) {
      let bounds = viewRef.current.getBoundingClientRect();
      setElementSize({ width: bounds.width, height: bounds.height });
      meshRef.scale.set(textureSize.width, textureSize.height, 1);
    }
  }, []);

  useEffect(() => {
    if (meshRef) {
      let bounds = viewRef.current.getBoundingClientRect();
      setElementSize({ width: bounds.width, height: bounds.height });
      meshRef.scale.set(textureSize.width, textureSize.height, 1);
    }
  }, [screenSize]);

  const hideDOMImage = () => {
    // imageRef.current.classList.add("yuri01__item--img--hidden");
  };

  return (
    <>
      <Suspense fallback={null}>
        <View {...props} ref={viewRef}>
          {/* <OrbitControls enableDamping={true} /> */}
          <ImageMesh
            texture={texture}
            textureSize={textureSize}
            elementSize={elementSize}
            setMeshRef={setMeshRef}
            meshRef={meshRef}
            hideDOMImage={hideDOMImage}
          />
        </View>
      </Suspense>
      <span className="gallery01__cardInner">'test content'</span>
    </>
  );
}

export default MeshWrapper;
