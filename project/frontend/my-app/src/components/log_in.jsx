import React, { Component } from "react";
import Form from "./form";

class LogIn extends Component {
  state = {
    elements: [
      {
        id: 1,
        type: "email",
        text: "Email",
        placeholder: "Enter Email",
        value: "",
      },
      {
        id: 2,
        type: "password",
        text: "Password",
        placeholder: "Enter Password",
        value: "",
      },
    ],
  };

  handlechange = (element, event) => {
    const elements = [...this.state.elements];
    const index = elements.indexOf(element);
    elements[index] = { ...element };
    elements[index].value = event.target.value;
    this.setState({ elements });
  };

  handleSubmit = (event) => {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: new Headers({ "content-Type": "application/json" }),
      mode: "cors",
      body: JSON.stringify({
        email: this.state.elements[1].value,
        password: this.state.elements[2].value,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
      });
    event.preventDefault();
  };

  render() {
    return (
      <Form
        elements={this.state.elements}
        onChange={this.handlechange}
        onSubmit={this.handleSubmit}
        value="Log In"
      />
    );
  }
}

export default LogIn;
