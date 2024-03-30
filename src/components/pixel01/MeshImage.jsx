import { useFrame, extend } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { shaderMaterial } from "@react-three/drei";

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

function MeshImage({ image }) {
  const mouseRef = useRef({
    viewport: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  });
  const prevPositionRef = useRef({ x: 0, y: 0 });
  const isEnteredRef = useRef(false);
  const meshRef = useRef(null);
  const cellCountRef = useRef(40);
  const easeFactorRef = useRef(0.075);
  const aberrationIntensityRef = useRef(0.0);
  const prevScrollPositionRef = useRef(window.scrollY);

  const imageTexture = useMemo(() => {
    return new THREE.TextureLoader().load(image.src);
  }, [image.src]);
  const scrollBarWidth = useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  // Mousemove - Global Viewport Cursor Coords
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.viewport.x = e.clientX;
      mouseRef.current.viewport.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Mousemove - Update Shader Params
  useEffect(() => {
    // Helper functions
    const getDifference = (val1, val2) => {
      return val1 - val2;
    };
    const getAberrationIntensity = (dx, dy, factor) => {
      const velocity = Math.sqrt(dx * dx + dy * dy);
      return Math.min(1, velocity * factor);
    };

    const onMouseMove = (e) => {
      const { width, height, top, left } = image.getBoundingClientRect();

      // Only update shader values on hovered
      if (
        mouseRef.current.viewport.x > left &&
        mouseRef.current.viewport.x < left + width &&
        mouseRef.current.viewport.y > top &&
        mouseRef.current.viewport.y < top + height
      ) {
        // if scroll difference passes threshold, reset currentMouse === targetMouse to avoid jank
        let dx, dy;
        if (Math.abs(window.scrollY - prevScrollPositionRef.current) > 100) {
          mouseRef.current.current.x = mouseRef.current.target.x =
            (e.clientX - left) / width;
          mouseRef.current.current.y = mouseRef.current.target.y =
            (e.clientY - top) / height;
          prevPositionRef.current = { ...mouseRef.current.target };
          dx = getDifference(
            mouseRef.current.target.x,
            prevPositionRef.current.x,
          );
          dy = getDifference(
            mouseRef.current.target.y,
            prevPositionRef.current.y,
          );
        } else {
          prevPositionRef.current = { ...mouseRef.current.target };

          mouseRef.current.target.x = (e.clientX - left) / width;
          mouseRef.current.target.y = (e.clientY - top) / height;
          dx = getDifference(
            mouseRef.current.target.x,
            prevPositionRef.current.x,
          );
          dy = getDifference(
            mouseRef.current.target.y,
            prevPositionRef.current.y,
          );
        }
        // Set RGB shift intensity based on mouse velocity
        aberrationIntensityRef.current = getAberrationIntensity(dx, dy, 200);
        prevScrollPositionRef.current = window.scrollY;

        // Set hovered uniform for edge case when mouseenter event is not triggered (i.e. when user is already hovered over mesh on load)
        if (
          meshRef.current &&
          meshRef.current.material.uniforms.uHovered.value !== 1
        ) {
          meshRef.current.material.uniforms.uHovered.value = 1;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [image]);

  useFrame(({ clock }) => {
    const { width, height, top, left } = image.getBoundingClientRect();

    if (meshRef.current) {
      // Sync mesh with DOM image position/scale
      meshRef.current.position.x =
        left - (window.innerWidth - scrollBarWidth) / 2 + width / 2;
      meshRef.current.position.y = -top + window.innerHeight / 2 - height / 2;
      meshRef.current.scale.x = width;
      meshRef.current.scale.y = height;

      // if cursor position is within the mesh position, set uHovered to 1 via gsap, otherwise, set uHovered to 0. This smoothly transitions hover effect
      if (
        mouseRef.current.viewport.x > left &&
        mouseRef.current.viewport.x < left + width &&
        mouseRef.current.viewport.y > top &&
        mouseRef.current.viewport.y < top + height
      ) {
        if (!isEnteredRef.current) {
          isEnteredRef.current = true;
          handleMouseEnter();
        }
      } else {
        if (isEnteredRef.current) {
          isEnteredRef.current = false;
          handleMouseLeave();
        }
      }

      mouseRef.current.current.x = lerp(
        mouseRef.current.current.x,
        mouseRef.current.target.x,
        easeFactorRef.current,
      );
      mouseRef.current.current.y = lerp(
        mouseRef.current.current.y,
        mouseRef.current.target.y,
        easeFactorRef.current,
      );

      meshRef.current.material.uniforms.uMouse.value.set(
        mouseRef.current.current.x,
        1.0 - mouseRef.current.current.y,
      );
      meshRef.current.material.uniforms.uPrevMouse.value.set(
        prevPositionRef.current.x,
        1.0 - prevPositionRef.current.y,
      );

      aberrationIntensityRef.current = Math.max(
        0,
        aberrationIntensityRef.current - 0.05,
      );
      meshRef.current.material.uniforms.uAberrationIntensity.value =
        aberrationIntensityRef.current;
    }
  });

  const handleMouseEnter = () => {
    const { width, height, top, left } = image.getBoundingClientRect();
    mouseRef.current.current.x = mouseRef.current.target.x =
      (mouseRef.current.viewport.x - left) / width;
    mouseRef.current.current.y = mouseRef.current.target.y =
      (mouseRef.current.viewport.y - top) / height;
    prevPositionRef.current = { ...mouseRef.current.target };
    gsap.to(meshRef.current.material.uniforms.uHovered, {
      value: 1,
      duration: 1,
      ease: "expo.out",
    });
  };

  const handleMouseLeave = () => {
    mouseRef.current.target = { ...prevPositionRef.current };
    gsap.to(meshRef.current.material.uniforms.uHovered, {
      value: 0,
      duration: 1,
      ease: "expo.out",
    });
  };

  useEffect(() => {
    const { width, height } = image.getBoundingClientRect();
    const isShift = Number(image.getAttribute("data-shift")) ?? 1;

    if (meshRef.current) {
      meshRef.current.material.uniforms.uImageNaturalSize.value.set(
        image.naturalWidth,
        image.naturalHeight,
      );
      meshRef.current.material.uniforms.uImageRenderedSize.value.set(
        width,
        height,
      );
      meshRef.current.material.uniforms.uAberration.value = isShift ? 1 : 0;
    }

    const handleResize = () => {
      const gridSize = Math.ceil(window.innerWidth / cellCountRef.current); // 40 grid cells per row

      meshRef.current.material.uniforms.uGridCount.value.set(
        Math.ceil(width / gridSize),
        Math.ceil(height / gridSize),
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [image]);

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <pixel01ShaderMaterial
        key={Pixel01ShaderMaterial.key}
        uTexture={imageTexture}
      />
    </mesh>
  );
}

const Pixel01ShaderMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uImageNaturalSize: new THREE.Vector2(0, 0),
    uImageRenderedSize: new THREE.Vector2(0, 0),
    uHovered: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uPrevMouse: new THREE.Vector2(0.5, 0.5),
    uAberrationIntensity: 0.0,
    uGridCount: new THREE.Vector2(0, 0),
    uAberration: 1,
  },
  /* Vertex Shader */
  /* GLSL */
  `    
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* Fragment Shader */
  /* GLSL */
  `
    uniform sampler2D uTexture;
    uniform vec2 uImageNaturalSize;
    uniform vec2 uImageRenderedSize;
    uniform float uHovered;
    uniform vec2 uMouse;
    uniform vec2 uPrevMouse;
    uniform float uAberrationIntensity;
    uniform float uAberration;
    uniform vec2 uGridCount;

    varying vec2 vUv;



    // ASPECT RATIO CORRECTION (background-size: cover equivalent)
    vec2 getUV(vec2 uv, vec2 uTextureSize, vec2 uPlaneResolution){
      vec2 tempUV = uv - vec2(0.5);
      float planeAspect = uPlaneResolution.x / uPlaneResolution.y;
      float textureAspect = uTextureSize.x / uTextureSize.y;
      if (planeAspect < textureAspect) {
        tempUV = tempUV * vec2(planeAspect / textureAspect, 1.0);
      } else {
        tempUV = tempUV * vec2(1.0, textureAspect / planeAspect);
      }
      tempUV += vec2(0.5);
      return tempUV;
    }
    
    float gamma = 2.2;
    // GAMMA CORRECTION (image texture)
    vec4 colorCorrection(vec4 color, float gamma) {
      return pow(color, vec4(1.0 / gamma));
    }

    // GRAYSCALE
    vec3 grayScale(vec3 color, float str) {
      float g = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(color, vec3(g), str);
    }

    void main() {
      vec2 gridUV = floor(vUv * vec2(uGridCount.x, uGridCount.y)) / vec2(uGridCount.x, uGridCount.y);
      vec2 centerOfPixel = gridUV + vec2(1.0/uGridCount.x, 1.0/uGridCount.y);
      
      vec2 mouseDirection = uMouse - uPrevMouse;
      
      vec2 pixelToMouseDirection = centerOfPixel - uMouse;
      float pixelDistanceToMouse = length(pixelToMouseDirection);
      float strength = smoothstep(0.5, 0.0, pixelDistanceToMouse);

      vec2 uvOffset = strength * -mouseDirection * 0.4;
      vec2 uv = vUv - uvOffset;

      vec4 colorR = texture2D(uTexture, uv + vec2(strength * uAberrationIntensity * 0.01 * uAberration, 0.0));
      vec4 colorG = texture2D(uTexture, uv);
      vec4 colorB = texture2D(uTexture, uv - vec2(strength * uAberrationIntensity * 0.01 * uAberration, 0.0));

      colorR = colorCorrection(colorR, gamma);
      colorG = colorCorrection(colorG, gamma);
      colorB = colorCorrection(colorB, gamma);

      vec3 color = vec3(colorR.r, colorG.g, colorB.b);
      color = grayScale(color, 1.0 - uHovered);

      gl_FragColor = vec4(color, 1.0);
  }
  `,
);

extend({ Pixel01ShaderMaterial });

export default MeshImage;
