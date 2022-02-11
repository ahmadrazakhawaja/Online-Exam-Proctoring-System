import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavItem from "./navitem";
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const navigate = useNavigate();
  const [items, setitems] = useState([
    {
      id: 1,
      name: "Sign Up",
      link: "/signup",
      active: false,
    },
    {
      id: 2,
      name: "Log In",
      link: "/login",
      active: false,
    },
  ]);

  const [navstate, navsetstate] = useState(false);
  const [navstate2, navsetstate2] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    const items2 = [...items];
    items2.forEach((item) => {
      if (item.link === pathname) {
        item.active = true;
      }
    });
    setitems(items2);
  }, []);

  const OnClick = (item) => {
    const items2 = [...items];
    const index = items2.indexOf(item);
    items2[index] = { ...item };
    items2.forEach((item) => {
      item.active = false;
    });
    items2[index].active = true;
    setitems(items2);
  };

  const OnClickHome = () => {
    const items2 = [...items];
    items2.forEach((item) => {
      item.active = false;
    });
    setitems(items2);
  };
  const logout = () => {
    localStorage.removeItem("user-info");
    props.setLogIn(null);
  };

  const navdata = () => {
    // const data = JSON.parse(localStorage.getItem("user-info"));
    if (props.status) {
      const data = JSON.parse(props.status);
      return (
        <ul className="navbar-nav ms-auto">
          <li
            onClick={() => navsetstate(!navstate)}
            className="nav-item dropdown"
          >
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {data.first_name}
            </Link>
            <ul
              className={
                navstate
                  ? "dropdown-menu dropdown-menu-dark show"
                  : "dropdown-menu dropdown-menu-dark"
              }
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/userpage/setting">
                  Settings
                </Link>
              </li>
              <li>
                <Link onClick={logout} className="dropdown-item" to="/">
                  Log Out
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          {items.map((item) => (
            <NavItem key={item.id} item={item} OnClick={OnClick} />
          ))}
        </ul>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          style={{
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginLeft: "20px",
          }}
          onClick={OnClickHome}
          className="navbar-brand"
          to="/"
        >
          Exam Proctor
        </Link>
        <button
          className={navstate2 ? "navbar-toggler collapsed" : "navbar-toggler"}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={navstate2 ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => navsetstate2(!navstate2)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            navstate2
              ? "collapse navbar-collapse show"
              : "collapse navbar-collapse"
          }
          id="navbarNav"
        >
          {navdata()}
        </div>
      </div>
    </nav>
  );
}
