import React, { useEffect, useState, useRef, useCallback } from "react";
import { useOutletContext, useNavigate, useMatch } from "react-router-dom";
import { Outlet } from "react-router";
import Peer from "simple-peer";
import PeerStart from "./PeerStart";
import BasicTable from "./admin_dashboard_sub_comp/BasicTable";
import SideBar from "./admin_dashboard_sub_comp/SideBar"
import Dashboard from "./admin_dashboard_sub_comp/Dashboard";
import Charts from "./admin_dashboard_sub_comp/Charts";
import VideoCardGrid from "./admin_dashboard_sub_comp/VideoCardGrid";
import "./admin_panel.css";

function Panel(props) {
  const navigate = useNavigate();
  const [socket, setSocket] = useOutletContext();
  const room = JSON.parse(localStorage.getItem("room-info"));
  // console.log(socket, props);
  const [hide, sethide] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const userVideo = useRef();
  const connectionRef = useRef();
  const peers = useRef([]);
  const tracks = useRef([]);

  // const [peer, setpeer] = useState();
  const [peerlist, setpeerlist] = useState([]);
  // const [track, settrack] = useState();
  const [tracklist, settracklist] = useState([]);
  const [log, setlog] = useState("");

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

  const removePeer = (id) => {
    const peer3 = peers.current.filter((element) => {
      if (element.id === id) {
        element.peer.destroy();
        return false;
      }
      return true;
    });
    setpeerlist(() => [...peer3]);
    peers.current = [...peer3];
  };

  useEffect(() => {
    socket.on("disconnectx", (data) => {
      console.log("disconnectx", data);
      removePeer(data);
    });

    socket.on("logging", (data) => {
      setlog((log) => log + data + "\n");
    });

    socket.on("facial-response", (data, id) => {
      // console.log("facial_response", data, id);
      const track2 = {};
      console.log(typeof data);
      track2.facial = parseInt(data * 100);
      track2.id = id;
      console.log(track2);
      settrack(track2);
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

    socket.on("browser-track", (data, id) => {
      console.log("browser-track", data, id);
      const track2 = {};
      track2.browser = data;
      track2.id = id;
      console.log(track2);
      settrack(track2);

      socket.on("Audio-response", (data, id) => {
        console.log("audio-response", data, id);
        const track2 = {};
        track2.audio = data;
        track2.id = id;
        console.log(track2);
        settrack(track2);
      });

      // const index = checkuser(peerlist, id);

      // const peer3 = peerlist.filter((element) => {
      //   if (element.id === peer.id) {
      //     return false;
      //   }
      //   return true;
      // });
      // console.log("peer3", peer3);
      // setpeerlist(() => [...peer3, peer]);const peer3 = peerlist.filter((element) => {
      //   if (element.id === peer.id) {
      //     return false;
      //   }
      //   return true;
      // });
      // console.log("peer3", peer3);
      // setpeerlist(() => [...peer3, peer]);

      /// required
      // if (index === -1) {
      //   console.log("peer object is not available");
      //   console.log("browser", peerlist);
      // } else {
      //   const peer2 = peerlist[index];

      //   peer2.browser = data;

      //   const peer3 = tracklist.filter((element) => {
      //     if (element.id === id) {
      //       return false;
      //     }
      //     return true;
      //   });

      //   if (peerlist.length === 0) {
      //     peer2.key = peerlist.length;
      //   } else {
      //     peer2.key = peerlist[peerlist.length - 1].key + 1;
      //   }

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

      // setpeer({
      //   key: peerlist.length,
      //   id: data.user_id,
      //   name: data.name,
      //   peer: new Peer({
      //     initiator: false,
      //     trickle: false,
      //   }),
      //   caller: data.from,
      //   CallerSignal: data.signal,
      //   facial: null,
      //   browser: null,
      //   audio: null,
      // });
      const peer = {
        key: peerlist.length,
        id: data.user_id,
        name: data.name,
        peer: new Peer({
          initiator: false,
          trickle: false,
        }),
        caller: data.from,
        CallerSignal: data.signal,
        facial: null,
        browser: null,
        audio: null,
      };
      setpeer(peer);
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
    return () => {
      socket.off("callUser");
      socket.off("browser-track");
      socket.off("facial-response");
      socket.off("logging");
      socket.off("disconnectx");
    };
  }, []);

  const setpeer = (peer) => {
    // console.log(peerlist, peerlist.length);
    if (peer !== undefined) {
      // const index = checkuser(peerlist, peer.id);
      if (peers.current.length === 0) {
        peer.key = peers.current.length;
      } else {
        peer.key = peers.current[peers.current.length - 1].key + 1;
      }
      const peer3 = peers.current.filter((element) => {
        if (element.id === peer.id) {
          return false;
        }
        return true;
      });
      // console.log("peer3", peer3);

      setpeerlist(() => [...peer3, peer]);
      peers.current = [...peer3, peer];
      // if (index === -1) {
      //   setpeerlist((peerlist) => [...peer3, peer]);
      // } else {
      //   // let peer3 = peerlist.splice(index, 1);

      //   // console.log("spliced", peer3);
      //   setpeerlist(() => [...peer3, peer]);
      // }
    }
  };

  const settrack = (track) => {
    if (track !== undefined) {
      const index = checkuser(tracks.current, track.id);
      console.log("tracks", tracks.current);

      if (index === -1) {
        let track2 = {
          id: track.id,
        };

        if (track.browser) {
          track2 = { ...track2, browser: track.browser };
        }
        if (track.facial) {
          track2 = { ...track2, facial: track.facial };
        }
        if (track.audio) {
          track2 = { ...track2, audio: track.audio };
        }

        settracklist(() => [...tracks.current, track2]);
        tracks.current = [...tracks.current, track2];
        // console.log("track object is not available");
        // console.log("browser", tracklist);
      } else {
        // console.log("browser update", tracklist);
        let track2 = tracks.current[index];

        if (track.browser) {
          track2 = { ...track2, browser: track.browser };
        }
        if (track.facial) {
          track2 = { ...track2, facial: track.facial };
        }

        if (track.audio) {
          track2 = { ...track2, audio: track.audio };
        }

        const track3 = tracks.current.filter((element) => {
          if (element.id === track.id) {
            return false;
          }
          return true;
        });

        // if (peerlist.length === 0) {
        //   peer2.key = peerlist.length;
        // } else {
        //   peer2.key = peerlist[peerlist.length - 1].key + 1;
        // }

        settracklist(() => [...track3, track2]);
        tracks.current = [...track3, track2];
      }
    }
  };

  useEffect(() => {
    console.log("peerlist", peerlist, peerlist.length);
  }, [peerlist]);

  useEffect(() => {
    console.log("tracklist", tracklist, tracklist.length);
  }, [tracklist]);

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

  // const setconnection = (id) => {
  //   const index = checkuser(peerlist, id);

  //   const peer2 = peerlist[index];

  //   peer2.connection = true;

  //   const peer3 = peerlist.filter((element) => {
  //     if (element.id === id) {
  //       return false;
  //     }
  //     return true;
  //   });

  //   if (peerlist.length === 0) {
  //     peer2.key = peerlist.length;
  //   } else {
  //     peer2.key = peerlist[peerlist.length - 1].key + 1;
  //   }

  //   setpeerlist(() => [...peer3, peer2]);
  // };
  const ExamSettings = () => {
    console.log("hello");
    navigate(`/userpage/exam-room/${room._id}/Exam-Settings`);
  };

  return (
    <React.Fragment>
      {useMatch("/userpage/exam-room/:id/Exam-Settings") ? <Outlet /> : null}
      <div
        className="container"
        style={{
          display: useMatch("/userpage/exam-room/:id/Exam-Settings")
            ? "none"
            : "block",
        }}
      >
        <div className="row mt-3">
          <div className="col-4">
            <button
              className="btn btn-primary"
              onClick={ExamSettings}
              type="submit"
            >
              Settings
            </button>
          </div>
          <div className="col-4" style={{ textAlign: "center" }}>
            <span>Exam Room</span>
            <span style={{ display: "block" }}>Room ID: {room._id}</span>
          </div>
        </div>
<Charts/>
{/* <VideoCardGrid/> */}
        <div className="row justify-content-center">
        <div className="col-8">
            <div className="video-container">
            <div className="card-body">
                                <h3 className="box-title mb-0">All Students</h3>
                            </div>
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
              {/* <div className="row"> */}
              <div className="grid">
                
              {peerlist.map((element) => {
                const index = checkuser(tracklist, element.id);

                if (index === -1) {
                  return (
                    <div key={element.key}>
                      <PeerStart data={element} key={element.key} />
                    </div>
                  );
                }
                return (
                  // <div className="grid"  >
                  <div className= "video-card" key={element.key} style={{ border: "solid" }}>
                    <PeerStart data={element} key={element.key} />
                    <div className="cheating-info">
                      <div className = "name"style={{ textAlign: "center" }}>
                        <span>
                          <b>{element.name}</b>
                        </span>
                      </div>
                      <div>
                        <span>
                          Facial detection:{" "}
                          {tracklist[index].facial && tracklist[index].facial}%
                        </span>
                      </div>
                      <div>
                        <span>
                          Browser Tracking:{" "}
                          {tracklist[index].browser && tracklist[index].browser}
                        </span>
                      </div>
                      <div>
                        <span>
                          Audio Detection:{" "}
                          {tracklist[index].audio && tracklist[index].audio}
                        </span>
                      </div>
                    </div>
                  </div>
                  
      
                );
              })}
 
              {/* </div> */}
              
            </div>
            </div>
            </div>
            <div className="col-4">
                      <div className="box">
                      <div className="chat-room">
                        <aside className="tengah-side">
                            <div className="card-body">
                                <h3 className="box-title mb-0">Live Transcriptions</h3>
                            </div>
        
                            <div className="group-rom">
                    <div className="first-part odd">Jonathan Smith</div>
                    <div className="second-part">Hello Cendy are you there?</div>
                    <div className="third-part">12:30</div>
                </div>
                <div className="group-rom">
                    <div className="first-part">Cendy Andrianto</div>
                    <div className="second-part">Yoman Smith. Please proceed</div>
                    <div className="third-part">12:31</div>
                </div>
                <div className="group-rom">
                    <div className="first-part odd">Jonathan Smith</div>
                    <div className="second-part">I want to share a file using chatroom</div>
                    <div className="third-part">12:32</div>
                </div>
                <div className="group-rom">
                    <div className="first-part">Cendy Andrianto</div>
                    <div className="second-part">oh sure. please send</div>
                    <div className="third-part">12:32</div>
                </div>
                                </aside>
                                </div>
                               </div>
                              </div>
        </div>
        <div className="row mt-3">
          <div className="col-12"> 
          <div id  = "Border"
               style={{ textAlign: "center", backgroundColor: "#212529" }}>
                <span style={{ color: "white" }}>
                  <b>Exam Log</b>
                </span>
                {/* <hr style={{ marginTop: "2px", marginBottom: "2px" }} /> */}
              </div>
            <div
              id="examLog"
              style={{
                //position: "fixed",
                marginBottom: "5%",
                bottom: "70px",
                overflow: "scroll",
                overflowX : "hidden",
                height: "200px",
                border: "solid",
                left: "5%",
                right: "5%",
                padding : "7px",
                whiteSpace: "break-spaces",
              }}
            >
              
              {log}
            </div>
          </div>
        </div>
      </div>

      {/* <Sidebar/> */}
    </React.Fragment>
  );
}

export default Panel;
