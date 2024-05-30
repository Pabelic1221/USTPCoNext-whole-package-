// src/components/General.js
import React, { Component } from 'react';

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      role: "user",  // Default role
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "okay") {
          const { fname, lname, email, role } = data.data;
          this.setState({ fname, lname, email, role });
        } else {
          this.setState({ error: data.error || "Failed to fetch user data" });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, role } = this.state;
    const token = window.localStorage.getItem("token");

    fetch("http://localhost:5000/updateProfile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token,
        fname,
        lname,
        email,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "okay") {
          this.setState({ redirectToProfile: true });
        } else {
          this.setState({ error: data.error || "Failed to update profile" });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { fname, lname, email, role, error } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3 text-center">
            <img src="/path/to/profile-pic.png" alt="Profile" className="img-thumbnail" />
            <br />
            <button type="button" className="btn btn-outline-primary mt-2">Upload new photo</button>
            <button type="button" className="btn btn-outline-secondary mt-2">Reset</button>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={email.split('@')[0]} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={`${fname} ${lname}`}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <small className="form-text text-muted">
              Your email is not confirmed. Please check your inbox.
            </small>
            <button type="button" className="btn btn-link">Resend confirmation</button>
          </div>
          <div className="mb-3">
            <label className="form-label">Company</label>
            <input type="text" className="form-control" value="Company Ltd." readOnly />
          </div>
          <button type="submit" className="btn btn-primary">Save changes</button>
          <button type="button" className="btn btn-secondary ms-2">Cancel</button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    );
  }
}

export default General;
