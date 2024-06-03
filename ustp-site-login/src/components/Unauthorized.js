// Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'} style={{ color: 'white' }}>
            CITC-CoNext
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
              </ul>
              <button onClick={() => window.location.href='/userDetails'} className="btn custom-btn1">Back</button>
            </div>
          </div>
        </nav>
        <div className='unautho'>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
    </div>
    <footer style={{ backgroundColor: '#044556', color: 'white', padding: '20px', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
          <div className="container">
            <p>
              Copyright 2024 QuanitGoals. 
              <Link to="/privacy-policy" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Privacy Policy</Link>, 
              <Link to="/terms-conditions" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Terms & Conditions</Link>, 
              <Link to="/contact" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Contact</Link>
            </p>
          </div>
        </footer>
    </div>
  );
};

export default Unauthorized;