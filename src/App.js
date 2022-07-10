import React from "react"
import "./App.css"
import { Routes, Route, useLocation } from "react-router-dom"
import {
  Home,
  Login,
  Staff,
  News,
  Testimonials,
  Contribute,
  Register,
  Contact,
  Backoffice,
  LayoutBackoffice,
  Profile,
  EditOrganization,
  UsersList,
  BackofficeNews,
  BackofficeActivities,
  BackofficeTestimonials,
  SignUp,
} from "./pages/index"
import Footer from "./layouts/Footer"
import Header from "./layouts/Header"
import DynamicNews from "./pages/Dynamic_news"

function App() {
  const location = useLocation().pathname

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
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/backoffice/changeHomeForm" element={<Backoffice />} />
        <Route path="/layoutbackoffice" element={<LayoutBackoffice />} />
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
      </Routes>
      {location !== "/login" && location !== "/register" ? <Footer /> : null}
    </>
  )
}

export default App
