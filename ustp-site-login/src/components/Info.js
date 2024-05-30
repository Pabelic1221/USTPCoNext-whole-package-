// src/components/Info.js
import React, { Component } from 'react';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      birthday: '',
      country: 'Canada',
      phone: '',
      website: '',
      fname: '',
      lname: '',
      email: '',
      role: ''
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    fetch('/userData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'okay') {
        this.setState({ ...data.data });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    fetch('/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...this.state, token }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'okay') {
        console.log('Profile updated successfully');
      } else {
        console.error('Error:', data.error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  render() {
    return (
      <div>
        <h2 className="my-4">User Info</h2>
        <p>Here you can update your user information.</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              className="form-control"
              value={this.state.fname}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              className="form-control"
              value={this.state.lname}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="form-control"
              value={this.state.role}
              onChange={this.handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="form-control"
              rows="5"
              value={this.state.bio}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="form-control"
              value={this.state.birthday}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              className="form-control"
              value={this.state.country}
              onChange={this.handleChange}
            >
              <option value="Canada">Canada</option>
              {/* Add other country options here */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              className="form-control"
              value={this.state.website}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save changes</button>
        </form>
      </div>
    );
  }
}

export default Info;
