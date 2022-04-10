import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Peer from "simple-peer";
import PeerStart from "./PeerStart";
import SideBar from "./admin_dashboard_sub_comp/SideBar";

function Panel(props) {
  const [socket, setSocket] = useOutletContext();
  const room = JSON.parse(localStorage.getItem("room-info"));
  // console.log(socket, props);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const userVideo = useRef();
  const connectionRef = useRef();

  const [peers, setpeers] = useState([]);

  // function handleCanPlay() {
  //   videoRef.current.play();
  // }

  // useEffect(() => {
  //   socket.on("recieve-data", function (data) {
  //     videoRef = data;
  //     console.log(videoRef);
  //   });
  // }, []);

  // socket.on("recieve-data", function (data) {
  //   videoRef = data;
  //   console.log(videoRef);
  // });
  // useEffect(() => {
  //   setInterval(() => {
  //     socket.on("recieve-data", function (data) {
  //       videoRef = data;
  //       // console.log(data);
  //       let img = document.getElementById("play");
  //       img.src = data;
  //     });
  //   }, 0.1);
  // }, []);

  // const answerCall = () => {
  // setCallAccepted(true);
  // useEffect(() => {

  //   });
  // }, [caller, callerSignal, callAccepted]);
  // };

  useEffect(() => {
    // socket.on("disconnectx", (data) => {

    // });
    socket.on("callUser", (data) => {
      console.log("recv-calluser");
      // setCaller(data.from);
      // setCallerSignal(data.signal);
      // answerCall(data);
      // setCallAccepted(true);
      const peer2 = {
        key: peers.length,
        id: data.user_id,
        name: data.name,
        peer: new Peer({
          initiator: false,
          trickle: false,
        }),
        caller: data.from,
        CallerSignal: data.signal,
      };
      setpeers([...peers, peer2]);
    });
  }, []);

  // useEffect(() => {
  //   if (peers.length !== 0) {
  //     const peer = new Peer({
  //       initiator: false,
  //       trickle: false,
  //     });

  //     console.log("recv-1");
  //     peer.signal(callerSignal);

  //     peer.on("signal", (data) => {
  //       console.log("send-signal2");
  //       socket.emit("answerCall", { signal: data, to: caller });
  //     });
  //     peer.on("stream", (stream) => {
  //       userVideo.current.srcObject = stream;
  //     });

  //     connectionRef.current = peer;
  //   }
  // }, [peers]);

  // const answerCall = () => {

  // if (callAccepted === true) {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //   });
  //   peer.signal(callerSignal);

  //   peer.on("signal", (data) => {
  //     socket.emit("answerCall", { signal: data, to: caller });
  //   });
  //   peer.on("stream", (stream) => {
  //     console.log(stream);
  //     userVideo.current.srcObject = stream;
  //   });

  //   connectionRef.current = peer;
  // }

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div> 
    
    <div className="container">
      <div className="row mt-3">
        <div className="col-4">Settings</div>
        <div className="col-4" style={{ textAlign: "center" }}>
          <span>Exam Room</span>
          <span style={{ display: "block" }}>Room ID: {room._id}</span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-3">
          <div className="video-container">
            {/* <div className="video"> */}
            {/* {callAccepted && !callEnded ? (
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay={true}
                  style={{ width: "300px" }}
                  muted
                />
              ) : null} */}
            {peers.map((element) => {
              return <PeerStart data={element} key={element.key} />;
            })}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
    {/* <SideBar /> */}
    </div>
  );
}

export default Panel;
