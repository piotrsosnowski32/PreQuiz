import { useState } from "react";
import MainMenu from "./components/MainMenu";
import "./App.css";
import Router from "./components/Routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="p-3 mb-2 bg-dark text-white">
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}

export default App;
