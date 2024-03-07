import { useState, useRef, useEffect, useLayoutEffect, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PerspectiveCamera, OrbitControls, View } from "@react-three/drei";
import * as THREE from "three";
import useScreenSize from "./util/useScreenSize";
import { useControls } from "leva";

import ImageMesh from "./ImageMesh";

const PIXELS = [
  1, 1.5, 2, 2.5, 3, 1, 1.5, 2, 2.5, 3, 3.5, 4, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5,
  6, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 20, 100,
].map((v) => v / 100);

function ImageMeshWrapper({ ...props }) {
  const { fillColor } = useControls({
    fillColor: "white",
  });
  const [texture, setTexture] = useState(null);
  const [textureSize, setTextureSize] = useState({ width: 0, height: 0 });
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const [meshRef, setMeshRef] = useState(null);
  // const [isIntersecting, setIsIntersecting] = useState(false);
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
      })
      .catch((error) => {
        console.error("Error loading texture: ", error);
      });
  }, [props.url]);

  // useGSAP(
  //   () => {
  //     if (meshRef?.material) {
  //       // console.log(meshRef);
  //       gsap.to(meshRef.material.uniforms, {
  //         uProgress: isIntersecting ? 1 : 0,
  //         duration: 1.5,
  //         ease: "none",
  //       });
  //     }
  //   },
  //   {
  //     dependencies: [isIntersecting, meshRef],
  //   },
  // );

  useEffect(() => {
    if (meshRef) {
      meshRef.scale.set(textureSize.width, textureSize.height, 1);
      meshRef.material.uniforms.uProgress = 0;
      meshRef.material.uType = props.type;
    }
  }, [meshRef, textureSize, props.type]);

  useLayoutEffect(() => {
    if (meshRef) {
      let bounds = viewRef.current.getBoundingClientRect();
      setElementSize({ width: bounds.width, height: bounds.height });
      meshRef.scale.set(textureSize.width, textureSize.height, 1);
      // const observer = new IntersectionObserver(([entry]) => {
      //   setIsIntersecting(entry.isIntersecting);
      // });
      // observer.observe(viewRef.current);
    }
  }, [meshRef]);

  useEffect(() => {
    if (meshRef) {
      let bounds = viewRef.current.getBoundingClientRect();
      setElementSize({ width: bounds.width, height: bounds.height });
      meshRef.scale.set(textureSize.width, textureSize.height, 1);
    }
  }, [screenSize]);

  const hideDOMImage = () => {
    imageRef.current.classList.add("yuri01__item--img--hidden");
  };

  return (
    <>
      <img
        ref={imageRef}
        alt=""
        src={props.url}
        className="yuri01__item--img"
      />
      <Suspense fallback={null}>
        <View {...props} ref={viewRef}>
          {/* <OrbitControls enableDamping={true} /> */}
          <ImageMesh
            uColor={new THREE.Color(fillColor)}
            texture={texture}
            uPixels={PIXELS}
            textureSize={textureSize}
            elementSize={elementSize}
            setMeshRef={setMeshRef}
            meshRef={meshRef}
            hideDOMImage={hideDOMImage}
          />
        </View>
      </Suspense>
    </>
  );
}

export default ImageMeshWrapper;
