// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login_component';
import SignUp from './components/signup_component';
import UserDetails from './components/userDetails';
import AboutUs from './components/aboutUs';
import UpdateProfile from './components/UpdateProfile';
import Info from './components/Info';
import ChangePassword from './components/ChangePassword';
import General from './components/General';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/info" element={<Info />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/general" element={<General />} />
      </Routes>
    </Router>
  );
}

export default App;
