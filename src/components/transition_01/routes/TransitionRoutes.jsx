import { Routes, Route } from "react-router-dom";
import TransitionWrapper from "../TransitionWrapper";
import Home from "../views/Home";
import About from "../views/About";
import Contact from "../views/Contact";

export default function TransitionRoutes() {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <TransitionWrapper>
            <Home />
          </TransitionWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <TransitionWrapper>
            <About />
          </TransitionWrapper>
        }
      />
      <Route
        path="/contact"
        element={
          <TransitionWrapper>
            <Contact />
          </TransitionWrapper>
        }
      />
    </Routes>
  );
}
