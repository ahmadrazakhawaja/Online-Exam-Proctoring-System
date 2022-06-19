import React, { useState, useEffect } from "react";
import Form from "./form";
import { useNavigate } from "react-router-dom";

export default function Setting(props) {
  const navigate = useNavigate();

  const elements = [
    {
      id: 1,
      type: "email",
      text: "Email Address",
      placeholder: "Enter Email",
      // value: "",
      disabled: true,
      verification: {},
    },
    {
      id: 2,
      type: "text",
      text: "Institute",
      // value: "",
      disabled: true,
      verification: {},
    },
    {
      id: 3,
      id2: 4,
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
      id: 5,
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

  const [modal, setmodal] = useState(null);

  const logout = () => {
    localStorage.removeItem("user-info");
    props.setLogIn(null);
    navigate("/");
  };

  const displayModal = () => {
    if (modal) {
      return (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          model="true"
          role="dialog"
          style={{ display: "block", opacity: "1 !important" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete Account
                </h5>
                {/* <button
              type="button"
              className="btn-close"
              onClick={() => {
                props.image.element.target.value = null;
                // props.reset({ pic: "" });
                props.setimage(false);
                return false;
              }}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button> */}
              </div>
              <div className="modal-body">
                Are you sure you want to Delete your Account?
                {/* <img
              style={{
                objectFit: "contain",
                width: "100%",
              }}
              src={props.image.image}
            ></img> */}
              </div>
              <div className="modal-footer">
                <button
                  // onClick={() => props.navigate("/login")}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setmodal(false)}
                >
                  Cancel
                </button>
                <button
                  // onClick={() => props.navigate("/login")}
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteUser}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const changePassword = () => {
    navigate("/userpage/setting/change-password");
  };

  const uploadimage = () => {
    navigate("/userpage/setting/upload-image");
  };

  const deleteUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${data2.token}`);
    fetch(process.env.REACT_APP_API_URL + `/routes/delete-user`, {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.message === "User Deleted Successfully") {
          logout();
          // setmodal(true);
        } else {
          setalert(json.header.message);
        }
      });
    // event.preventDefault();
  };

  const data2 = JSON.parse(localStorage.getItem("user-info"));
  let default_value = null;
  if (data2) {
    default_value = {
      defaultValues: {
        "Email Address": data2.user,
        Institute: data2.institute,
        Erp: data2.erp,
        "First Name": data2.first_name,
        "Last Name": data2.last_name,
      },
    };
  }

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
    const myHeaders = new Headers();
    myHeaders.append("content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${data2.token}`);

    // console.log(data);
    // const formData = new FormData();
    // if (data["Picture 1"]) {
    //   // console.log(data["Picture 1"][0]);
    //   formData.append("Picture", data["Picture 1"][0]);
    // }
    // if (data["Picture 2"]) {
    //   formData.append("Picture", data["Picture 2"][0], "Picture-2.jpg");
    // }
    // if (data["Picture 3"]) {
    //   formData.append("Picture", data["Picture 3"][0], "Picture-3.jpg");
    // }
    // formData.append(
    //   "data",

    // );

    // console.log(formData);
    fetch(process.env.REACT_APP_API_URL + `/routes/profile`, {
      method: "PUT",
      headers: myHeaders,
      mode: "cors",
      body: JSON.stringify({
        first_name: data["First Name"],
        last_name: data["Last Name"],
        erp: data.Erp,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        console.log(json.data);
        if (json.header.message === "User updated successfully") {
          const data3 = {
            ...json.data,
            token: data2.token,
          };
          localStorage.setItem("user-info", JSON.stringify(data3));
          props.setLogIn(localStorage.getItem("user-info"));
          // localStorage.setItem("user-info", JSON.stringify(json.updateuser));
          // props.setLogIn(localStorage.getItem("user-info"));
          setalert(json.header.message);
        } else {
          setalert(json.header.message);
        }
      });
    event.preventDefault();
  };

  useEffect(() => {
    document.body.style.backgroundColor = "hsl(210, 12%, 90%)";

    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  return (
    <React.Fragment>
      {alert2()}
      {displayModal()}
      <div
        style={{
          display: "flex",
          overflow: "scroll",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          className="formy"
          style={{
            marginBottom: "100px",
            width: "80%",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          <Form
            elements={elements}
            default_values={default_value ? default_value : null}
            // onChange={handlechange}
            onSubmit={handleUpdate}
            opacity={modal ? "0.2" : "1"}
            changePassword={changePassword}
            uploadimage={uploadimage}
            delete={setmodal}
            value="Save"
          />
        </div>
      </div>
    </React.Fragment>
  );
}
