import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', photo: null });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/news');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setErrorMessage('Error fetching news: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/news/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccessMessage('News deleted successfully!');
      setErrorMessage('');
      fetchNews();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setErrorMessage('Error deleting news: ' + error.message);
      setSuccessMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEdit = (news) => {
    setSelectedNews(news);
    setForm({ title: news.title, description: news.description, photo: null });
    setSuccessMessage('');
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    if (form.photo) {
      formData.append('photo', form.photo);
    }

    try {
      if (selectedNews) {
        await axios.put(`http://localhost:5000/news/${selectedNews._id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSuccessMessage('News updated successfully!');
      } else {
        await axios.post('http://localhost:5000/create-news', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSuccessMessage('News created successfully!');
      }
      setSelectedNews(null);
      setForm({ title: '', description: '', photo: null });
      fetchNews();
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error saving news: ' + error.message);
      setSuccessMessage('');
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
            </ul>
            <button onClick={() => window.location.href='/userDetails'} className="btn custom-btn1">Back</button>
          </div>
        </div>
      </nav>
      <div className="container custom-margin1">
        <h1>Admin Dashboard</h1>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter the news title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter a brief description of the news"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Photo</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
        <hr />
        <ul className="list-group">
          {newsList.map((news) => (
            <li key={news._id} className="list-group-item d-flex justify-content-between align-items-center news-item">
              <img src={`http://localhost:5000${news.photo}`} alt={news.title} className="news-image" />
              <div className="news-content">
                <h2 className="h5 mb-1">{news.title}</h2>
                <p className="mb-1">{news.description}</p>
                <small className="text-muted">Published: {news.publishedAt ? new Date(news.publishedAt).toLocaleString() : 'N/A'}</small>
                {news.updatedAt && (
                  <small className="text-muted d-block">Updated: {new Date(news.updatedAt).toLocaleString()}</small>
                )}
              </div>
              <div className="news-actions">
                <button onClick={() => handleEdit(news)} className="btn btn-warning me-2">Edit</button>
                <button onClick={() => handleDelete(news._id)} className="btn btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer style={{ backgroundColor: '#044556', color: 'white', padding: '20px', textAlign: 'center' }}>
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

export default AdminDashboard;
