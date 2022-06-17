import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, Staff, News, Testimonials, Contribute } from "./pages/index";
import Footer from "./components/Footer";
function App() {
  const location = useLocation().pathname;

  return (
    <>
      {/* Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/news" element={<News />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
      {location !== "/login" ? <Footer /> : null}
    </>
  );
}

export default App;
