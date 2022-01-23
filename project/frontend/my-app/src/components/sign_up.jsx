import React, { Component } from "react";
import Form from "./form";

class SignUp extends Component {
  state = {
    elements: [
      {
        id: 1,
        type: "text",
        text: "Username",
        placeholder: "Enter Username",
        value: "",
      },
      {
        id: 2,
        type: "email",
        text: "Email Address",
        placeholder: "Enter Email",
        value: "",
      },
      {
        id: 3,
        type: "password",
        text: "Password",
        placeholder: "Enter Password",
        value: "",
      },
      {
        id: 4,
        type: "text",
        text: "Name",
        placeholder: "Enter Full Name",
        value: "",
      },
      {
        id: 5,
        type: "text",
        text: "Roll No",
        placeholder: "Enter Roll No",
        value: "",
      },
      {
        id: 6,
        type: "file",
        text: "Picture",
        placeholder: "Upload Picture",
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
    fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: new Headers({ "content-Type": "application/json" }),
      mode: "cors",
      body: JSON.stringify({
        username: this.state.elements[0].value,
        email: this.state.elements[1].value,
        password: this.state.elements[2].value,
        name: this.state.elements[3].value,
        erp: this.state.elements[4].value,
        profileUr: this.state.elements[5].value,
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
        value="Sign Up"
      />
    );
  }
}

export default SignUp;
