import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'


function AboutUs() {
  return (
    <div>
    <section id="administrators" className=""style={{ color: "#044556" }}>
      <div className="container mt-5">
        <div className="row pb-5">
          <div className="col-sm-12 text-center text-light">
            <h2>The Administrators</h2>
            <p>
              Our administrators are experts in the field of business and
              technologies with 5 years of experience
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3 mb-sm-4">
            <div className="card text-center bg-light" style={{ height: "100%" }}>
              <div className="card-body">
                <img
                  src="https://cdn.britannica.com/70/129770-050-AEBE1EB9/Robert-Downey-Jr-2008.jpg"
                  className=" rounded-circle"
                  alt=""
                  style={{ height: "35%", width: "60%", objectFit: "cover" }}
                />
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Jushua Pabelic</h4>
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
              <div className="card-body">
                <img
                  src="https://cdn.britannica.com/70/129770-050-AEBE1EB9/Robert-Downey-Jr-2008.jpg"
                  className=" rounded-circle"
                  alt=""
                  style={{ height: "35%", width: "60%", objectFit: "cover" }}
                />
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Dan Bjerfstin Famas</h4>
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
              <div className="card-body">
                <img
                  src="https://cdn.britannica.com/70/129770-050-AEBE1EB9/Robert-Downey-Jr-2008.jpg"
                  className=" rounded-circle"
                  alt=""
                  style={{ height: "35%", width: "60%", objectFit: "cover" }}
                />
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Irisjen De Lara</h4>
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
          <div className="col-sm-6 col-md-6 col-lg-3 mb-sm-4">
            <div className="card text-center bg-light" style={{ height: "100%" }}>
              <div className="card-body">
                <img
                  src="https://cdn.britannica.com/70/129770-050-AEBE1EB9/Robert-Downey-Jr-2008.jpg"
                  className=" rounded-circle"
                  alt=""
                  style={{ height: "35%", width: "60%", objectFit: "cover" }}
                />
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Nozomi Kawakami</h4>
                <p className="card-text" style={{ marginBottom: "3rem" }}>
                a guy with an unknown background—joined our team determined to prove his worth through hard work and dedication.
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
    <br/>
    <Link to="/userDetails" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
}

export default AboutUs;
