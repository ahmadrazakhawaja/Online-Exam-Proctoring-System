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
      verification: {},
    },
    {
      id: 2,
      type: "password",
      text: "Password",
      placeholder: "Enter Password",
      value: "",
      verification: {},
    },
  ]);

  const [alert, setalert] = useState(null);

  // useEffect(() => {
  //   if (localStorage.getItem("user-info")) {
  //     navigate("/userpage");
  //   } else {
  //     props.setLogIn(null);
  //   }
  // }, []);

  // const handlechange = (element, event) => {
  //   const elements2 = [...elements];
  //   const index = elements2.indexOf(element);
  //   elements2[index] = { ...element };
  //   elements2[index].value = event.target.value;
  //   setelements(elements2);
  // };

  const alerting = () => {
    setalert(null);
  };

  const alert2 = () => {
    if (alert) {
      return (
        <div
          style={{
            display: "inline-block",
            position: "relative",
            width: "100%",
          }}
          className="alert alert-primary"
          role="alert"
        >
          {alert}
          <svg
            style={{ position: "absolute", right: "2%" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            onClick={alerting}
            height="16"
            fill="currentColor"
            className="bi bi-x-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      );
    }
    return null;
  };

  const handleSubmit = (data, event) => {
    console.log(data);
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      mode: "cors",
      body: JSON.stringify({
        email: data.Email,
        password: data.Password,
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
        } else {
          setalert(json.header.message);
        }
      });
    event.preventDefault();
  };

  return (
    <React.Fragment>
      {alert2()}
      <Form
        elements={elements}
        // onChange={handlechange}
        onSubmit={handleSubmit}
        value="Log In"
      />
    </React.Fragment>
  );
}
