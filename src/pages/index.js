import React from "react";
import HomePage from "../pages/HomePage";
import ContributePage from "../pages/ContributePage";
import LoginPage from "../pages/LoginPage";
import StaffPage from "../pages/StaffPage";
import NewsPage from "../pages/NewsPage";
import TestimonialsPage from "../pages/TestimonialsPage";

export const Home = () => {
  return <HomePage />;
};

export const Login = () => {
  return <LoginPage />;
};

export const Staff = () => {
  return <StaffPage />;
};

export const News = () => {
  return <NewsPage />;
};

export const Testimonials = () => {
  return <TestimonialsPage />;
};

export const Contribute = () => {
  return <ContributePage />;
};
