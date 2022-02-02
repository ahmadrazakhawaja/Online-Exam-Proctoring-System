import React, { useState, useEffect } from "react";
import Form from "./form";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [institutes, setinstitutes] = useState(null);
  const [formsubmit, setsubmit] = useState(false);

  const getInstitutes = () => {
    fetch("http://127.0.0.1:5000/routes/ListInstitutes", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.message === "User list retrieved successfully") {
          setinstitutes(json.data.InstituteList);
          // institutes = json.data.InstituteList;
          // institutes;
          // console.log(institutes);
        }
        // else {
        //   setalert(json.header.message);
        // }
      });
    // event.preventDefault();
  };
  // console.log(institutes);
  useEffect(() => {
    getInstitutes();
    // Promise.all([getInstitutes()]).then(() => {
    //   console.log(institutes);
    // });
  }, []);

  // setInterval(() => console.log(institutes), 5000);
  // console.log("hello", institutes);
  const elements = [
    // {
    //   id: 1,
    //   type: "text",
    //   text: "Username",
    //   placeholder: "Enter Username",
    //   // value: "",
    //   verification: {
    //     required: {
    //       value: true,
    //       message: "Username is Required",
    //     },
    //     minLength: {
    //       value: 4,
    //       message: "Username should have minimum length of 4",
    //     },
    //     maxLength: {
    //       value: 30,
    //       message: "Username should have maximum length of 30",
    //     },
    //   },
    // },
    {
      id: 1,
      type: "email",
      text: "Email Address",
      placeholder: "Enter Email",
      // value: "",
      verification: {
        required: {
          value: true,
          message: "Email is Required",
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
          message: "Email not Valid",
        },
      },
    },
    {
      id: 2,
      type: "password",
      text: "Password",
      placeholder: "Enter Password",
      // value: "",
      verification: {
        // pattern: {
        //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$/,
        //   message:
        //     "Password should include at least one uppercase, one numeric value.",
        // },
        required: {
          value: true,
          message: "Password is Required",
        },
        minLength: {
          value: 5,
          message: "Password should have minimum length of 5",
        },
      },
    },
    {
      id: 3,
      type: "password",
      text: "Retype Password",
      placeholder: "Retype Password",
      // value: "",
      verification: {
        required: {
          value: true,
          message: "Password is Required",
        },
        // minLength: {
        //   value: 5,
        //   message: "Password should have minimum length of 5",
        // },
      },
    },
    {
      id: 4,
      id2: 5,
      type: "text",
      text: "First Name",
      text2: "Last Name",
      placeholder: "Enter First Name",
      placeholder2: "Enter Last Name",
      // value: "",
      verification: {
        minLength: {
          value: 3,
          message: "First Name should have minimum length of 3",
        },
        required: {
          value: true,
          message: "First Name is Required",
        },
      },
      verification2: {
        minLength: {
          value: 1,
          message: "Last Name should have minimum length of 1",
        },
        required: {
          value: true,
          message: "Last Name is Required",
        },
      },
    },
    // {
    //   id: 5,
    //   type: "text",
    //   text: "Last Name",
    //   placeholder: "Enter Last Name",
    //   // value: "",
    //   verification: {
    //     minLength: {
    //       value: 1,
    //       message: "Last Name should have minimum length of 1",
    //     },
    //     required: {
    //       value: true,
    //       message: "Last Name is Required",
    //     },
    //   },
    // },
    // {
    //   id: 5,
    //   type: "number",
    //   text: "Roll No",
    //   placeholder: "Enter Roll No",
    //   // value: "",
    //   verification: {
    //     minLength: {
    //       value: 2,
    //       message: "Roll No should have minimum length of 2",
    //     },
    //     required: {
    //       value: true,
    //       message: "Roll number is Required",
    //     },
    //   },
    // },
    {
      id: 5,
      type: "form-select",
      text: "Institution",
      placeholder: "Enter Full Name",
      // value: "",
      institutes: institutes,
      verification: {
        required: {
          value: true,
          message: "Institution is Required",
        },
      },
    },
  ];
  // const [elements, setelements] = useState([
  //   {
  //     id: 1,
  //     type: "text",
  //     text: "Username",
  //     placeholder: "Enter Username",
  //     // value: "",
  //     verification: {
  //       required: {
  //         value: true,
  //         message: "Username is Required",
  //       },
  //       minLength: {
  //         value: 4,
  //         message: "Username should have minimum length of 4",
  //       },
  //       maxLength: {
  //         value: 30,
  //         message: "Username should have maximum length of 30",
  //       },
  //     },
  //   },
  //   {
  //     id: 2,
  //     type: "email",
  //     text: "Email Address",
  //     placeholder: "Enter Email",
  //     // value: "",
  //     verification: {
  //       required: {
  //         value: true,
  //         message: "Email is Required",
  //       },
  //       pattern: {
  //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
  //         message: "Email not Valid",
  //       },
  //     },
  //   },
  //   {
  //     id: 3,
  //     type: "password",
  //     text: "Password",
  //     placeholder: "Enter Password",
  //     // value: "",
  //     verification: {
  //       required: {
  //         value: true,
  //         message: "Password is Required",
  //       },
  //       minLength: {
  //         value: 5,
  //         message: "Password should have minimum length of 5",
  //       },
  //     },
  //   },
  //   {
  //     id: 4,
  //     type: "text",
  //     text: "Name",
  //     placeholder: "Enter Full Name",
  //     // value: "",
  //     verification: {
  //       minLength: {
  //         value: 3,
  //         message: "Nname should have minimum length of 3",
  //       },
  //       required: {
  //         value: true,
  //         message: "Full Name is Required",
  //       },
  //     },
  //   },
  //   {
  //     id: 5,
  //     type: "number",
  //     text: "Roll No",
  //     placeholder: "Enter Roll No",
  //     // value: "",
  //     verification: {
  //       minLength: {
  //         value: 2,
  //         message: "Roll No should have minimum length of 2",
  //       },
  //       required: {
  //         value: true,
  //         message: "Roll number is Required",
  //       },
  //     },
  //   },
  //   {
  //     id: 6,
  //     type: "form-select",
  //     text: "Institution",
  //     placeholder: "Enter Full Name",
  //     // value: "",
  //     verification: {
  //       required: {
  //         value: true,
  //         message: "Institution is Required",
  //       },
  //     },
  //   },
  // ]);

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

  const handleSubmit = (data, event) => {
    console.log(data);
    console.log(data["Email Address"]);
    fetch("http://127.0.0.1:5000/routes/adduser", {
      method: "POST",
      headers: new Headers({ "content-Type": "application/json" }),
      mode: "cors",
      body: JSON.stringify({
        username: data.Username,
        email: data["Email Address"],
        password: data.Password,
        first_name: data["First Name"],
        last_name: data["Last Name"],
        instituteName: data.Institution,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.message === "User Made") {
          // localStorage.setItem("user-info", JSON.stringify(json.data));
          // props.setLogIn(localStorage.getItem("user-info"));
          // navigate("/login");
          setsubmit(true);
        } else {
          // setsubmit({
          //   submit: true,
          //   redirect: false,
          // });
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
        formSubmit={formsubmit}
        setformSubmit={setsubmit}
        value="Sign Up"
        navigate={navigate}
      />
    </React.Fragment>
  );
}
