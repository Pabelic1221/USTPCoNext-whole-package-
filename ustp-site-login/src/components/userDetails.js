import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      error: null,
      news: [],
      showModal: false,
      selectedNews: null,
    };
  }

  componentDidMount() {
    // Fetch user data
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

    // Fetch all news sorted by date/time
    fetch("http://localhost:5000/news", {
      method: "GET",
      crossDomain: true,
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
        // Sort the news data by date/time in descending order
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Slice the first three items to display
        const limitedNews = data.slice(0, 3);
        
        // Update the state with the limited news data
        this.setState({ news: limitedNews });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  handleCardClick = (newsItem) => {
    this.setState({ selectedNews: newsItem, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedNews: null });
  };

  render() {
    const { userData, error, news, showModal, selectedNews } = this.state;

    return (
      <div className="App">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'} style={{ color: 'white' }}>
              CITC-CoNext
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item nav-item-custom">
                  <Link className="nav-link" to={'/about-us'} style={{ color: 'white' }}>
                    About Us
                  </Link>
                </li>
                <li className="nav-item nav-item-custom">
                  <Link className="nav-link" to={'/create-news'} style={{ color: 'white' }}>
                    News
                  </Link>
                </li>
                {userData && userData.role === 'admin' && (
                  <li className="nav-item nav-item-custom">
                    <Link className="nav-link" to={'/admin-dashboard'} style={{ color: 'white' }}>
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
              <button onClick={this.logOut} className="btn btn-primary custom-btn">Log Out</button>
              <button onClick={() => window.location.href='/update-profile'} className="btn custom-btn1">Profile</button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <section className="text-dark text-center text-sm-start p-5 mybg align-top custom-bg main-content">
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
                src={require("../Resources/header-img.png")} // Update this path to the correct image location
                alt="Header"
                className="w-50 d-none d-sm-block hide-on-sm"
              />
            </div>
          </div>
        </section>

        {/* News section */}
        <section className="container mt-5 mb-3">
          <h2 className="text-center mb-4">Latest News</h2>
          <div className="row justify-content-center">
            {/* Map through news array and render each news card */}
            {news.map((item, index) => (
              <div 
                key={index} 
                className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center"
                onClick={() => this.handleCardClick(item)} // Add onClick handler
                style={{ cursor: 'pointer' }}
              >
                <div className="card">
                  {/* Update the image source to use the correct path */}
                  <img
                    src={`http://localhost:5000${item.photo}`} // Make sure item.photo contains the correct relative path to the image
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    {/* Additional card content, if needed */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row justify-content-center mt-4"> {/* Centering the More News button */}
            <div className="col-lg-4 col-md-6 text-center">
              {news.length >= 3 && (
                <Link to="/all-news" className="btn btn-primary">More News</Link>
              )}
            </div>
          </div>
        </section>

        {/* Modal */}
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedNews && selectedNews.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedNews && (
              <>
                <img
                  src={`http://localhost:5000${selectedNews.photo}`} // Make sure item.photo contains the correct relative path to the image
                  className="img-fluid mb-3"
                  alt={selectedNews.title}
                />
                <p>{selectedNews.description}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Footer */}
        <footer style={{ backgroundColor: '#044556', color: 'white', padding: '20px', textAlign: 'center', marginTop: 'auto', width: '100%' }}>
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
    );
  }
}
