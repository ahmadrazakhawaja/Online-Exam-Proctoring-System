import React, { useEffect, useState, useRef, useCallback } from "react";
import { useOutletContext, useNavigate, useMatch, useParams } from "react-router-dom";
import { Outlet } from "react-router";
import Peer from "simple-peer";
import PeerStart from "./PeerStart";
import BasicTable from "./admin_dashboard_sub_comp/BasicTable";
import SideBar from "./admin_dashboard_sub_comp/SideBar";
import Dashboard from "./admin_dashboard_sub_comp/Dashboard";
import Charts from "./admin_dashboard_sub_comp/Charts";
import VideoCardGrid from "./admin_dashboard_sub_comp/VideoCardGrid";
import "./admin_panel.css";
import Alert from "./alert";

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
  const [alert, setalert] = useState(false);
  const [hover, sethover] = useState(false);
  const [length, setlength] = useState(0);
  const [lastCandidate, setlastCandidate] = useState("");
  const [peerTransfer, setTransfer] = useState(false);
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
    console.log(list.length);
    for (let i = 0; i < list.length; i++) {
      tmp = list[i];
      if (tmp.id === user) {
        return i;
      }
    }
    return -1;
  }

  const removePeer = (id,name) => {
    const peer3 = peers.current.filter((element) => {
      if (element.id === id) {
        element.peer.destroy();
        return false;
      }
      return true;
    });
    const track3 = tracks.current.filter((element) => {
      if (element.id === id) {
        return false;
      }
      return true;
    });
    setlength(tracks.current.length);
    if(name){
    socket.emit('remove-client',id,name);
    }
    
    peers.current = [...peer3]
    tracks.current = [...track3];
    setlength(peers.current.length);
    settracklist(() => [...track3]);
    setpeerlist(() => [...peer3]);
    navigate(`/userpage/exam-room/${room._id}`);
    
  };

  const tagPeer = (id,name) => {
    const index = checkuser(tracks.current,id);
    let track2 = null;
    if(index !== -1){
      track2 = tracks.current[index];
      if(track2.tag){
        track2 = { ...track2, tag: !track2.tag };
        if(track2.tag === false){
          socket.emit('tag-admin',id,name,'untagged');
        }
        else{
          socket.emit('tag-admin',id,name,'tagged');
          setlastCandidate(name);
        }
        
      }
      else{
      track2 = { ...track2, tag: true };
      socket.emit('tag-admin',id,name,'tagged');
      setlastCandidate(name);
      }
    }
    else{
      track2 = { id: id, tag: true };
      socket.emit('tag-admin',id,name,'tagged');
      setlastCandidate(name);
    }
    const track3 = tracks.current.filter((element) => {
      if (element.id === id) {
        return false;
      }
      return true;
    });

    
      settracklist(() => [...track3, track2]);
    tracks.current = [...track3, track2];
    
    


  }

  useEffect(() => {
    socket.on("disconnectx", (data) => {
      console.log("disconnectx", data);
      removePeer(data);
    });

    socket.on("logging", (data) => {
      setlog((log) => log + data + "\n");
    });

    socket.on("facial-response", (data, id,name) => {
      // console.log("facial_response", data, id);
      const track2 = {};
      console.log(typeof data);
      track2.facial = parseInt(data * 100);
      track2.id = id;
      console.log(track2);
      settrack(track2,name);
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

    const roomEnd = () => {
      setalert("Room has been closed by the admin");
      
      setTimeout(() => {
        navigate("/userpage");
        localStorage.removeItem("room-info");
      }, 5000);
    };
    socket.on("room-end", roomEnd);

    socket.on("browser-track", (data, id,name) => {
      console.log("browser-track", data, id);
      const track2 = {};
      track2.browser = data;
      track2.id = id;
      console.log(track2);
      settrack(track2,name);
    });

      socket.on("Audio-response", (data, id,name) => {
        console.log("audio-response", data, id);
        const track2 = {};
        track2.audio = data;
        track2.id = id;
        console.log(track2);
        settrack(track2,name);
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
        rollNum: data.rollNum,
        peer: new Peer({
          initiator: false,
          trickle: false,
          config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }, 
          {
            url: 'turn:54.227.23.157:3478',
            credential: 'test123',
            username: 'test',
          },
          { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    {
      url: 'turn:turn.bistri.com:80',
      credential: 'homeo',
      username: 'homeo',
    },
    {
      url: 'turn:turn.anyfirewall.com:443?transport=tcp',
      credential: 'webrtc',
      username: 'webrtc',
    }] },
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
      console.log('in return');
      socket.off("callUser");
      socket.off("browser-track");
      socket.off("facial-response");
      socket.off("logging");
      socket.off("disconnectx");
      socket.off("room-end", roomEnd);
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
      setlength(peers.current.length);
      // if (index === -1) {
      //   setpeerlist((peerlist) => [...peer3, peer]);
      // } else {
      //   // let peer3 = peerlist.splice(index, 1);

      //   // console.log("spliced", peer3);
      //   setpeerlist(() => [...peer3, peer]);
      // }
    }
  };

  const calculateScore = (track,track2) => {
    const room2 = JSON.parse(localStorage.getItem("room-info"));
    // let track2 = tracks.current[index];
    let count = 0;

    let totalScore = 0;
    if(room2.facialDetection){
      count = count + 1;
      if(track.facial){
        totalScore = totalScore + parseInt(track.facial);
      }
      else{
        if(track2.facial){
          totalScore = totalScore + parseInt(track2.facial);
        }
      }
    }
    if(room2.browserTracking){
      count = count + 1;
      if(track.browser){
        if(track.browser === 'cheating'){
          totalScore = totalScore + 100;
        }
      }
      else{
        if(track2.browser){
          if(track2.browser === 'cheating'){
            totalScore = totalScore + 100;
          }
        }
      }
    }

    if(room2.audioDetection){
      count = count + 1;
      if(track.audioDetection){
        if(track.audioDetection === 'low'){
          totalScore = totalScore + 33;
        }
        if(track.audioDetection === 'medium'){
          totalScore = totalScore + 66;
        }
        if(track.audioDetection === 'high'){
          totalScore = totalScore + 100;
        }
      }
      else{
        if(track2.audioDetection){
          if(track2.audioDetection === 'low'){
            totalScore = totalScore + 33;
          }
          if(track2.audioDetection === 'medium'){
            totalScore = totalScore + 66;
          }
          if(track2.audioDetection === 'high'){
            totalScore = totalScore + 100;
          }
        }
      }
    }
    const result ={};
    if(count === 3){
      if(totalScore > 200){
        result.score = totalScore;
        result.tag = true;
      }
      else{
        result.score = totalScore;
        result.tag = false;
      }
    }
    else if(count === 2){
      if(totalScore > 150){
        result.score = totalScore;
        result.tag = true;
      }
      else{
        result.score = totalScore;
        result.tag = false;
      }
    }
    else if(count === 1){
      if(totalScore > 70){
        result.score = totalScore;
        result.tag = true;
      }
      else{
        result.score = totalScore;
        result.tag = false;
      }
    }
    else{
      result.score = totalScore;
        result.tag = false;
    }
    return result;

    
  }

  const settrack = (track,name) => {
    if (track !== undefined) {
      const index = checkuser(tracks.current, track.id);
      console.log("tracks", tracks.current);
      
      if (index === -1) {
        let track2 = {
          id: track.id,
          // tag: Score.tag,
          // score: Score.score
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

        const Score = calculateScore(track,index);


        track2 = { ...track2, score: Score.score, tag: Score.tag  };

        if(Score.tag === true){
          setlastCandidate(name);
          socket.emit('tag-system',track2.id,name);
        }


        settracklist(() => [...tracks.current, track2]);
        tracks.current = [...tracks.current, track2];
        // console.log("track object is not available");
        // console.log("browser", tracklist);
      } else {
        // console.log("browser update", tracklist);
        let track2 = tracks.current[index];
        const Score = calculateScore(track,track2);
        track2 = { ...track2, score: Score.score };

        if(!('tag' in track2) || track2.tag === false){
          track2 = { ...track2, tag: Score.tag };
          if(Score.tag === true){
            setlastCandidate(name);
            socket.emit('tag-system',track2.id,name);
          }
          
        }
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

        // sortPeer(Score.score,track.id);

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

  // const sortPeer = (score,id) => {
  //   tracks.current.sort((a,b) => b.score - a.score);

  //   for(let i = 0; i < peers.current.length ; i++){
  //     const tmp = peers.current[i];
      
  //   }
  // }

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

  const userStream = (id) => {
    // console.log("hello");
    navigate(`/userpage/exam-room/${room._id}/${id}`);
  };

  const findCheat = () => {
    let count = 0;
    let sum = 0
    for(let i=0; i < tracks.current.length; i++){
      if(tracks.current[i].score){
        sum = sum + tracks.current[i].score;
      }
      if(tracks.current[i].tag === true){
        count ++;

      }
    }

    let count2 = 0
    const room2 = JSON.parse(localStorage.getItem("room-info"));

    if(room2.audioDetection){
      count2 = count2 + 100;
    }

    if(room2.browserTracking){
      count2 = count2 + 100;
    }

    if(room2.facialDetection){
      count2 = count2 + 100;
    }

    let average = 0;
    if(tracks.current.length !== 0 && sum !== 0){
      average = sum / tracks.current.length;
    }
    
    console.log(average, sum,tracks.current.length);
    return [count,Math.round(average),count2];
  }

    const { id2 } = useParams();
    let index = 0;
    let index2 = 0;
    if(useMatch("/userpage/exam-room/:id/:id2")){
      console.log(id2);
      index = checkuser(peers.current,id2);
      index2 = checkuser(tracks.current,id2)
      console.log(index);
      console.log(peerlist[index]);
    }
  

  return (
    <React.Fragment>
      {alert ? <Alert alert={alert} setalert={setalert} /> : null}
      {useMatch("/userpage/exam-room/:id/Exam-Settings") ? (
        <Outlet {...props} context={[socket, setSocket]} />
      ) : null}
      {useMatch("/userpage/exam-room/:id/Exam-Settings") ? null : (<Outlet context={[peers.current[index], tracks.current[index2] ,removePeer, tagPeer]} />
)}
      <div
        className="container"
        style={{
          display: useMatch("/userpage/exam-room/:id/Exam-Settings")
            ? "none"
            : "block",
            display: useMatch("/userpage/exam-room/:id/:id2")
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
            <span style={{fontSize: '20px', fontWeight: 'bold'}}>Exam Room</span>
            <span style={{ display: "block" }}>Room ID: <b>{room && room._id}</b></span>
          </div>
        </div>

        <Charts  last={lastCandidate} candidate={length} cheating={findCheat()}/>

{/* <VideoCardGrid/> */}

        <div className="row justify-content-center">
          <div className="col-12">
            <div className="video-container">
              <div className="card-body">
                <h3 className="box-title mb-3">All Students</h3>

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
                <div className="row">
                  {peerlist.map((element) => {
                    const index = checkuser(tracklist, element.id);

                    if (index === -1) {
                      return (
                        <div className="col-4" key={element.key}>
                          <div
                            className="video-card"
                            style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}} onClick={() => userStream(element.id)}
                          >
                            <PeerStart data={element} key={element.key} />
                            <div>
                            <div
                              className="cheating-info"
                              style={{ textAlign: "center" }}
                            >
                              <span>
                                <b>{element.name}</b>{' '} <b>{element.rollNum}</b>
                              </span>
                            </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="col-4" key={element.key}>
                        <div className="video-card" style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px', backgroundColor: tracklist[index].tag ? 'gray' : null }} onClick={() => userStream(element.id)}>
                          <PeerStart data={element}  key={element.key}/>
                          <div>
                            <div
                              className="cheating-info"
                              style={{ textAlign: "center" }}
                            >
                              <span>
                              <b>{element.name}</b>{' '} <b>{element.rollNum}</b>
                              </span>
                            </div>
                            <div className="row mt-3" style={{textAlign: 'center'}}>
                              {room.facialDetection &&
                              <div className="col">
                              <div id="camera" className="icon" style={{borderTop: '2px solid black',borderBottom: '2px solid black',paddingTop: '4%',paddingBottom: '4%'}}>

                                  <img src = "/Camera.png"
                                  style={{width : 30, height :30}}></img>
                                  </div>
                                  <div>
                              <span>
                              {room.facialDetection && 'Facial: '}
                              <div>
                              <b>
                                {room.facialDetection && tracklist[index].facial &&
                                  tracklist[index].facial}
                                {room.facialDetection && '%'}
                                </b>
                                </div>
                              </span>
                            </div>
                                </div>
                  }
                  {room.browserTracking && 
                                <div className="col">
                              <div id="Browser" className="icon" style={{borderTop: '2px solid black',borderBottom: '2px solid black',paddingTop: '4%',paddingBottom: '4%'}}>

                                  <img src = "/Browser.png"
                                  style={{width : 30, height :30}}></img>
                                  </div>
                                  <div>
                              <span>
                                {room.browserTracking && 'Browser: '}
                                <div> 
                                <b>
                                {room.browserTracking && tracklist[index].browser &&
                                  tracklist[index].browser}
                                  </b>
                                  </div>
                              </span>
                            </div>
                                </div>
                  }
                  {room.audioDetection && 
                                <div className="col">
                              <div id="mic" className="icon" style={{borderTop: '2px solid black',borderBottom: '2px solid black',paddingTop: '4%',paddingBottom: '4%'}}>

                                  <img src = "/microphone.png"
                                  style={{width : 30, height :30}}></img>
                                  </div>
                                  <div>
                              <span>
                              {room.audioDetection && 'Audio: '}
                              <div> 
                              <b>
                              
                                { room.audioDetection && tracklist[index].audio &&
                                  tracklist[index].audio}
                                  </b>
                                  </div>
                              </span>
                            </div>
                                </div>
                  }
                            </div>
                            {/* <div>
                              <span>
                              {room.facialDetection && 'Facial detection: '}
                                {room.facialDetection && tracklist[index].facial &&
                                  tracklist[index].facial}
                                {room.facialDetection && '%'}
                              </span>
                            </div>
                            <div>
                              <span>
                                {room.browserTracking && 'Browser Tracking: '}
                                {room.browserTracking && tracklist[index].browser &&
                                  tracklist[index].browser}
                              </span>
                            </div>
                            <div>
                              <span>
                              {room.audioDetection && 'Audio Detection: '}
                                { room.audioDetection && tracklist[index].audio &&
                                  tracklist[index].audio}
                              </span>
                            </div> */}
                            <div style={{textAlign: 'center'}}>
                              <span>
                                <b>
                                {tracklist[index].tag ? 'Tagged' : null}
                                </b>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* <div className="col-4">
              <div className="box">
                <div className="chat-room">
                  <aside className="tengah-side">
                    <div className="card-body">
                      <h3 className="box-title mb-0">Live Transcriptions</h3>
                    </div>

                    <div className="group-rom">
                      <div className="first-part odd">Jonathan Smith</div>
                      <div className="second-part">
                        Hello Cendy are you there?
                      </div>
                      <div className="third-part">12:30</div>
                    </div>
                    <div className="group-rom">
                      <div className="first-part">Cendy Andrianto</div>
                      <div className="second-part">
                        Yoman Smith. Please proceed
                      </div>
                      <div className="third-part">12:31</div>
                    </div>
                    <div className="group-rom">
                      <div className="first-part odd">Jonathan Smith</div>
                      <div className="second-part">
                        I want to share a file using chatroom
                      </div>
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
            </div> */}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div
              id="Border"
              style={{ textAlign: "center", backgroundColor: "#212529" }}
            >
              <span style={{ color: "white" }}>
                <b>Exam Log</b>
              </span>
              {/* <hr style={{ marginTop: "2px", marginBottom: "2px" }} /> */}
            </div>
            <div
              id="examLog"
              style={{
                // marginTop: "5%",
                // marginBottom: "5%",
                // position: "fixed",
                //position: "fixed",
                marginBottom: "5%",
                bottom: "70px",
                overflow: "scroll",
                overflowX: "hidden",
                height: "200px",
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                left: "5%",
                right: "5%",
                padding: "7px",
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
