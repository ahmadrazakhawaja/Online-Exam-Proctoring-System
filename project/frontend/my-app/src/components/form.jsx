import React, { useState } from "react";
import TextBox from "./text_box";
import { useForm } from "react-hook-form";

export default function Form(props) {
  let fileObj = [];
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(props.default_values ? props.default_values : {});
  const password = watch("Password");
  // const password = useRef({});
  // const password = watch("Password");
  // const repassword = watch("Retype Password");
  // const checkPassword = (value) =>
  //   value === password.current || "The passwords do not match";
  // const handlechange = props.onChange;
  const onSubmit = props.onSubmit;

  const onFileUpload = (event) => {
    fileObj.push(event.target.files);
  };

  const closemodel = () => {
    reset();
    props.setformSubmit(false);
  };

 

  // if (props.formSubmit === true) {
  //   document.body.style.opacity = "0.2";
  // } else {
  //   document.body.style.opacity = "1";
  // }

  if (!props.default_values) {
    return (
      <div>
        <div
          style={{
            width: "50%",
            margin: "0 auto",
            overflowY: "auto",
            marginBottom: "100px",
            opacity: props.formSubmit ? "0.2" : "1",
          }}
        >
          <h1 style={{ textAlign: "center" }}>{props.value}</h1>
          <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
            {props.elements.map((element) => {
              if (element.text === "Password") {
                return (
                  <TextBox
                    key={element.id}
                    register={register}
                    errors={errors}
                    element={element}
                    passwordEye={passwordEye}
                    setpasswordEye={setPasswordEye}
                    // checkPassword={password}
                    // password={repassword}
                    // onChange={handlechange}
                  />
                );
              }
              if (element.text === "Retype Password") {
                return (
                  <TextBox
                    key={element.id}
                    register={register}
                    errors={errors}
                    element={element}
                    passwordEye={confirmPasswordEye}
                    setpasswordEye={setConfirmPasswordEye}
                    password={password}
                    // checkPassword={password}
                    // password={repassword}
                    // onChange={handlechange}
                  />
                );
              }
              return (
                <TextBox
                  key={element.id}
                  register={register}
                  errors={errors}
                  element={element}
                  // checkPassword={password}
                  // password={repassword}
                  // onChange={handlechange}
                />
              );
            })}
            <div
              style={{
                textAlign: "center",
              }}
            >
              <input
                className="btn btn-danger btn-md m-2"
                type="submit"
                value={props.value}
              />
            </div>
          </form>
        </div>
        {props.formSubmit && (
          <div
            className="modal fade show"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            model="true"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    User Sign Up
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closemodel}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  User Sign Up successful. Please Log In to your account
                </div>
                <div className="modal-footer">
                  {/* <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button> */}
                  <button
                    onClick={() => props.navigate("/login")}
                    type="button"
                    className="btn btn-primary"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        style={{
          overflowY: "auto",
          marginBottom: "100px",
        }}
      >
        <h1>Settings</h1>
        <hr style={{ width: "100%" }}></hr>
        <form
          style={{ width: "50%" }}
          onSubmit={handleSubmit((data, event) => onSubmit(data, event))}
        >
          {props.elements.map((element) => {
            if (element.text === "Password") {
              return (
                <TextBox
                  key={element.id}
                  register={register}
                  errors={errors}
                  element={element}
                  passwordEye={passwordEye}
                  setpasswordEye={setPasswordEye}
                  // checkPassword={password}
                  // password={repassword}
                  // onChange={handlechange}
                />
              );
            }
            if (element.text === "Retype Password") {
              return (
                <TextBox
                  key={element.id}
                  register={register}
                  errors={errors}
                  element={element}
                  passwordEye={confirmPasswordEye}
                  setpasswordEye={setConfirmPasswordEye}
                  password={password}
                  // checkPassword={password}
                  // password={repassword}
                  // onChange={handlechange}
                />
              );
            }
            return (
              <TextBox
                key={element.id}
                register={register}
                errors={errors}
                element={element}
                // checkPassword={password}
                // password={repassword}
                // onChange={handlechange}
              />
            );
          })}
          <div
            style={{
              textAlign: "center",
            }}
          >
            <input
              className="btn btn-danger btn-md m-2"
              type="submit"
              value={props.value}
            />
          </div>
        </form>
        {props.formSubmit && props.formSubmit.submit === true && (
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={props.navigate("login")}
                    type="button"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
