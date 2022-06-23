import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Staff,
  News,
  Testimonials,
  Contribute,
  Register
} from "./pages/index";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import ChangeHomeForm from "./components/ChangeHomeForm";

function App() {
  const location = useLocation().pathname;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/news" element={<News />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path='/register' element={<Register />} />
        <Route path='/changeHomeForm' element={<ChangeHomeForm />} />
      </Routes>
      {location !== "/login" ? <Footer /> : null}
    </>
  );
}

export default App;
