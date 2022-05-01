import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import io from "socket.io-client";


// import Messages from "./Messages";
// import MessageInput from "./MessageInput";

function Socket(props) {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const data2 = JSON.parse(localStorage.getItem("user-info"));
  const data3 = JSON.parse(localStorage.getItem("room-info"));

  useEffect(() => {
    if(data3 && data2){
    // const newSocket = io(`http://${window.location.hostname}:5000`, {
    //   auth: {
    //     token: data2.token,
    //     room: data3._id,
    //   },
    // });
    const newSocket = io(process.env.REACT_APP_API_URL, {
      auth: {
        token: data2.token,
        room: data3._id,
      },
    });
    // process.env.REACT_APP_API_URL
  
    setSocket(newSocket);
  
    // newSocket.emit("chat", "hello");
    return () => newSocket.close()
  }
  else{
    navigate('/userpage');
  }
  }, []);
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
