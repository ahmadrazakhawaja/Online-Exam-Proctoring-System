import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../home_style.css";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="containersk">
        <img src="/home_page_image.jpeg" className="image" alt="home page" />
        <div className="overlay">
          <h1 className="text">Free online Exam Proctoring System</h1>
          <Link to="/login" className="btn btn-danger btn-md m-2">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-danger btn-md m-2">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
