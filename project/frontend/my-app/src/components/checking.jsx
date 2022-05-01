import React, { useEffect, useState, useRef, useCallback } from "react";
import { useOutletContext, useNavigate, useMatch } from "react-router-dom";
import { Outlet } from "react-router";
import Alert from "./alert";

function CheckPanel(props) {
  const [socket, setSocket] = useOutletContext();
  const navigate = useNavigate();
  const canvasRef = useRef();
  const imgdata = useRef();
  const [stream2, setStream] = useState();
  const [alert, setAlert] = useState();
  const [loading, setloading] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [verified, setverified] = useState(false);
  const myVideo = useRef();
  const dimension = useRef([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const aspectRatio = stream
          .getVideoTracks()[0]
          .getSettings().aspectRatio;
        // console.log(stream.getVideoTracks()[0].getSettings().aspectRatio);
        // console.log(stream.getVideoTracks()[0].getSettings().height);
        // console.log(stream.getVideoTracks()[0].getSettings().width);
        dimension.current.push(parseInt(300 * aspectRatio));
        dimension.current.push(300);
        console.log("hellox");
        console.log(stream);
        setStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch(function (err) {
        console.log(err);
        setAlert(err.message);
      });

    const checkverification = (data) => {
      console.log(data);
      if (data === "True") {
        navigate("/userpage/exam-room/:id/candidate");
      } else if (data === "False") {
        setAlert("Image not verified. please send again.");
        setloading(false);
      } else {
        setAlert(data);
        setloading(false);
      }
    };
    socket.on("media-verified", checkverification);

    return () => {
      socket.off("media-verified", checkverification);
    };

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const takeImage = () => {
    // const canvas = document.createElement("canvas");
    // const context = canvas.getContext("2d");
    const context = canvasRef.current.getContext("2d");
    context.width = dimension.current[0];
    context.height = dimension.current[1];

    // const video = document.getElementById("video");

    context.drawImage(myVideo.current, 0, 0, context.width, context.height);
    // const data = canvas.toDataURL("image/jpeg", 1).split(";base64,")[1];
    canvasRef.current.toBlob(
      (blob) => {
        console.log(blob);
        imgdata.current = blob;
      },
      "image/jpeg",
      1
    );
    setIsCanvasEmpty(false);
    // const data = canvas.toDataURL("image/jpeg");
    // const data2 = data.split(";base64,")[1];
    // const imj = document.getElementById("imagex");
    // imj.src = data;
  };

  function handleClear() {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCanvasEmpty(true);
    // onClear();
  }

  const sendImage = () => {
    socket.emit("media-verify", imgdata.current);
    setloading(true);
  };

  return (
    <React.Fragment>
      {alert && <Alert alert={alert} setalert={setAlert} />}
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Candidate Verification
      </h1>
      <p style={{ textAlign: "center" }}>
        Please take a photo and send it for Verification. Once verified you will
        be allowed to enter the Exam Room.
        <br /> Make sure that your face is clearly visible and the room is well
        lit.
      </p>
        <div className="container">
          <div className="row mt-5" style={{textAlign: 'center',alignItems: 'center', marginBottom: '100px',boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}>
            <div className="col-6">
        <div className="video">
          {stream2 && (
            <video
              playsInline
              muted
              id="video"
              ref={myVideo}
              autoPlay
              style={{ width: "300px" }}
            />
          )}
        </div>
        {dimension.current.length > 0 ? (
          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-primary"
              onClick={isCanvasEmpty ? takeImage : handleClear}
              type="submit"
              style={{ marginRight: "5px" }}
            >
              {isCanvasEmpty ? "Take Image" : "Clear Image"}
            </button>
            <button
              className="btn btn-primary"
              onClick={sendImage}
              type="submit"
            >
              Verify
            </button>
            {/* <img id="imagex"></img> */}
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
        ) : null}
          </div>
          <div className="col-6">
              {dimension.current.length > 0 ? (<canvas
              style={{ display: "block", margin: 'auto'}}
              ref={canvasRef}
              width={dimension.current[0]}
              height={dimension.current[1]}
            />) : null}
            </div>
            </div>
          </div>
      {/* {myVideo.current.videoWidth}
      {myVideo.current.videoHeight} */}
    </React.Fragment>
  );
}

export default CheckPanel;
