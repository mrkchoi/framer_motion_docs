import { useEffect, useRef } from "react";
// import { useDraggable } from "react-use-draggable-scroll";
import randomColor from "randomcolor";
import Lenis from "@studio-freight/lenis";
import "./gallery01.css";
import Scene from "./Scene";
import MeshWrapper from "./MeshWrapper";

function Gallery01() {
  const stickySectionRef = useRef(null);
  const scrollSectionRef = useRef(null);
  // const { events } = useDraggable(ref);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // const stickySections = [
    //   ...document.querySelectorAll(".hybridScroll__sticky"),
    // ];

    const handleScroll = () => {
      // console.log("inside handleScroll");
      const section = stickySectionRef.current;
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = scrollSectionRef.current;
      let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      // percentage = percentage < 0 ? 0 : percentage > 900 ? 900 : percentage;
      scrollSection.style.transform = `translate3d(-${percentage}vw,0,0)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="gallery01__main">
      <Scene />
      <div className="gallery01__stickyParent">
        <div ref={stickySectionRef} className="gallery01__sticky">
          <div ref={scrollSectionRef} className="gallery01__stickySection">
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
            <div className="gallery01__card">
              <MeshWrapper
                url="./textures/yuri01/1.jpg"
                className="gallery01__cardGL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery01;
