import React, { useState, useEffect } from "react";
import Form from "./form";
import { useNavigate } from "react-router-dom";

export default function LogIn(props) {
  const navigate = useNavigate();
  const [elements, setelements] = useState([
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
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      mode: "cors",
      body: JSON.stringify({
        email: elements[0].value,
        password: elements[1].value,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.message === "User login Successful") {
          localStorage.setItem("user-info", JSON.stringify(json.data));
          props.setLogIn(localStorage.getItem("user-info"));
          navigate("/userpage");
        }
      });
    event.preventDefault();
  };

  return (
    <Form
      elements={elements}
      onChange={handlechange}
      onSubmit={handleSubmit}
      value="Log In"
    />
  );
}
