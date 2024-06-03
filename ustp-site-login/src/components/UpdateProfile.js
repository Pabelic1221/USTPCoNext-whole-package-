import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('general');
  const [formData, setFormData] = useState({
    token: localStorage.getItem('token'), // Get the token from localStorage
    name: '',
    idNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    birthday: '',
    country: 'Philippines',
    contactNumber: '+63', // Ensure this has the +63 prefix
  });

  const [alert, setAlert] = useState({ message: '', type: '' });
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/userData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: formData.token }),
        });
        const data = await response.json();
        if (data.status === 'okay' && data.data) {
          setFormData((prevData) => ({
            ...prevData,
            name: data.data.name || '',
            idNumber: data.data.idNumber || '',
            birthday: data.data.birthday || '',
            contactNumber: data.data.contactNumber || '+63',
            country: data.data.country || 'Philippines',
          }));
        } else {
          setAlert({ message: 'Failed to fetch user data', type: 'error' });
        }
      } catch (error) {
        setAlert({ message: 'An error occurred while fetching user data.', type: 'error' });
      }
    };

    fetchUserData();
  }, [formData.token]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Ensure the +63 prefix for contactNumber
    if (name === 'contactNumber' && !value.startsWith('+63')) {
      value = '+63' + value.replace(/^(\+63)?/, '');
    }

    // Check if the name of the input field is 'confirmNewPassword'
    if (name === 'confirmNewPassword') {
      // Check if the value matches the value of 'newPassword'
      if (value !== formData.newPassword) {
        // If it doesn't match, set passwordMatch to false
        setPasswordMatch(false);
      } else {
        // If the passwords match, set passwordMatch to true
        setPasswordMatch(true);
      }
    }

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      let bodyData;
      if (activeSection === 'general') {
        bodyData = {
          token: formData.token,
          name: formData.name,
          idNumber: formData.idNumber,
          contactNumber: formData.contactNumber
        };
      } else if (activeSection === 'change-password') {
        bodyData = {
          token: formData.token,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        };
      } else if (activeSection === 'info') {
        bodyData = {
          token: formData.token,
          birthday: formData.birthday,
          contactNumber: formData.contactNumber,
          country: formData.country,
        };
      }

      const response = await fetch('http://localhost:5000/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert({ message: 'Update successful', type: 'success' });
      } else {
        setAlert({ message: `Update failed: ${data.message}`, type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'An error occurred while updating the profile.', type: 'error' });
    }
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  const buttonStyle = {
    color: 'white',
    backgroundColor: '#044556',
    borderColor: '#044556',
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'} style={{ color: 'white' }}>
            CITC-CoNext
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/about-us'} style={{ color: 'white' }}>
                  About Us
                </Link>
              </li>
            </ul>
            <button onClick={() => navigate('/userDetails')} className="btn custom-btn1">Back</button>
          </div>
        </div>
      </nav>
      <div className="container custom-margin1">
        <h2 className="my-4">Account settings</h2>
        {alert.message && (
          <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
            {alert.message}
          </div>
        )}
        <div className="row">
          <div className="col-md-4">
            <div className="list-group">
              <button
                onClick={() => setActiveSection('general')}
                className={`list-group-item list-group-item-action ${activeSection === 'general' ? 'active' : ''}`}
                style={activeSection === 'general' ? buttonStyle : {}}
              >
                General
              </button>
              <button
                onClick={() => setActiveSection('change-password')}
                className={`list-group-item list-group-item-action ${activeSection === 'change-password' ? 'active' : ''}`}
                style={activeSection === 'change-password' ? buttonStyle : {}}
              >
                Change Password
              </button>
              <button
                onClick={() => setActiveSection('info')}
                className={`list-group-item list-group-item-action ${activeSection === 'info' ? 'active' : ''}`}
                style={activeSection === 'info' ? buttonStyle : {}}
              >
                Info
              </button>
            </div>
          </div>
          <div className="col-md-8">
            {activeSection === 'general' && (
              <div>
                <h3>General</h3>
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>ID Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      className="form-control"
                      value={formData.idNumber}
                      onChange={handleChange}
                      placeholder="Enter your ID number"
                    />
                  </div>
                </form>
              </div>
            )}
            {activeSection === 'change-password' && (
              <div>
                <h3>Change Password</h3>
                <form>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      className="form-control"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      className={`form-control ${!passwordMatch ? 'is-invalid' : ''}`} // Apply 'is-invalid' class if passwords don't match
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                    />
                    {!passwordMatch && <div className="invalid-feedback">Passwords do not match</div>} {/* Show error message if passwords don't match */}
                  </div>
                </form>
              </div>
            )}
            {activeSection === 'info' && (
              <div>
                <h3>Info</h3>
                <form>
                  <div className="form-group">
                    <label>Birthday</label>
                    <input
                      type="date"
                      name="birthday"
                      className="form-control"
                      value={formData.birthday}
                      onChange={handleChange}
                      placeholder="Enter your birthday"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      value={formData.country}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      className="form-control"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <button onClick={handleSave} className="btn custom-btn1 mt-3">Save Changes</button>
        <button onClick={handleCancel} className="btn custom-btn2 mt-3 ml-2">Cancel</button>
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

export default UpdateProfile;
