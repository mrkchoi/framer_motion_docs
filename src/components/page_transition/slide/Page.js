import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

export default function Page() {
  return (
    <div className="relative mx-auto flex h-screen w-screen flex-col items-center">
      <div className="navContainer container absolute top-0 mx-auto my-12">
        <ul className="flex gap-6">
          <li>
            <NavLink
              to={"/transition-slide/home"}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/transition-slide/about"}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/transition-slide/contact"}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mainContent h-screen w-screen">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="h-screen w-screen bg-orange-200 pt-24 text-black">
      <div className="container mx-auto">
        <h1 className="my-12 text-4xl font-bold">Home</h1>
        <div>
          <p className="my-4 max-w-[75vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
            cum ducimus, aperiam amet fugiat optio, rerum error vel quam
            voluptatum, maiores facilis harum. Adipisci corrupti maiores minus
            velit, numquam perferendis libero mollitia ducimus quia
            perspiciatis, id facilis, aut qui? Non saepe cumque illo, explicabo
            voluptatum facilis at voluptatibus libero.
          </p>
          <p className="my-4 max-w-[75vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
            cum ducimus, aperiam amet fugiat optio, rerum error vel quam
            voluptatum, maiores facilis harum. Adipisci corrupti maiores minus
            velit, numquam perferendis libero mollitia ducimus quia
            perspiciatis, id facilis, aut qui? Non saepe cumque illo, explicabo
            voluptatum facilis at voluptatibus libero.
          </p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="h-screen w-screen bg-yellow-200 pt-24 text-black">
      <div className="container mx-auto">
        <h1 className="my-12 text-4xl font-bold">About</h1>
        <div>
          <p className="my-4 max-w-[75vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
            cum ducimus, aperiam amet fugiat optio, rerum error vel quam
            voluptatum, maiores facilis harum. Adipisci corrupti maiores minus
            velit, numquam perferendis libero mollitia ducimus quia
            perspiciatis, id facilis, aut qui? Non saepe cumque illo, explicabo
            voluptatum facilis at voluptatibus libero.
          </p>
          <p className="my-4 max-w-[75vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
            cum ducimus, aperiam amet fugiat optio, rerum error vel quam
            voluptatum, maiores facilis harum. Adipisci corrupti maiores minus
            velit, numquam perferendis libero mollitia ducimus quia
            perspiciatis, id facilis, aut qui? Non saepe cumque illo, explicabo
            voluptatum facilis at voluptatibus libero.
          </p>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="h-screen w-screen bg-cyan-200 pt-24 text-black">
      <div className="container mx-auto">
        <h1 className="my-12 text-4xl font-bold">Contact</h1>
        <div>
          <p className="my-4 max-w-[75vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
            cum ducimus, aperiam amet fugiat optio, rerum error vel quam
            voluptatum, maiores facilis harum. Adipisci corrupti maiores minus
            velit, numquam perferendis libero mollitia ducimus quia
            perspiciatis, id facilis, aut qui? Non saepe cumque illo, explicabo
            voluptatum facilis at voluptatibus libero.
          </p>
          <p className="my-4 max-w-[75vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
            cum ducimus, aperiam amet fugiat optio, rerum error vel quam
            voluptatum, maiores facilis harum. Adipisci corrupti maiores minus
            velit, numquam perferendis libero mollitia ducimus quia
            perspiciatis, id facilis, aut qui? Non saepe cumque illo, explicabo
            voluptatum facilis at voluptatibus libero.
          </p>
        </div>
      </div>
    </div>
  );
}
