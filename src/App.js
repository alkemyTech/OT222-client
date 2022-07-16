import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Staff,
  News,
  Testimonials,
  Contribute,
  Contact,
  Backoffice,
  LayoutBackoffice,
  Profile,
  EditOrganization,
  UsersList,
  BackofficeNews,
  BackofficeActivities,
  BackofficeTestimonials,
  Activities,
  SignUp,
} from "./pages/index";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import DynamicNews from "./pages/Dynamic_news";
import { selectUserStatus } from "./features/user/userSlice";
import { useSelector } from "react-redux";
function App() {
  const location = useLocation().pathname;
  const status = useSelector(selectUserStatus);
  useEffect(() => {
    if (status === false) {
    }
  }, [location]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<DynamicNews />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/backoffice/changeHomeForm" element={<Backoffice />} />
        <Route path="/backoffice" element={<LayoutBackoffice />} />
        <Route
          path="/backoffice/edit-organization"
          element={<EditOrganization />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/backoffice/users-list" element={<UsersList />} />
        <Route path="/backoffice/news" element={<BackofficeNews />} />
        <Route
          path="/backoffice/activities"
          element={<BackofficeActivities />}
        />
        <Route
          path="/backoffice/testimonials"
          element={<BackofficeTestimonials />}
        />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:activityId" element={<Activities />} />
      </Routes>

      {location !== "/login" && location !== "/register" ? <Footer /> : null}
    </>
  );
}

export default App;
