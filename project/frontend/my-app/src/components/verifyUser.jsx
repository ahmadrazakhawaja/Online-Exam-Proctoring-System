import React from "react";
import verifyuser from "../api_call";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation, matchPath } from "react-router";

const Welcome = (props) => {
  const { pathname } = useLocation();
  const { confirmationCode } = useParams();

  if (matchPath("/confirm/:confirmationCode", pathname)) {
    verifyuser(confirmationCode);
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
