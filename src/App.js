import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
  BackofficeCategories,
  SignUp,
  AddNew,
  AddTestimony,
  ContactsTable,
  BackofficeStaff,
} from './pages/index';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import DynamicNews from './pages/Dynamic_news';
import { selectUserStatus, login, handleUser } from './features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import AuthorizationService from './services/authorization';

function App() {
  const location = useLocation().pathname;
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === false) {
    }
  }, [status]);

  useEffect(() => {
    AuthorizationService.get(process.env.REACT_APP_SERVER_BASE_URL + '/auth/me')
      .then(res => {
        dispatch(login());
        dispatch(handleUser(res.data));
        if (res.data.roleId !== 1 && location.includes('/backoffice'))
          navigate('/');
      })
      .catch(err => {
        if (location.includes('/backoffice') || location.includes('/profile'))
          navigate('/');
      });
  }, []);

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
        <Route path="/add-testimony" element={<AddTestimony />} />
        <Route path="/add-new" element={<AddNew />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/backoffice/changeHomeForm" element={<Backoffice />} />
        <Route path="/backoffice" element={<LayoutBackoffice />} />
        <Route path="/backoffice/staff" element={<BackofficeStaff />} />
        <Route
          path="/backoffice/edit-organization"
          element={<EditOrganization />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/backoffice/contacts-list" element={<ContactsTable />} />
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
        <Route
          path="/backoffice/categories"
          element={<BackofficeCategories />}
        />
      </Routes>

      {location !== '/login' && location !== '/register' ? <Footer /> : null}
    </>
  );
}

export default App;
