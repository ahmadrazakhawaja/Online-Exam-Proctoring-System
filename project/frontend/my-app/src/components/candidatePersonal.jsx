import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function CandidatePersonal(props) {
  const room = JSON.parse(localStorage.getItem("room-info"));
    const userVideo = useRef();
    const navigate = useNavigate();
    const [peer, track ,removePeer, TagPeer] = useOutletContext();
    console.log('this is candidate personal');

    useEffect(() => {
        console.log(peer);
        
            userVideo.current.srcObject = peer.peer._remoteStreams[0];

    },[])

    const back = () => {
      
      navigate(`/userpage/exam-room/${room._id}`);
    }
        return(
          <div className="container">
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
            <span style={{ display: "block" }}>{track && track.tag ? 'tagged' : null}</span>
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
        <div className="row mt-3">
          <div className="col-4">
          <div className="facial">
          <span>Facial Detection</span>
          <span style={{ display: "block" }}>{track && track.facial ? track.facial : null}</span>
          </div>
          </div>
          <div className="col-4">
          <div className="facial">
          <span>Audio Detection</span>
          <span style={{ display: "block" }}>{track && track.audio ? track.audio : null}</span>
          </div>
          </div>
          <div className="col-4">
          <div className="facial">
          <span>Browser</span>
          <span style={{ display: "block" }}>{track && track.browser ? track.browser : null}</span>
          </div>
          </div>
        </div>
        <div className="row mt-3">
        <div className="col-6">
        <button
              className="btn btn-primary"
              onClick={() => TagPeer(peer.id)}
            >
              {track && track.tag ? 'Untag Candidate' : 'Tag Candidate'}
            </button>
          </div>
          <div className="col-6">
        <button
              className="btn btn-danger"
              onClick={() => removePeer(peer.id)}
            >
              Remove Candidate
            </button>
          </div>
          </div>
           
          </div>
        );

}
