import React, { useState, useEffect } from "react";
import Form from "./form";
import { useNavigate } from "react-router-dom";

export default function Setting(props) {
  const navigate = useNavigate();

  const elements = [
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
    //   id: 3,
    //   type: "password",
    //   text: "Password",
    //   placeholder: "Enter Password",
    //   // value: "",
    //   verification: {
    //     minLength: {
    //       value: 5,
    //       message: "Password should have minimum length of 5",
    //     },
    //   },
    // },
    {
      id: 3,
      type: "number",
      text: "Erp",
      placeholder: "Enter Roll No",
      // value: "",
      description: "Roll No is needed if you want to take an exam.",
      verification: {
        minLength: {
          value: 2,
          message: "Roll No should have minimum length of 2",
        },
        required: {
          value: true,
          message: "Username is Required",
        },
      },
    },
    {
      id: 4,
      type: "file",
      text: "Picture",
      placeholder: "Upload Picture",
      // value: "",
      verification: {},
      description:
        "Upload multiple images. 1 from front and other from left and right angle.",
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
  //   // {
  //   //   id: 3,
  //   //   type: "password",
  //   //   text: "Password",
  //   //   placeholder: "Enter Password",
  //   //   // value: "",
  //   //   verification: {
  //   //     minLength: {
  //   //       value: 5,
  //   //       message: "Password should have minimum length of 5",
  //   //     },
  //   //   },
  //   // },
  //   {
  //     id: 2,
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
  //         message: "Username is Required",
  //       },
  //     },
  //   },
  //   {
  //     id: 3,
  //     type: "number",
  //     text: "Erp",
  //     placeholder: "Enter Roll No",
  //     // value: "",
  //     description: "Roll No is needed if you want to take an exam.",
  //     verification: {
  //       minLength: {
  //         value: 2,
  //         message: "Roll No should have minimum length of 2",
  //       },
  //       required: {
  //         value: true,
  //         message: "Username is Required",
  //       },
  //     },
  //   },
  //   {
  //     id: 4,
  //     type: "file",
  //     text: "Picture",
  //     placeholder: "Upload Picture",
  //     // value: "",
  //     verification: {},
  //     description:
  //       "Upload multiple images. 1 from front and other from left and right angle.",
  //   },
  // ]);

  const data2 = JSON.parse(localStorage.getItem("user-info"));

  const default_value = {
    defaultValues: {
      Username: data2.username,
      Erp: data2.ERP,
      Name: data2.Name,
    },
  };

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

  const handleUpdate = (data, event) => {
    console.log(data);
    const formData = new FormData();
    if (data["Picture"]) {
      formData.append("picture", data["Picture"]);
    }
    formData.append(
      "data",
      JSON.stringify({
        username: data.Username,
        name: data.Name,
        erp: data.Erp,
      })
    );
    console.log(data["Email Address"]);
    fetch(`http://127.0.0.1:5000/update/${data2.ID}`, {
      method: "POST",
      headers: new Headers({ "content-Type": "application/json" }),
      mode: "cors",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.message === "update checks out") {
          localStorage.setItem("user-info", JSON.stringify(json.updateuser));
          props.setLogIn(localStorage.getItem("user-info"));
          setalert(json.header.message);
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
        default_values={default_value}
        // onChange={handlechange}
        onSubmit={handleUpdate}
        value="Save"
      />
    </React.Fragment>
  );
}
