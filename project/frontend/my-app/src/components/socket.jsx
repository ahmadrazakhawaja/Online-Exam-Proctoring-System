import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import io from "socket.io-client";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";

function Socket(props) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`);
    setSocket(newSocket);
    // newSocket.emit("chat", "hello");
    return () => newSocket.close();
  }, [setSocket]);

  if (socket) {
    return <Outlet {...props} />;
  } else {
    return <div>Socket unable to connect!</div>;
  }
}

export default Socket;
