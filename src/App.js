import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Socket from "./components/Socket";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/socket/:id" element={<Socket />} />
        <Route path="/socket/:username" element={<Socket />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
