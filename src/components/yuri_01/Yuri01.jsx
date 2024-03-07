// THIS CAN BE USED AS A TEMPLATE FOR FUTURE PROJECTS
// R3F, Drei, and Lenis

import React, { Suspense } from "react";
import Scene from "./Scene";
import Lenis from "@studio-freight/lenis";
import { addEffect } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";

import "./yuri01.css";
import ImageMeshWrapper from "./ImageMeshWrapper";

const lenis = new Lenis();
addEffect((t) => lenis.raf(t));

// const Loader = () => {
//   const { active, progress, errors, item, loaded, total } = useProgress();
//   console.log("progress: ", progress);
//   console.log("loaded: ", loaded);
//   return (
//     <div className="yuri01__loader">
//       <div className="yuri01__loader--spinner">{progress}</div>
//     </div>
//   );
// };

function Yuri01() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <div className="yuri01__main">
      <Scene />
      <div className="yuri01__intro">
        <h1 className="yuri01__headerTitle">Revealing WebGL Images</h1>
      </div>
      <div className="yuri01__spacer"></div>
      <main className="yuri01__grid">
        <figure
          className="yuri01__item"
          style={{
            "--r": 1,
            "--c": 1,
            "--s": 4,
          }}
        >
          <div className="yuri01__item--imgWrapper">
            <ImageMeshWrapper
              url="./textures/yuri01/1.jpg"
              type={0}
              className="yuri01__item--imgGL"
            />
          </div>
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 2,
            "--c": 5,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/2.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 3,
            "--c": 3,
            "--s": 2,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/3.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 4,
            "--c": 1,
            "--s": 2,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/4.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 5,
            "--c": 3,
            "--s": 5,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/5.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 6,
            "--c": 8,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/6.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 7,
            "--c": 5,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/7.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 8,
            "--c": 2,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/8.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 9,
            "--c": 1,
            "--s": 6,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/9.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 10,
            "--c": 7,
            "--s": 4,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/10.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 11,
            "--c": 4,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/11.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 12,
            "--c": 1,
            "--s": 3,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/12.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
        <figure
          className="yuri01__item"
          style={{
            "--r": 13,
            "--c": 4,
            "--s": 6,
          }}
        >
          <ImageMeshWrapper
            url="./textures/yuri01/13.jpg"
            type={0}
            className="yuri01__item--imgGL"
          />
          <figcaption className="yuri01__item--caption">
            <h3>Embrace of Heat</h3>
            <span>2023</span>
          </figcaption>
        </figure>
      </main>
      <div className="yuri01__spacerBottom"></div>
    </div>
  );
}

export default Yuri01;
