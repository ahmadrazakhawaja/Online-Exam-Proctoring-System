import React, { useState,useEffect } from "react";
import Form from "./form";

const EnterEmail = (props) => {
  const elements = [
    {
      id: 1,
      type: "email",
      text: "Email",
      placeholder: "Enter Email",
      value: "",
      verification: {},
    },
  ];

  const [alert, setalert] = useState(null);

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
    fetch(process.env.REACT_APP_API_URL+`/routes/change-password`, {
      method: "POST",
      headers: new Headers({ "content-Type": "application/json" }),
      mode: "cors",
      body: JSON.stringify({
        email: data.Email,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        // if (json.header.message === "User Made") {
        //   // localStorage.setItem("user-info", JSON.stringify(json.data));
        //   // props.setLogIn(localStorage.getItem("user-info"));
        //   // navigate("/login");
        //   setsubmit(true);
        // } else {
        // setsubmit({
        //   submit: true,
        //   redirect: false,
        // });
        setalert(json.header.message);
        // }
      });
    event.preventDefault();
  };

  //   if (matchPath("/confirm/:confirmationCode", pathname)) {
  //     verifyuser(confirmationCode);
  //   }

  useEffect(() => {
    document.body.style.backgroundColor = "hsl(210, 12%, 90%)";

    return () => {
      document.body.style.backgroundColor = "white";
    };

  },[])

  return (
    <React.Fragment>
      {alert2()}
      <div style={{display: 'flex',overflow: 'scroll',flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'}}>
        <div style={{ marginBottom: '100px', width: '80%' ,backgroundColor: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}}>
      <Form
        elements={elements}
        // onChange={handlechange}
        onSubmit={handleSubmit}
        // formSubmit={formsubmit}
        // setformSubmit={setsubmit}
        value="Change Password"
        // navigate={navigate}
      />
      </div>
      </div>
    </React.Fragment>
  );
};

export default EnterEmail;
