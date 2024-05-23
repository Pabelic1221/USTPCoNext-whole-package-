import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login_component';
import SignUp from './components/signup_component';
import UserDetails from './components/userDetails';
import AboutUs from './components/aboutUs';
import Reset from './components/reset';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'} style={{ color: 'white' }}>
              USTP-CoNext
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'} style={{ color: 'white' }}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'} style={{ color: 'white' }}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn=="true"?<UserDetails/>:<Login/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/forgot-password" element={<Reset />} />
            </Routes>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/forgot-password" element={<Reset />} />
      </Routes>
    </Router>
  )
}

export default App
