import React from "react";
import HomePage from "./HomePage";
import ContributePage from "./ContributePage";
import LoginPage from "./LoginPage";
import StaffPage from "./StaffPage";
import NewsPage from "./NewsPage";
import TestimonialsPage from "./TestimonialsPage";
import RegisterPage from './RegisterPage'
import ContactPage from "./ContactPage";
import ProfilePage from "./ProfilePage";


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

export const Register = () => {
  return <RegisterPage />
}

export const Contact = () => {
  return <ContactPage />;
};

export const Profile = () => {
  return <ProfilePage />
}