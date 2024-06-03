import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    return <p>You do not have permission to create news.</p>;
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    // Check if file is selected and is an image
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      setError(''); // Clear any previous error
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      setError('Please upload a photo.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photo', photo);

    try {
      const token = window.localStorage.getItem("token"); // Retrieve the JWT token from local storage
      const response = await fetch('http://localhost:5000/create-news', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('News created successfully!');
        setTitle('');
        setDescription('');
        setPhoto(null);
        setError('');
        // Redirect to the news details page or any other relevant page
        setTimeout(() => {
          navigate('/userDetails');
        }, 2000); // Delay of 2 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
    }
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
            <button onClick={() => window.location.href='/userDetails'} className="btn custom-btn1">Back</button>
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        {/* News creation form */}
        <div className="container custom-margin1">
          <h2>Create News</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the news title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description of the news"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Upload Photo:</label>
              <input
                type="file"
                accept="image/*" // Allow only image files
                className="form-control"
                id="photo"
                onChange={handlePhotoChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Create News</button>
            <Link to="/userDetails" className="btn btn-secondary ml-2">Cancel</Link>
          </form>
        </div>

        <footer style={{ backgroundColor: '#044556', color: 'white', padding: '20px', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
          <div className="container">
            <p>
              Copyright 2024 QuanitGoals.
              <Link to="/privacy-policy" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms-conditions" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link to="/contact" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Contact</Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewsCreation;
