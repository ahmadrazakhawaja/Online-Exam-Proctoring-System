import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Camera from "./camera";
import Peer from "simple-peer";

function CandidatePanel(props) {
  const [socket, setSocket] = useOutletContext();
  const room = JSON.parse(localStorage.getItem("room-info"));

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const userVideo = useRef();
  const connectionRef = useRef();
  const firstUpdate = useRef(true);
  const peer = useRef(null);

  // console.log(socket, props);
  // let videoRef = Camera();
  // function handleCanPlay() {
  //   videoRef.current.play();
  // }
  // let canvas = null;
  // let context = null;

  // useEffect(() => {
  //   let video = document.getElementById("video");
  //   // video.srcObject = videoRef.current;
  //   let canvas = document.getElementById("preview");
  //   let context = canvas.getContext("2d");
  //   canvas.width = 300;
  //   canvas.height = 300;

  //   context.width = canvas.width;
  //   context.height = canvas.height;

  //   setInterval(function () {
  //     Draw(video, context);
  //   }, 0.1);
  //   function Draw(video, context) {
  //     context.drawImage(video, 0, 0, context.width, context.height);
  //     socket.emit("media-data", canvas.toDataURL("image/webp"));
  //   }
  // }, []);

  // useEffect(() => {

  // }, [idToCall, me]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      console.log(id);
      setMe(id);
    });

    socket.on("get-id", (id) => {
      console.log(id);
      setIdToCall(id);
      // callUser(id);
    });
  }, []);

  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }

    if (stream !== undefined) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peer.on("signal", (data) => {
        console.log("send-1");
        socket.emit("callUser", {
          userToCall: idToCall,
          signalData: data,
          from: me,
        });
      });
      socket.on("callAccepted", (signal) => {
        console.log("recv-2");
        peer.signal(signal);
        console.log("signal-done");
        // setCallAccepted(true);
      });
    }

    connectionRef.current = peer;
  }, [idToCall, stream]);

  // const callUser = (id) => {
  //   console.log(me);
  // };
  // const callUser = (id) => {

  // };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  // console.log(canvas);

  // useEffect(() => {
  //   socket.emit("media-data", videoRef);
  // }, [videoRef]);
  // console.log(videoRef);
  // setInterval(() => {
  //   socket.emit("media-data", videoRef);
  // }, 2000);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-4" style={{ textAlign: "center" }}>
          <span>Exam Room</span>
          <span style={{ display: "block" }}>Room ID: {room._id}</span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-3">
          {/* <canvas style="display:none" id="preview"></canvas> */}
          {/* <video
            src={videoRef.current}
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay={true}
            playsInline
            id="video"
            muted
          /> */}
          <div className="video-container">
            <div className="video">
              {stream && (
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  style={{ width: "300px" }}
                />
              )}
            </div>
          </div>
          {/* <canvas style={{ display: "none" }} id="preview"></canvas> */}
        </div>
      </div>
    </div>
  );
}

export default CandidatePanel;
