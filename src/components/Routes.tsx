import {  Routes, Route, Navigate } from "react-router-dom";

import Play from "./Play";
import MainMenu from "./MainMenu";
import Gameboard from "./Gameboard";
import Login from "./Login";
import Finish from "./Finish";
import { useAppContext } from "../hooks/useAppContext";

export default function AppRouter() {
  const { accessToken } = useAppContext();

  if (!accessToken) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/play" element={<Play />} />
      <Route path="/game" element={<Gameboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/over" element={<Finish />}/>
    </Routes>
  )
}
