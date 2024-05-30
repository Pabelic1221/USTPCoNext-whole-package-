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
import NewsCreation from './components/NewsCreation'; // Assuming this component exists
import { UserProvider } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <UserProvider>
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
          <Route
            path="/create-news"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <NewsCreation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
