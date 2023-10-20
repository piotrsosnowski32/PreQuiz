import { createBrowserRouter } from "react-router-dom";
import Classification from "./Classification";
import Play from "./Play";
import MainMenu from "./MainMenu";
import Gameboard from "./Gameboard";
import Login from "./Login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/menu",
    element: <MainMenu />,
  },
  {
    path: "/classification",
    element: <Classification />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/gameboard",
    element: <Gameboard />,
  },
]);

export default Router;
