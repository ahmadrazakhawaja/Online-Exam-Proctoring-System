import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation, matchPath } from "react-router";

const Welcome = (props) => {
  const { pathname } = useLocation();
  const { confirmationCode } = useParams();

  if (matchPath("/confirm/:confirmationCode", pathname)) {
    console.log(confirmationCode);
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${confirmationCode}`);
    // myHeaders.append("content-Type", "application/json");
    fetch("http://127.0.0.1:5000/routes/api/auth/confirm", {
      method: "GET",
      mode: "cors",
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to="/login">Please Login</Link>
    </div>
  );
};

export default Welcome;
