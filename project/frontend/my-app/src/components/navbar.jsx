import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavItem from "./navitem";

class NavBar extends Component {
  state = {
    items: [
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
    ],
  };

  OnClick = (item) => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items.forEach((item) => {
      item.active = false;
    });
    items[index].active = true;
    this.setState({ items });
  };

  componentDidMount() {
    const pathname = window.location.pathname;
    const items = [...this.state.items];
    items.forEach((item) => {
      if (item.link === pathname) {
        item.active = true;
      }
    });
    this.setState({ items });
  }

  OnClickHome() {
    const items = [...this.state.items];
    items.forEach((item) => {
      item.active = false;
    });
    this.setState({ items });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link
          style={{
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginLeft: "20px",
          }}
          onClick={this.OnClickHome}
          className="navbar-brand"
          to="/"
        >
          Exam Proctor
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {this.state.items.map((item) => (
              <NavItem key={item.id} item={item} OnClick={this.OnClick} />
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
