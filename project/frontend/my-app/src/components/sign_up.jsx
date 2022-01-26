import React, { useState, useEffect } from "react";
import Form from "./form";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const navigate = useNavigate();

  const [elements, setelements] = useState([
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
  ]);

  // useEffect(() => {
  //   if (localStorage.getItem("user-info")) {
  //     navigate("/userpage");
  //   } else {
  //     props.setLogIn(null);
  //   }
  // }, []);

  const handlechange = (element, event) => {
    const elements2 = [...elements];
    const index = elements2.indexOf(element);
    elements2[index] = { ...element };
    elements2[index].value = event.target.value;
    setelements(elements2);
  };

  const handleSubmit = (event) => {
    fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: new Headers({ "content-Type": "application/json" }),
      mode: "cors",
      body: JSON.stringify({
        username: elements[0].value,
        email: elements[1].value,
        password: elements[2].value,
        name: elements[3].value,
        erp: elements[4].value,
        profileUrl: elements[5].value,
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

  return (
    <Form
      elements={elements}
      onChange={handlechange}
      onSubmit={handleSubmit}
      value="Sign Up"
    />
  );
}
