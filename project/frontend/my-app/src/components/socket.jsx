import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import io from "socket.io-client";

// import Messages from "./Messages";
// import MessageInput from "./MessageInput";

function Socket(props) {
  const [socket, setSocket] = useState(null);
  const data2 = JSON.parse(localStorage.getItem("user-info"));
  const data3 = JSON.parse(localStorage.getItem("room-info"));

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`, {
      auth: {
        token: data2.token,
        room: data3._id,
      },
    });
    setSocket(newSocket);
    // newSocket.emit("chat", "hello");
    // return () => newSocket.close();
  }, [setSocket]);
  //   if (socket != null) {
  //     socket.on("connect", () => {
  //       setSocket(socket);
  //     });
  //     socket.on("connect_error", () => {
  //       setSocket(socket);
  //     });
  //   }

  //   if (socket && socket.connected && localStorage.getItem("room-info")) {
  //     return <Outlet {...props} socket={socket} />;
  //   } else {
  //     return <div>Not connnected!</div>;
  //   }

  return (
    <div>
      {socket ? (
        <Outlet {...props} context={[socket, setSocket]} />
      ) : (
        <div>Not connnected!</div>
      )}
    </div>
  );
}

export default Socket;
