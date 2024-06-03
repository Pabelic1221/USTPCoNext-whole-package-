// src/components/AllNews.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/news", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch news data");
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleCardClick = (newsItem) => {
    setSelectedNews(newsItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNews(null);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'} style={{ color: 'white' }}>
            CITC-CoNext
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto"></ul>
            <button onClick={() => window.location.href='/userDetails'} className="btn custom-btn1">Back</button>
          </div>
        </div>
      </nav>
      <div className="container custom-margin1">
        <h2 className="text-center mb-5">All News</h2>
        {error && <p className="text-center text-danger">{error}</p>}
        <div className="row justify-content-center">
          {news.map((item, index) => (
            <div 
              key={index} 
              className="col-lg-4 col-md-4 mb-4" 
              onClick={() => handleCardClick(item)} 
              style={{ cursor: 'pointer' }}
            >
              <div className="card">
                <img
                  src={`http://localhost:5000${item.photo}`}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer style={{ backgroundColor: '#044556', color: 'white', padding: '20px', textAlign: 'center' }}>
        <div className="container">
          <p>
            Copyright 2024 QuanitGoals. 
            <Link to="/privacy-policy" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Privacy Policy</Link> 
            <Link to="/terms-conditions" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Terms & Conditions</Link> 
            <Link to="/contact" style={{ color: '#A0ABC0', marginLeft: '10px', marginRight: '10px', textDecoration: 'none' }}>Contact</Link>
          </p>
        </div>
      </footer>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNews && selectedNews.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNews && (
            <>
              <img
                src={`http://localhost:5000${selectedNews.photo}`}
                className="img-fluid mb-3"
                alt={selectedNews.title}
              />
              <p>{selectedNews.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllNews;
