import { useEffect } from "react";
import "./parallax.css";
import Lenis from "@studio-freight/lenis";
import Page from "./Page";

function Layout() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-auto w-screen bg-[#ccc]">
      <div className="parallax container mx-auto">
        <Page />
        <Page />
        <Page />
        <Page />
      </div>
    </div>
  );
}

export default Layout;
