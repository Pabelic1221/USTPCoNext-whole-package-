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
    
  }
}