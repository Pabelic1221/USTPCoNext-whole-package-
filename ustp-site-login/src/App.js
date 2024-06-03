import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login_component';
import SignUp from './components/signup_component';
import UserDetails from './components/userDetails';
import AboutUs from './components/aboutUs';
import UpdateProfile from './components/UpdateProfile';
import NewsCreation from './components/NewsCreation';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import AdminDashboard from './components/AdminDashboard';
import AllNews from './components/AllNews';


function App() {
  return (
    <Router>
        <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/all-news" element={<AllNews />} />
          <Route
            path="/create-news"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <NewsCreation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        </UserProvider>
    </Router>
  );
}

export default App;
