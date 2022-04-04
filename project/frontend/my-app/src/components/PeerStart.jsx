import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Peer from "simple-peer";

function PeerStart(props) {
  const connectionRef = useRef();
  const userVideo = useRef();
  const [socket, setSocket] = useOutletContext();

  useEffect(() => {
    console.log("here in Peer start");
    const peer = props.data.peer;

    console.log("recv-1");
    // console.log(props.data.CallerSignal);
    peer.signal(props.data.CallerSignal);

    peer.on("signal", (data) => {
      console.log("send-signal2");
      socket.emit("answerCall", { signal: data, to: props.data.caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    connectionRef.current = peer;
  }, []);

  return (
    <div className="video">
      <video
        playsInline
        ref={userVideo}
        autoPlay={true}
        style={{ width: "300px" }}
        muted
      />
      {props.data.facialresponse}
    </div>
  );
}

export default PeerStart;
