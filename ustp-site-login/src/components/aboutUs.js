import React from "react";
import { Link } from "react-router-dom";

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
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Dong Bajolo</h4>
                <p className="card-text" style={{ marginBottom: "3rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas voluptatem repellendus unde veniam eius quia
                  inventore amet dicta? Incidunt, cumque.
                </p>
                <div className="icons-container" style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-linkedin-in"></i>
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
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Dong Bajolo</h4>
                <p className="card-text" style={{ marginBottom: "3rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas voluptatem repellendus unde veniam eius quia
                  inventore amet dicta? Incidunt, cumque.
                </p>
                <div className="icons-container" style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-linkedin-in"></i>
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
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Dong Bajolo</h4>
                <p className="card-text" style={{ marginBottom: "3rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas voluptatem repellendus unde veniam eius quia
                  inventore amet dicta? Incidunt, cumque.
                </p>
                <div className="icons-container" style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-linkedin-in"></i>
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
                <h4 className="card-title mt-3"style={{ color: "#000000" }}>Dong Bajolo</h4>
                <p className="card-text" style={{ marginBottom: "3rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas voluptatem repellendus unde veniam eius quia
                  inventore amet dicta? Incidunt, cumque.
                </p>
                <div className="icons-container" style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-linkedin-in"></i>
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
