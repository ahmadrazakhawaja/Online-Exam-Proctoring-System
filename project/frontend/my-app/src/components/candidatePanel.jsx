import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Camera from "./camera";
import Peer from "simple-peer";

function CandidatePanel(props) {
  const [socket, setSocket] = useOutletContext();
  const room = JSON.parse(localStorage.getItem("room-info"));

  const [me, setMe] = useState("");
  const [restart, setrestart] = useState(false);
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
  const data2 = JSON.parse(localStorage.getItem("user-info"));

  // useEffect(() => {
  //   const video = document.createElement("video");
  //   video.srcObject = myVideo.current;
  //   const canvas = document.createElement("canvas");
  //   const context = canvas.getContext("2d");
  //   canvas.width = 500;
  //   canvas.height = 500;
  //   setInterval(function () {
  //     Draw(myVideo.current, context);
  //   }, 30000);
  //   function Draw(video, context) {
  //     context.drawImage(video, 0, 0, context.width, context.height);
  //     socket.emit("media-data", canvas.toDataURL("image/jpeg", 1));
  //   }
  // }, []);

  useEffect(() => {
    // const video = document.createElement("video");
    // video.srcObject = myVideo.current.srcObject;

    const canvas = document.createElement("canvas");
    // const canvas = document.getElementById("preview");
    const context = canvas.getContext("2d");
    canvas.width = 62;
    canvas.height = 62;
    context.width = canvas.width;
    context.height = canvas.height;

    setInterval(() => {
      const video = document.getElementById("video");
      Draw(video);
    }, 30000);

    const Draw = (video) => {
      context.drawImage(video, 0, 0, context.width, context.height);
      // const data = canvas.toDataURL("image/jpeg", 1).split(";base64,")[1];
      const data = canvas.toDataURL("image/jpeg");
      const data2 = data.split(";base64,")[1];
      socket.emit("media-data", data2);
      const imj = document.getElementById("imagex");
      imj.src = data;
    };
  }, []);

  // console.log(socket, props);
  // let videoRef = Camera();
  // function handleCanPlay() {
  //   videoRef.current.play();
  // }
  // let canvas = null;
  // let context = null;

  // useEffect(() => {
  //   let video = document.getElementById("video");
  // video.srcObject = videoRef.current;
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
        connectionRef.current = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
        console.log("hellox");
      });

    // socket.on("me", (id) => {
    //   console.log(id);
    //   setMe(id);
    // });

    // socket.on("get-id", (id) => {
    //   console.log(id);
    //   setIdToCall(id);
    //   // callUser(id);
    // });
    socket.on("callAccepted", (signal) => {
      console.log("recv-2");
      connectionRef.current.signal(signal);
      console.log("signal-done");
      // setCallAccepted(true);
    });

    socket.on("restart", () => {
      console.log("restart");
      connectionRef.current.destroy();
      connectionRef.current = new Peer({
        initiator: true,
        trickle: false,
        stream: myVideo.current.srcObject,
      });
      setrestart((restart) => !restart);
    });
  }, []);

  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }
    if (stream !== undefined) {
      connectionRef.current.on("signal", (data) => {
        console.log("send-1");
        socket.emit("callUser", {
          // userToCall: idToCall,
          signalData: data,
          // user_id: data2.user_id,
          // from: me,
          // name: `${data2.first_name} ${data2.last_name}`,
        });
      });
    }

    // connectionRef.current = peer;
  }, [stream, restart]);

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
                  id="video"
                  ref={myVideo}
                  autoPlay
                  style={{ width: "300px" }}
                />
              )}
            </div>
          </div>
          <img id="imagex" alt="" />
          <canvas style={{ display: "none" }} id="preview"></canvas>
        </div>
      </div>
    </div>
  );
}

export default CandidatePanel;
