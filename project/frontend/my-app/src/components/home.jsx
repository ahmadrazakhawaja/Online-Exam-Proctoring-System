import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../home_style.css";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("user-info")) {
  //     navigate("/userpage");
  //   } else {
  //     props.setLogIn(null);
  //   }
  // }, []);

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
