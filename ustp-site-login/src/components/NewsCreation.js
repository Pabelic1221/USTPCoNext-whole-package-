import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

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
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const data = await response.json();

      if (data.status === 'success') {
        setSuccessMessage('News created successfully!');
        setTitle('');
        setDescription('');
        setPhoto(null);
        setError('');
        // Redirect to the news details page or any other relevant page
        navigate('/userDetails');
      } else {
        setError(data.message || 'An error occurred');
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

      {/* News creation form */}
      <div className="container custom-margin">
        <h2>Create News</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
    </div>
  );
};

export default NewsCreation;
