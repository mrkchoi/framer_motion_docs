import { Routes, Route } from "react-router-dom";
import TransitionWrapper from "../TransitionWrapper";
import Home from "../views/Home";

import img1 from "../images/1_big.jpg";
import img2 from "../images/2_big.jpg";
import img3 from "../images/3_big.jpg";
import DetailView from "../views/DetailView";

const data = [
  {
    id: 1,
    year: "2021",
    title: "MOULDER",
    title2: "ALEX MOULDER",
    img: img1,
    location:
      "AND IF IT RAINS, A CLOSED CAR AT FOUR. AND WE SHALL PLAY A GAME OF CHESS, PRESSING LIDLESS EYES AND WAITING FOR A KNOCK UPON THE DOOR.",
    material:
      "AT THE VIOLET HOUR, WHEN THE EYES AND BACK, TURN UPWARD FROM THE DESK, WHEN THE HUMAN ENGINE WAITS.",
    path: "/alex",
  },
  {
    id: 2,
    year: "2022",
    title: "BENNETT",
    title2: "ARIA BENNETT",
    img: img2,
    location:
      "AND IF IT RAINS, A CLOSED CAR AT FOUR. AND WE SHALL PLAY A GAME OF CHESS, PRESSING LIDLESS EYES AND WAITING FOR A KNOCK UPON THE DOOR.",
    material:
      "AT THE VIOLET HOUR, WHEN THE EYES AND BACK, TURN UPWARD FROM THE DESK, WHEN THE HUMAN ENGINE WAITS.",
    path: "/aria",
  },
  {
    id: 3,
    year: "2023",
    title: "HUGHES",
    title2: "JIMMY HUGHES",
    img: img3,
    location:
      "AND IF IT RAINS, A CLOSED CAR AT FOUR. AND WE SHALL PLAY A GAME OF CHESS, PRESSING LIDLESS EYES AND WAITING FOR A KNOCK UPON THE DOOR.",
    material:
      "AT THE VIOLET HOUR, WHEN THE EYES AND BACK, TURN UPWARD FROM THE DESK, WHEN THE HUMAN ENGINE WAITS.",
    path: "/jimmy",
  },
];

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
      {data.map(
        ({ id, year, title, title2, img, location, material, path }) => (
          <Route
            key={id}
            path={path}
            element={
              <TransitionWrapper>
                <DetailView
                  year={year}
                  title={title}
                  title2={title2}
                  img={img}
                  location={location}
                  material={material}
                  path={path}
                />
              </TransitionWrapper>
            }
          />
        ),
      )}
    </Routes>
  );
}

// <Route
//   path="/alex"
//   element={
//     <TransitionWrapper>
//       <Alex />
//     </TransitionWrapper>
//   }
// />
// <Route
//   path="/aria"
//   element={
//     <TransitionWrapper>
//       <Aria />
//     </TransitionWrapper>
//   }
// />
// <Route
//   path="/jimmy"
//   element={
//     <TransitionWrapper>
//       <Jimmy />
//     </TransitionWrapper>
//   }
// />
