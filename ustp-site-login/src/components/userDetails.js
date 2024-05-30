// src/components/userDetails.js
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      error: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  render() {
    const { userData, error } = this.state;

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
                <li className="nav-item">
                  <Link className="nav-link" to={'/about-us'} style={{ color: 'white' }}>
                    News
                  </Link>
                </li>
              </ul>
              <button onClick={this.logOut} className="btn btn-primary custom-btn">Log Out</button>
              <button onClick={() => window.location.href='/update-profile'} className="btn custom-btn1">Profile</button>
            </div>
          </div>
        </nav>

        <section className="text-dark text-center text-sm-start p-5 mybg align-top custom-bg">
          <div className="container custom-margin">
            <div className="d-sm-flex align-items-center justify-content-between text-light">
              <div>
                {error ? (
                  <p>Error: {error}</p>
                ) : (
                  <div>
                    <h1>
                      Welcome {userData && userData.fname}
                    </h1>
                    <p className="lead my-4">
                      A centralized application; An educational blog site for students under the Department of College of Information Technology and Communication in USTP-CDO
                    </p>
                  </div>
                )}
              </div>

              <img
                src="/path/to/header-img.png" // Update this path to the correct image location
                alt="Header"
                className="w-50 d-none d-sm-block hide-on-sm"
              />
            </div>
          </div>
        </section>
        <br />
      </div>
    );
  }
}
