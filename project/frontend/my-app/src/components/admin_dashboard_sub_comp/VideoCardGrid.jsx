import React from "react";
import ".//VideoCardGrid.css";

export default function VideoCardGrid(params) {
return (

      <div className="grid">
        <div id = "Audio"><img src = "/Microphone.png.png" width="67" height="30" 
        style={{display: "inline-block", width : 67, height :35, verticalAlign : "top"}}></img> </div>
        <div id = "Video"><img src = "/Camera.png" width="67" height="30" 
        style={{display: "inline-block", width : 67, height :35, verticalAlign : "top"}}></img></div>
        <div id = "Browser"><img src = "/Browser.png" width="67" height="30" 
        style={{display: "inline-block", width : 67, height :35, verticalAlign : "top"}}></img></div>
      </div>

    );
}