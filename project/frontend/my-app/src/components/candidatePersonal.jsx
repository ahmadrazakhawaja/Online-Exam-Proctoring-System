import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function CandidatePersonal(props) {
  const room = JSON.parse(localStorage.getItem("room-info"));
    const userVideo = useRef();
    const navigate = useNavigate();
    const [peer, track ,removePeer, TagPeer] = useOutletContext();
    const [modal, setmodal] = useState(false);
    console.log('this is candidate personal');

    useEffect(() => {
        console.log(peer);
        
            userVideo.current.srcObject = peer.peer._remoteStreams[0];

    },[])

    const back = () => {
      
      navigate(`/userpage/exam-room/${room._id}`);
    }

    const displayModal = () => {
      if (modal) {
        return (
          <div
            className="modal fade show"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            model="true"
            role="dialog"
            style={{ display: "block", opacity: "1 !important" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    End Exam
                  </h5>
                  {/* <button
                type="button"
                className="btn-close"
                onClick={() => {
                  props.image.element.target.value = null;
                  // props.reset({ pic: "" });
                  props.setimage(false);
                  return false;
                }}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
                </div>
                <div className="modal-body">
                  Are you sure you want to remove this Candidate?
                  {/* <img
                style={{
                  objectFit: "contain",
                  width: "100%",
                }}
                src={props.image.image}
              ></img> */}
              
                </div>
                <div className="modal-footer">
                  <button
                    // onClick={() => props.navigate("/login")}
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setmodal(false)}
                  >
                    No
                  </button>
                  <button
                    // onClick={() => props.navigate("/login")}
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removePeer(peer.id,peer.name)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    };
    
    useEffect(() => {
      document.body.style.backgroundColor = "hsl(210, 12%, 90%)";
  
      return () => {
        document.body.style.backgroundColor = "white";
      };
  
    },[])

        return(
          <React.Fragment>
            {displayModal()}
            <div style={{display: 'flex',overflow: 'scroll',flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'}}>
        <div style={{ marginBottom: '100px', width: '80%' ,backgroundColor: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}}>
          <div className="container" style={{ opacity: modal ? "0.2" : "1" }}>
            <div className="row mt-3">
          <div className="col-4">
            <button
              className="btn btn-primary"
              onClick={back}
              type="submit"
            >
              Back
            </button>
          </div>
          <div className="col-4" style={{ textAlign: "center" }}>
            <span>{peer.name}</span>
            <span style={{ display: "block" }}>Roll Number: {peer.rollNum}</span>
            <span style={{ display: "block",fontWeight: 'bold' }}>{track && track.tag ? 'tagged' : null}</span>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
          <div className="video">
            <video
              playsInline
              ref={userVideo}
              autoPlay={true}
              style={{ width: "100%", height:"300px" }}
              muted
            />
          </div>
          </div>
        </div>
        <div className="row mt-3" style={{ textAlign: "center" }}>
          <div className="col-4" >
          <div className="facial">
          <span>Facial Detection</span>
          <span style={{ display: "block", fontWeight: 'bold' }}>{track && track.facial ? track.facial : null}</span>
          </div>
          </div>
          <div className="col-4">
          <div className="facial">
          <span>Audio Detection</span>
          <span style={{ display: "block",fontWeight: 'bold' }}>{track && track.audio ? track.audio : null}</span>
          </div>
          </div>
          <div className="col-4">
          <div className="facial">
          <span>Browser</span>
          <span style={{ display: "block",fontWeight: 'bold' }}>{track && track.browser ? track.browser : null}</span>
          </div>
          </div>
        </div>
        <div className="row mt-5 mb-3" style={{ textAlign: "center" }}>
        <div className="col-6">
        <button
              className="btn btn-primary"
              onClick={() => TagPeer(peer.id,peer.name)}
            >
              {track && track.tag ? 'Untag Candidate' : 'Tag Candidate'}
            </button>
          </div>
          <div className="col-6">
        <button
              className="btn btn-danger"
              onClick={() => setmodal(true)}
            >
              Remove Candidate
            </button>
          </div>
          </div>
           
          </div>
          </div>
          </div>
          </React.Fragment>
        );

}
