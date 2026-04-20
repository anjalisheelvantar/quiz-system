import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/student" element={<Student />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/quiz/:id" element={<Quiz />} /> 
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);