import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Components/HomePageWrapper";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import ResetPassword from "./components/login/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetPassword />} />  {/* Changed "/Reset" to "/reset" */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
