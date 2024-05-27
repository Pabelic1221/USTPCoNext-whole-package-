// src/components/SignUp.js
import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      redirectToSignIn: false,
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);

    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "okay") {
          alert("Registered Successfully");
          this.setState({ redirectToSignIn: true });
        } else {
          this.setState({ error: data.error || "Registration failed" });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { redirectToSignIn, error } = this.state;

    if (redirectToSignIn) {
      return <Navigate to="/sign-in" />;
    }

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
            <form onSubmit={this.handleSubmit}>
              <h3>Sign Up</h3>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <div className="mb-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={this.state.fname}
                  onChange={(e) => this.setState({ fname: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={this.state.lname}
                  onChange={(e) => this.setState({ lname: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right">
                Already registered <Link to="/sign-in">sign in?</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
