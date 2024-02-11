import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import useScreenSize from "./util/useScreenSize";

function ImageMesh({ ...props }) {
  const [texture, setTexture] = useState(null);
  const [textureSize, setTextureSize] = useState({ width: 0, height: 0 });
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const [meshRef, setMeshRef] = useState(null);
  const viewRef = useRef(null);
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
        // console.error("Error loading texture: ", error);
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

  return (
    <View {...props} ref={viewRef}>
      <OrbitControls enableDamping={true} />
      <mesh ref={setMeshRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </View>
  );
}

export default ImageMesh;
