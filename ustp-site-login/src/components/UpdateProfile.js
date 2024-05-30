// src/components/UpdateProfile.js
import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import General from './General';
import ChangePassword from './ChangePassword';
import Info from './Info';

const UpdateProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'} style={{ color: 'white' }}>
            USTP-CoNext
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/about-us'} style={{ color: 'white' }}>
                  About Us
                </Link>
              </li>
            </ul>
            <button onClick={() => navigate('/userDetails')} className="btn custom-btn1">Back</button>
          </div>
        </div>
      </nav>    
      <div className="container custom-margin">
        <h2 className="my-4">Account settings</h2>
        <div className="row">
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">
                <Link to={'/general'} className="nav-link">General</Link>
              </li>
              <li className="list-group-item">
                <Link to={'/change-password'} className="nav-link">Change password</Link>
              </li>
              <li className="list-group-item">
                <Link to={'/info'} className="nav-link">Info</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8">
            <Routes>
              <Route path="/update-profile/general" element={<General />} />
              <Route path="/update-profile/change-password" element={<ChangePassword />} />
              <Route path="/update-profile/info" element={<Info />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
