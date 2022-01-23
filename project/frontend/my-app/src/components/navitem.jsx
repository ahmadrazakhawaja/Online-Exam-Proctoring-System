import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li
        onClick={() => this.props.OnClick(this.props.item)}
        className="nav-item"
      >
        <Link className={this.setclass()} to={this.props.item.link}>
          {this.props.item.name}
        </Link>
      </li>
    );
  }

  setclass = () => {
    let classname = "nav-link";
    classname += this.props.item.active === true ? " active" : "";
    return classname;
  };
}

export default NavItem;
