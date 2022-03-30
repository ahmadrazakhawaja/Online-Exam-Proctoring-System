import React, { useState } from "react";
import TextBox from "./text_box";
import Modal from "./modal";
import { useForm } from "react-hook-form";

export default function Form(props) {
  let fileObj = [];
  const [passwordEye, setPasswordEye] = useState(false);

  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(props.default_values ? props.default_values : {});
  const password = watch("Password");
  // const picture1 = watch("Picture1");
  // const picture2 = watch("Picture2");
  // const picture3 = watch("Picture3");
  // console.log(picture);
  const [imagesubmit, setimagesubmit] = useState(false);
  // const [pic, setpic] = useState(null);
  // const [pic, setpic] = useState(undefined);

  // const password = useRef({});
  // const password = watch("Password");
  // const repassword = watch("Retype Password");
  // const checkPassword = (value) =>
  //   value === password.current || "The passwords do not match";
  // const handlechange = props.onChange;
  const onSubmit = props.onSubmit;

  // if (picture != undefined) {
  //   setimagesubmit(true);
  // }

  // const onFileUpload = (event) => {
  //   fileObj.push(event.target.files);
  // };

  const setImage = (e, element) => {
    console.log(e);
    console.log(element);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimagesubmit({ image: reader.result, element: e });
      }
    };
    console.log(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  // console.log(picture);
  // if (picture1 != undefined) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setimagesubmit(reader.result);
  //     }
  //   };
  //   setpic("picture1");
  //   console.log(picture1);
  //   reader.readAsDataURL(picture1[0]);
  // setpic(picture);

  //   fileObj.push(e.target.files[0]);
  //   console.log("hello");
  //   setimagesubmit(URL.createObjectURL(e.target.files[0]));

  // if (picture2 != undefined) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setimagesubmit(reader.result);
  //     }
  //   };
  //   setpic("picture2");
  //   console.log(picture1);
  //   reader.readAsDataURL(picture2[0]);
  // }

 

  // if (props.formSubmit === true) {
  //   document.body.style.opacity = "0.2";
  // } else {
  //   document.body.style.opacity = "1";
  // }
  let i = 0;
  const setopacity = () => {
    if (props.opacity) {
      return props.opacity;
    } else if (imagesubmit) {
      return "0.2";
    } else {
      return "1";
    }
  };

  const findimage = (url) => {
    return (
      <div className="col">
        <img
          style={{
            // objectFit: "contain",
            width: "100%",
          }}
          src={url}
        ></img>
      </div>
    );
  };
  const data2 = JSON.parse(localStorage.getItem("user-info"));
  if (!props.default_values) {
    return (
      <React.Fragment>
        <div>
          <div
            style={{
              width: "50%",
              margin: "0 auto",
              overflowY: "auto",
              marginBottom: "100px",
              opacity: setopacity(),
            }}
            // style={imagesubmit ? { opacity: "0.2" } : { opacity: "1" }}
          >
            <h1 style={{ textAlign: "center" }}>{props.value}</h1>
            <form
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
                if (element.type === "file") {
                  return (
                    <TextBox
                      key={element.id}
                      register={register}
                      errors={errors}
                      element={element}
                      submitx={setImage}
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
                  value={props.value === "Change Password" ? "OK" : props.value}
                />
              </div>
              {/* {props.image && (
                <img
                  style={{
                    objectFit: "contain",
                    width: "100%",
                  }}
                  src={data2.profileUrl[0] ? data2.profileUrl[0] : ""}
                ></img>
              )} */}
            </form>
          </div>
          {props.image && (
            <div
              className="row"
              style={{
                width: "80%",
                margin: "0 auto",
                overflowY: "auto",
                marginBottom: "100px",
              }}
            >
              <h2>uploaded images</h2>
              {data2.profileUrl.map((url) => {
                i = i + 1;
                return (
                  <div key={i} className="col">
                    <img
                      style={{
                        // objectFit: "contain",
                        width: "100%",
                      }}
                      src={url}
                    ></img>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {imagesubmit && (
          <Modal
            setimage={setimagesubmit}
            image={imagesubmit}
            name="hello"
            reset={reset}
          />
        )}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div style={imagesubmit ? { opacity: "0.2" } : { opacity: "1" }}>
          <h1 style={{ marginLeft: "5%" }}>Settings</h1>
          <hr style={{ width: "90%", margin: "0 auto" }}></hr>
          <div className="row">
            <div className="col" style={{ width: "100%" }}>
              <div
                style={{
                  // width: "50%",
                  marginLeft: "10%",
                  overflowY: "auto",
                  marginBottom: "100px",
                  opacity: props.opacity ? props.opacity : 1,
                }}
              >
                <form
                  // style={{ width: "50%" }}
                  onSubmit={handleSubmit((data, event) =>
                    onSubmit(data, event)
                  )}
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
                    if (element.type === "file") {
                      return (
                        <TextBox
                          key={element.id}
                          register={register}
                          errors={errors}
                          element={element}
                          submitx={setImage}
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
            </div>
            <div className="col">
              <div className="text-center mt-5">
                <button
                  onClick={props.changePassword}
                  className="btn btn-danger btn-lg m-2"
                >
                  Change Password
                </button>
              </div>
              <div className="text-center mt-5">
                <button
                  onClick={(e) => props.delete(true)}
                  className="btn btn-danger btn-lg m-2"
                >
                  Delete Account
                </button>
              </div>
              <div className="text-center mt-5">
                <button
                  onClick={props.uploadimage}
                  className="btn btn-danger btn-lg m-2"
                >
                  Upload Images
                </button>
              </div>
            </div>
          </div>
        </div>
        {imagesubmit && (
          <Modal
            setimage={setimagesubmit}
            image={imagesubmit}
            name="hello"
            reset={reset}
          />
        )}
      </React.Fragment>
    );
  }
}
