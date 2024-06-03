import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import jushuaImage from '../Resources/jushua.jpg';
import danImage from '../Resources/dan.png';
import irisjenImage from '../Resources/irisjen.jpg';

function AboutUs() {
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
      <section id="administrators" className="" style={{ color: "#044556" }}>
        <div className="container mt-2">
          <div className="row pb-5">
            <div className="col-sm-12 text-center text-light">
              <h2 style={{ color: "black" }}>The Administrators</h2>
              <p style={{ color: "black" }}>
                Our administrators are experts in the field of business and
                technologies with 5 years of experience
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6 col-md-6 col-lg-3 mb-sm-4">
              <div className="card text-center bg-light" style={{ height: "100%" }}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={jushuaImage}
                    className="rounded-circle img-fluid"
                    alt="Jushua Pabelic"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <h4 className="card-title mt-3" style={{ color: "#000000" }}>Jushua Pabelic</h4>
                  <p className="card-text" style={{ marginBottom: "3rem" }}>
                    A young and ambitious full-stack developer with a passion for crafting and enhancing web applications, dedicated to staying updated with the latest technologies and best practices in the field.
                  </p>
                  <div className="icons-container" style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-sm-4">
              <div className="card text-center bg-light" style={{ height: "100%" }}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={danImage}
                    className="rounded-circle img-fluid"
                    alt="Dan Bjerfstin Famas"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <h4 className="card-title mt-3" style={{ color: "#000000" }}>Dan Bjerfstin Famas</h4>
                  <p className="card-text" style={{ marginBottom: "3rem" }}>
                    Young Software Engineer who excels in developing innovative solutions, particularly in challenging scenarios where adaptability is crucial.
                  </p>
                  <div className="icons-container" style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-sm-4">
              <div className="card text-center bg-light" style={{ height: "100%" }}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={irisjenImage}
                    className="rounded-circle img-fluid"
                    alt="Irisjen De Lara"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <h4 className="card-title mt-3" style={{ color: "#000000" }}>Irisjen De Lara</h4>
                  <p className="card-text" style={{ marginBottom: "3rem" }}>
                    Young Project Manager who's good at handling tasks and projects simultaneously, especially in crucial situations where efficiency is vital.
                  </p>
                  <div className="icons-container" style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}> {/* Center the button */}
        <Link to="/userDetails" className="btn btn-primary mb-3 back-button">
          Back
        </Link>
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
}

export default AboutUs;
