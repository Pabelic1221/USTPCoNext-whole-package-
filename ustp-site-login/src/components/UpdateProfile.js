// src/components/UpdateProfile.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import General from './General';
import ChangePassword from './ChangePassword';
import Info from './Info';

const UpdateProfile = () => (
  <div className="container">
    <h2 className="my-4">Account settings</h2>
    <div className="row">
      <div className="col-md-4">
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="general" className="nav-link">General</Link>
          </li>
          <li className="list-group-item">
            <Link to="change-password" className="nav-link">Change password</Link>
          </li>
          <li className="list-group-item">
            <Link to="info" className="nav-link">Info</Link>
          </li>
        </ul>
      </div>
      <div className="col-md-8">
        <Routes>
          <Route path="general" element={<General />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="info" element={<Info />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default UpdateProfile;
