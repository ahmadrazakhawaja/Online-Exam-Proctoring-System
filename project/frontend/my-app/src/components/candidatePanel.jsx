import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Peer from "simple-peer";

function CandidatePanel(props) {
  const [socket, setSocket] = useOutletContext();
  const room = JSON.parse(localStorage.getItem("room-info"));

  // const [me, setMe] = useState("");
  const [restart, setrestart] = useState(false);
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const canvasRef = useRef();
  // const [receivingCall, setReceivingCall] = useState(false);
  // const [caller, setCaller] = useState("");
  // const [callerSignal, setCallerSignal] = useState();
  // const [callAccepted, setCallAccepted] = useState(false);
  // const [idToCall, setIdToCall] = useState("");
  // const [callEnded, setCallEnded] = useState(false);
  // const [name, setName] = useState("");
  // const userVideo = useRef();
  const connectionRef = useRef();
  // const firstUpdate = useRef(true);
  const peer = useRef(null);
  // const data2 = JSON.parse(localStorage.getItem("user-info"));

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

  // useEffect(() => {
  //   // const video = document.createElement("video");
  //   // video.srcObject = myVideo.current.srcObject;
  // }, []);

  ////////
  const recordAudio = () => {
    return new Promise(async (resolve) => {
      // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioStream = new MediaStream(stream.getAudioTracks());
      const mediaRecorder = new MediaRecorder(audioStream);
      let audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      const start = () => {
        audioChunks = [];
        return mediaRecorder.start();
      };

      const stop = () =>
        new Promise((resolve) => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            // console.log(audio, audioUrl, audioBlob);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });
  };

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  let audioInterval = null;
  ////////
  useEffect(async () => {
    // const audioStream = new MediaStream(
    //   myVideo.current.srcObject.getAudioTracks()
    // );
    if (stream !== undefined) {
      const recorder = await recordAudio();
      recorder.start();
      console.log("recorder started");
      await sleep(5000);
      const audio = await recorder.stop();
      console.log("recorder stopped");
      socket.emit("audio", audio.audioBlob);
      // audio.play();
      console.log("played");

      audioInterval = setInterval(async () => {
        recorder.start();
        console.log("recorder started");
        await sleep(5000);
        const audio = await recorder.stop();
        console.log("recorder stopped");
        socket.emit("audio", audio.audioBlob);
        // audio.play();
        console.log("played");
      }, 15000);
    }
  }, [stream]);

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
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
        connectionRef.current = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
        console.log("hellox");
      })
      .catch(function (err) {
        console.log(err);
      });

    const visibleChange = (event) => {
      if (document.visibilityState !== "visible") {
        console.log("tab is inactive");
        socket.emit("browser-track", "cheating");
      } else {
        console.log("tab is active");
        socket.emit("browser-track", "not cheating");
      }
    };

    document.addEventListener("visibilitychange", visibleChange);

    // const canvas = document.getElementById("preview");
    // canvas.width = 62;
    // canvas.height = 62;
    // context.width = canvas.width;
    // context.height = canvas.height;

    const context = canvasRef.current.getContext("2d");
    context.width = 62;
    context.height = 62;

    const imginterval = setInterval(() => {
      context.drawImage(myVideo.current, 0, 0, context.width, context.height);
      canvasRef.current.toBlob(
        (blob) => socket.emit("media-data", blob),
        "image/jpeg",
        1
      );

      // context.clearRect(0, 0, context.width, context.width);
    }, 5000);

    // const Draw = (video) => {
    //   context.drawImage(video, 0, 0, context.width, context.height);
    //   // const data = canvas.toDataURL("image/jpeg", 1).split(";base64,")[1];
    //   const data = canvas.toDataURL("image/jpeg");
    //   const data2 = data.split(";base64,")[1];
    //   socket.emit("media-data", data2);
    //   const imj = document.getElementById("imagex");
    //   imj.src = data;
    // };

    // socket.on("me", (id) => {
    //   console.log(id);
    //   setMe(id);
    // });

    // socket.on("get-id", (id) => {
    //   console.log(id);
    //   setIdToCall(id);
    //   // callUser(id);
    // });

    // const callAccepted =

    const signal = (signal) => {
      try {
        console.log("recv-2");
        connectionRef.current.signal(signal);
        console.log("signal-done");
        // setCallAccepted(true);
      } catch (err) {
        console.log(err);
      }
    };
    socket.on("callAccepted", signal);

    const restart = () => {
      try {
        console.log("restart");
        connectionRef.current.destroy();
        connectionRef.current = new Peer({
          initiator: true,
          trickle: false,
          stream: myVideo.current.srcObject,
        });
        setrestart((restart) => !restart);
      } catch (err) {
        console.log(err);
      }
    };
    socket.on("restart", restart);

    // const destroy = () => {
    //   connectionRef.current.destroy();
    // };
    return () => {
      const peer = connectionRef.current;
      peer.destroy();
      connectionRef.current = null;
      socket.off("callAccepted", signal);
      socket.off("restart", restart);
      clearInterval(imginterval);
      clearInterval(audioInterval);
      console.log("cleanup");
      document.removeEventListener("visibilitychange", visibleChange);
    };
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

  // const leaveCall = () => {
  //   setCallEnded(true);
  //   connectionRef.current.destroy();
  // };

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
          <canvas
            style={{ display: "block" }}
            ref={canvasRef}
            width={62}
            height={62}
          />
          <canvas style={{ display: "none" }} id="preview"></canvas>
        </div>
      </div>
    </div>
  );
}

export default CandidatePanel;
