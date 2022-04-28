import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AdminSettings(props) {
  const room = JSON.parse(localStorage.getItem("room-info"));
  const [socket, setSocket] = useOutletContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "facial-detection": room.facialDetection,
      "audio-detection": room.audioDetection,
      browser: room.browserTracking,
      "candidate-limit": room.candidateLimit,
    },
  });

  const [alert, setalert] = useState(null);
  const [modal, setmodal] = useState(false);
  const [loading, setloading] = useState(false);

  // const [file, setfile] = useState(room.textFile);

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

  const onSubmit = (data, event) => {
    console.log(data);
    if (data["file-upload"][0]) {
      data["name"] = data["file-upload"][0].name;
    }
    console.log(data);
    socket.emit("setting", data);

    socket.on("setting-set", (data) => {
      console.log(data);
      localStorage.setItem("room-info", JSON.stringify(data));
      socket.off("setting-set");
      setalert("settings updated successfully.");
    });
    // const data2 = JSON.parse(localStorage.getItem("user-info"));
    // const myHeaders = new Headers();
    // myHeaders.append("content-Type", "application/json");
    // myHeaders.append("authorization", `Bearer ${data2.token}`);
    // console.log(data);
    // fetch("http://127.0.0.1:5000/roomRoutes/createRoom", {
    //   method: "POST",
    //   headers: myHeaders,
    //   mode: "cors",
    //   body: JSON.stringify({
    //     facialDetection: data["facial-detection"],
    //     audioDetection: data["audio-detection"],
    //     browserTracking: data["browser"],
    //     candidateLimit: data["candidate-limit"],
    //     // timeLimit: data["time-limit"],
    //   }),
    // })
    //   .then((res) => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then((json) => {
    //     console.log(json.header.message);
    //     if (json.header.message === "Room Created") {
    //       localStorage.setItem("room-info", JSON.stringify(json.data.newRoom));
    //       const room = JSON.parse(localStorage.getItem("room-info"));
    //       navigate(`/userpage/exam-room/${room._id}`);
    //     } else {
    //       // if (json.header.message === "User Made") {
    //       //   // localStorage.setItem("user-info", JSON.stringify(json.data));
    //       //   // props.setLogIn(localStorage.getItem("user-info"));
    //       //   // navigate("/login");
    //       //   setsubmit(true);
    //       // } else {
    //       // setsubmit({
    //       //   submit: true,
    //       //   redirect: false,
    //       // });
    //       setalert(json.header.message);
    //     }
    //     // }
    //   });
  };

  const ExamSettings = () => {
    console.log("hello");
    navigate(`/userpage/exam-room/${room._id}`);
  };

  const EndExam = () => {
    console.log("hello");
    socket.emit("end-exam");
    // setmodal(false);
    setloading(true);
    // navigate(`/userpage/exam-room/${room._id}`);
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
                  End Exam
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
                {!loading && 'Are you sure you want to End Exam?'}
                {/* <img
              style={{
                objectFit: "contain",
                width: "100%",
              }}
              src={props.image.image}
            ></img> */}
            {loading && (
              <div
                className="spinner-border"
                style={{ display: "block", margin: "0 auto", marginTop: "2%" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
              </div>
              <div className="modal-footer">
                <button
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

  return (
    <React.Fragment>
      {displayModal()}
      {alert2()}

      <div className="container" style={{ opacity: modal ? "0.2" : "1" }}>
        <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
          <div className="row mt-3">
            <div
              className="col-4"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                className="btn btn-primary"
                type="submit"
                onClick={ExamSettings}
                //   style={{
                //     position: "absolute",
                //     marginTop: "50%",
                //   }}
              >
                Back
              </button>
            </div>
            <div className="col-4">
              <div className="mt-3">
                <h1 style={{ textAlign: "center" }}>Admin Settings</h1>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="form-check form-switch col-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                {...register("facial-detection")}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Facial Detection
              </label>
            </div>
            <div className="form-check form-switch col-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                {...register("audio-detection")}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Audio Detection
              </label>
            </div>
            <div className="form-check form-switch col-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                {...register("browser")}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Browser Tracking
              </label>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-6 text-center" style={{ position: "relative" }}>
              <div
                className="mx-auto mt-auto"
                style={{
                  width: "50%",
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: "0",
                }}
              >
                <input
                  type="number"
                  className="form-control"
                  id="candidate-limit"
                  // value={value}
                  // onChange={(event) => onChange(props.element, event)}
                  aria-describedby="Room-id"
                  placeholder="Enter candidate limit"
                  {...register("candidate-limit", {
                    required: {
                      value: true,
                      message: "candidate limit is Required",
                    },
                  })}
                />
                {errors["candidate-limit"] && errors["candidate-limit"].message}
              </div>
            </div>
            <div className="col-6 text-center">
              <h5>Upload Question Paper: </h5>
              <input
                type="file"
                className="form-control-file btn btn-primary btn-sm mb-2"
                id="file-upload"
                // onChange={props.uploadfile()}
                // value={value}
                // onChange={(event) => onChange(props.element, event)}
                aria-describedby="Upload Question Paper"
                placeholder="Upload Question Paper"
                accept="text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                // onChange={(e) => props.submitx(e)}
                {...register("file-upload", {
                  validate: (value) => {
                    if (value && value[0]) {
                      console.log(value[0].size);
                      if (value[0].size > 2000000) {
                        return "File size should be less than 2MB.";
                      }
                      if (
                        value[0].type ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                        value[0].type === "text/plain"
                      ) {
                      } else {
                        return "File should be txt or Docx type.";
                      }
                    }
                  },
                })}
              />
              {errors["file-upload"] && errors["file-upload"].message}
              <div>{room.textFile}</div>
            </div>

            <div className="row justify-content-center mt-5">
              <input
                type="submit"
                className="btn btn-primary mt-3"
                style={{ width: "25%" }}
                value="Save Settings"
              />
            </div>
          </div>
        </form>
        <div className="row justify-content-center mt-5">
          <button
            onClick={() => setmodal(true)}
            className="btn btn-danger mt-3"
            style={{ width: "25%", marginBottom: "100px" }}
          >
            End Exam
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
