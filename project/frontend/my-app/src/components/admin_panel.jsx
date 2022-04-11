import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Peer from "simple-peer";
import PeerStart from "./PeerStart";
import BasicTable from "./admin_dashboard_sub_comp/BasicTable";
import SideBar from "./admin_dashboard_sub_comp/SideBar"
import Dashboard from "./admin_dashboard_sub_comp/Dashboard";

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

  const [peer, setpeer] = useState();
  const [peerlist, setpeerlist] = useState([]);

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
  // useEffect(() => {
  //   console.log(peers);
  // }, [peers]);

  function checkuser(list, user) {
    let tmp = null;
    for (let i = 0; i < list.length; i++) {
      tmp = list[i];
      if (tmp.id === user) {
        return i;
      }
    }
    return -1;
  }

  useEffect(() => {
    socket.on("disconnectx", (data) => {
      console.log("disconnectx", data);
    });

    socket.on("facial-response", (data, id) => {
      console.log("facial_response", data, id);
      // const index = checkuser(peerlist, id);
      // if (index !== -1) {
      //   // peerlist[index].facialresponse = parseFloat(data);
      //   const peer2 = peerlist[index];
      //   if (peerlist.length === 0) {
      //     peer2.key = peerlist.length;
      //   } else {
      //     peer2.key = peerlist[peerlist.length - 1].key + 1;
      //   }
      //   const peer3 = peerlist.filter((element) => {
      //     if (element.id === peer2.id) {
      //       return false;
      //     }
      //     return true;
      //   });
      //   // console.log("peer3", peer3);
      //   setpeerlist(() => [...peer3, peer2]);
      // }
    });
    socket.on("callUser", (data) => {
      console.log("recv-calluser");
      // setCaller(data.from);
      // setCallerSignal(data.signal);
      // answerCall(data);
      // setCallAccepted(true);

      // console.log(data);
      // const index = checkuser(data.user_id);

      setpeer({
        key: peerlist.length,
        id: data.user_id,
        name: data.name,
        peer: new Peer({
          initiator: false,
          trickle: false,
        }),
        caller: data.from,
        CallerSignal: data.signal,
        facialresponse: null,
      });
      // else {
      //   console.log("edit element");
      //   const peer2 = {
      //     key: peers.length,
      //     id: data.user_id,
      //     name: data.name,
      //     peer: new Peer({
      //       initiator: false,
      //       trickle: false,
      //     }),
      //     caller: data.from,
      //     CallerSignal: data.signal,
      //   };
      //   let peer3 = peers.splice(index, 1);
      //   peer3 = peer3.concat(peer2);
      //   setpeers(peer3);
      // }
    });
  }, []);

  useEffect(() => {
    // console.log(peerlist, peerlist.length);
    if (peer !== undefined) {
      // const index = checkuser(peerlist, peer.id);
      if (peerlist.length === 0) {
        peer.key = peerlist.length;
      } else {
        peer.key = peerlist[peerlist.length - 1].key + 1;
      }
      const peer3 = peerlist.filter((element) => {
        if (element.id === peer.id) {
          return false;
        }
        return true;
      });
      console.log("peer3", peer3);
      setpeerlist(() => [...peer3, peer]);
      // if (index === -1) {
      //   setpeerlist((peerlist) => [...peer3, peer]);
      // } else {
      //   // let peer3 = peerlist.splice(index, 1);

      //   // console.log("spliced", peer3);
      //   setpeerlist(() => [...peer3, peer]);
      // }
    }
  }, [peer]);

  useEffect(() => {
    console.log("peerlist", peerlist, peerlist.length);
  }, [peerlist]);

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
            {peerlist.map((element) => {
              return <PeerStart data={element} key={element.key} />;
            })}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
    {/* {<BasicTable />} */}
    {<Dashboard />}
    {/* {<SideBar />}  */}
    </div>
  );
}

export default Panel;
