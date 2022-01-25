import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavItem from "./navitem";

export default function NavBar() {
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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {items.map((item) => (
            <NavItem key={item.id} item={item} OnClick={OnClick} />
          ))}
        </ul>
        <ul className="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/">
                  Action
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
