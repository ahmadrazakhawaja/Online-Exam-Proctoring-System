import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import Modal from "./modal";

const UploadImage = (props) => {
  const [modal, setmodal] = useState(false);
  const navigate = useNavigate();
  const elements = [
    {
      id: 1,
      id2: 2,
      id3: 3,
      type: "file",
      text: "Picture 1",
      text2: "Picture 2",
      text3: "Picture 3",

      // placeholder: "Upload Picture",
      // value: "",
      verification: {
        required: {
          value: true,
          message: "Image is Required",
        },
      },
      description:
        "Please upload 3 images. 1 from front and other 2 from left and right angle.",
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
                Uploading Images
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
                {/* <img
              style={{
                objectFit: "contain",
                width: "100%",
              }}
              src={props.image.image}
            ></img> */}
            
                <div className="spinner-border"
                style={{ display: "block", margin: "0 auto", marginTop: "2%" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            
              </div>
              <div className="modal-footer">
                {/* <button
                  // onClick={() => props.navigate("/login")}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setmodal(false)}
                >
                  No
                </button>
                <button
                  // onClick={() => props.navigate("/login")}
                  type="button"
                  className="btn btn-danger"
                  onClick={EndExam}
                >
                  Yes
                </button> */}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleSubmit = (data, event) => {
    setmodal(true);
    const formData = new FormData();
    if (data["Picture 1"]) {
      // console.log(data["Picture 1"][0]);
      formData.append("Picture", data["Picture 1"][0]);
    }
    if (data["Picture 2"]) {
      formData.append("Picture", data["Picture 2"][0], "Picture-2.jpg");
    }
    if (data["Picture 3"]) {
      formData.append("Picture", data["Picture 3"][0], "Picture-3.jpg");
    }
    const data2 = JSON.parse(localStorage.getItem("user-info"));
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${data2.token}`);
    setalert("It may take a few seconds to upload the images.");
    fetch("http://127.0.0.1:5000/routes/profile", {
      method: "PUT",
      headers: myHeaders,
      mode: "cors",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.message === "User updated successfully") {
          console.log(json.data);
          const data3 = {
            ...json.data,
            token: data2.token,
          };
          localStorage.setItem("user-info", JSON.stringify(data3));
          props.setLogIn(localStorage.getItem("user-info"));
          event.target.reset();
          setalert(json.header.message);
        } else {
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
        }
        setmodal(false);
        // }
      });
    event.preventDefault();
  };

  //   if (matchPath("/confirm/:confirmationCode", pathname)) {
  //     verifyuser(confirmationCode);
  //   }

  return (
    <React.Fragment>
      {alert2()}
      {displayModal()}
      <Form
        elements={elements}
        // onChange={handlechange}
        onSubmit={handleSubmit}
        image={true}
        // formSubmit={formsubmit}
        // setformSubmit={setsubmit}
        value="Upload Images"
        // navigate={navigate}
        opacity={modal ? '0.2':'1'}
      />
    </React.Fragment>
  );
};

export default UploadImage;
