// src/components/ChangePassword.js
import React, { Component } from 'react';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = this.state;
    const token = window.localStorage.getItem("token");

    if (newPassword !== confirmNewPassword) {
      this.setState({ error: "New passwords do not match" });
      return;
    }

    fetch("http://localhost:5000/changePassword", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token,
        currentPassword,
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "okay") {
          this.setState({ redirectToProfile: true });
        } else {
          this.setState({ error: data.error || "Failed to change password" });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { currentPassword, newPassword, confirmNewPassword, error } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => this.setState({ currentPassword: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => this.setState({ newPassword: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Repeat New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmNewPassword}
              onChange={(e) => this.setState({ confirmNewPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Save changes</button>
          <button type="button" className="btn btn-secondary ms-2">Cancel</button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    );
  }
}

export default ChangePassword;
