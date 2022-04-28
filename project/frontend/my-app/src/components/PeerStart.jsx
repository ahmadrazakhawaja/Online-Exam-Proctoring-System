import React, { useEffect, useState, useRef } from "react";
import { useOutletContext, useMatch } from "react-router-dom";
import Peer from "simple-peer";
import { Outlet } from "react-router";

function PeerStart(props) {
  // const connectionRef = useRef();
  // const { confirmationCode } = useParams();
  const userVideo = useRef();
  const [socket, setSocket] = useOutletContext();

  useEffect(() => {
    
    console.log("here in Peer start");
    const peer = props.data.peer;

    
    console.log("recv-1");
    // console.log(props.data.CallerSignal);
    peer.signal(props.data.CallerSignal);

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.on("signal", (data) => {
      console.log("send-signal2");
      socket.emit("answerCall", { signal: data, to: props.data.caller });
    });
  
  

    return () => {
      peer.destroy();
    };
    // connectionRef.current = peer;
  }, []);

  return (
   
    <div className="video">
      <video
        playsInline
        ref={userVideo}
        autoPlay={true}
        style={{ width: "100%", height:"auto" }}
        muted
      />
    </div>
   
  );
}

export default PeerStart;
