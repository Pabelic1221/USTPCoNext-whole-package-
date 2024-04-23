import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      error: null,
    };
  }

  componentDidMount() {
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
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  render() {
    const { userData, error } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top mybg">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="menu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link text-color" href="#about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-color" href="#faq">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-color" href="#administrators">
                    Administrators
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-color" href="/login">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="text-dark text-center text-sm-start p-5 mybg align-top">
          <div className="container">
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Velit doloribus iusto commodi corrupti praesentium
                      repellat eius, atque, quod nihil tempore inventore
                      tempora error, assumenda numquam consectetur. Optio quae
                      voluptates sunt!
                    </p>
                    <button
                      className="btn btn-light btn-lg fw-bold"
                      data-bs-toggle="modal"
                      data-bs-target="#Connect"
                    >
                      Connect With Us!
                    </button>
                  </div>
                )}
              </div>

              <img
                src="{{ asset('images/header-img.png') }}"
                alt=""
                className="w-50 d-none d-sm-block hide-on-sm"
              />
            </div>
          </div>
        </section>

        <br />
        <button onClick={this.logOut} className="btn btn-primary">
          Log Out
        </button>
      </div>
    );
  }
}
