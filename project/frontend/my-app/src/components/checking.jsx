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
  };

  return (
    <React.Fragment>
      <h1>Candidate Verification</h1>
      {alert && <Alert alert={alert} setalert={setAlert} />}
      <div className="video-container">
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
          <div>
            <button
              className="btn btn-primary"
              onClick={isCanvasEmpty ? takeImage : handleClear}
              type="submit"
            >
              Take Image
            </button>
            <button
              className="btn btn-primary"
              onClick={sendImage}
              type="submit"
            >
              Send Image
            </button>
            {/* <img id="imagex"></img> */}
            <canvas
              style={{ display: "block" }}
              ref={canvasRef}
              width={dimension.current[0]}
              height={dimension.current[1]}
            />
          </div>
        ) : null}
      </div>
      {/* {myVideo.current.videoWidth}
      {myVideo.current.videoHeight} */}
    </React.Fragment>
  );
}

export default CheckPanel;
