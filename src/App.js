import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Stagger from "./components/Stagger";
import Intro from "./components/Intro";
import Examples from "./components/Examples";
import SidebarMenu from "./components/sidebar_menu/SidebarMenu";
import SlideBox from "./components/slide_box/SlideBox";

const PAGES = [
  { path: "/stagger", element: <Stagger /> },
  { path: "/intro", element: <Intro /> },
  { path: "/examples", element: <Examples /> },
  { path: "/sidebar-menu", element: <SidebarMenu /> },
  { path: "/slide-box", element: <SlideBox /> },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stagger" element={<Stagger />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/sidebar-menu" element={<SidebarMenu />} />
        <Route path="/slide-box" element={<SlideBox />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 mt-6 text-2xl font-bold">Framer Motion:</h1>
      <nav>
        <ul>
          {PAGES.map((page, idx) => (
            <li key={idx}>
              <Link to={page.path} className="py-1">
                {page.path}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
