import React, { Suspense, useState } from "react";
import Scene from "./Scene";
import Lenis from "@studio-freight/lenis";
import { addEffect } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";

import "./yuri02.css";
import ImageMeshWrapper from "./ImageMeshWrapper";

const lenis = new Lenis();
addEffect((t) => lenis.raf(t));

// const Loader = () => {
//   const { active, progress, errors, item, loaded, total } = useProgress();
//   console.log("progress: ", progress);
//   console.log("loaded: ", loaded);
//   return (
//     <div className="yuri02__loader">
//       <div className="yuri02__loader--spinner">{progress}</div>
//     </div>
//   );
// };

function Yuri02() {
  const [effectType, _] = useState(0);

  return (
    <div className="yuri02__main">
      <Scene />
      <div className="yuri02__intro">
        <h1 className="yuri02__headerTitle">Revealing WebGL Images</h1>
      </div>
      <div className="yuri02__spacer"></div>
      <main className="yuri02__grid">
        <figure
          className="yuri02__item"
          style={{
            "--r": 1,
            "--c": 1,
            "--s": 4,
          }}
        >
          <div className="yuri02__item--imgWrapper">
            <ImageMeshWrapper
              url="./textures/yuri02/1.jpg"
              type={effectType}
              className="yuri02__item--imgGL"
            />
          </div>
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 2,
            "--c": 5,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/2.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 3,
            "--c": 3,
            "--s": 2,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/3.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 4,
            "--c": 1,
            "--s": 2,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/4.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 5,
            "--c": 3,
            "--s": 5,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/5.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 6,
            "--c": 8,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/6.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 7,
            "--c": 5,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/7.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 8,
            "--c": 2,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/8.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 9,
            "--c": 1,
            "--s": 6,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/9.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 10,
            "--c": 7,
            "--s": 4,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/10.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 11,
            "--c": 4,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/11.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 12,
            "--c": 1,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/12.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri02__item"
          style={{
            "--r": 13,
            "--c": 4,
            "--s": 6,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri02/13.jpg"
            type={effectType}
            className="yuri02__item--imgGL"
          />
          <figcaption className="yuri02__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
      </main>
      <div className="yuri02__spacerBottom"></div>
    </div>
  );
}

export default Yuri02;
