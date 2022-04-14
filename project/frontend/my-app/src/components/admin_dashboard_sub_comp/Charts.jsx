import React from "react";
import ".//Charts.css";

export default function Charts(params) {
return (
    <div className="row justify-content-center">
        <div className="col-lg-4 col-md-12">
            <div className="white-box analytics-info">
                <h3 className="box-title">Candidates</h3>
                <ul className="list-inline two-part d-flex align-items-center mb-0">
                    <li>
                        {/* <div id="sparklinedash"><canvas width="67" height="30"
                                style="display: inline-block; width: 67px; height: 30px; vertical-align: top;"></canvas>
                        </div> */}
                        <div id= "sparklinedash"><img src = "/Charts.png" width="67" height="30" 
                        style={{display: "inline-block", width : 67, height :30, verticalAlign : "top"}}></img> </div>
                    </li>
                    <li className="ms-auto"><span className="counter text-success">20</span></li>
                </ul>
            </div>
        </div>
        <div className="col-lg-4 col-md-12">
            <div className="white-box analytics-info">
                <h3 className="box-title">Audio Cheating Detected</h3>
                <ul className="list-inline two-part d-flex align-items-center mb-0">
                    <li>
                        {/* <div id="sparklinedash2"><canvas width="67" height="30"
                             style="display: inline-block; width: 67px; height: 30px; vertical-align: top;"></canvas>
                        </div> */}
                        <div id= "sparklinedash2"><img src = "/Microphone.png" width="67" height="30"
                        style={{display: "inline-block", width : 30, height :30, verticalAlign : "top"}}></img> </div>
                    </li>
                    <li className="ms-auto"><span className="counter text-purple">0</span></li>
                </ul>
            </div>
        </div>
        <div className="col-lg-4 col-md-12">
            <div className="white-box analytics-info">
                <h3 className="box-title">Facial Cheating Detected</h3>
                <ul className="list-inline two-part d-flex align-items-center mb-0">
                    <li>
                    <div id= "sparklinedash3"><img src = "/Camera.png" width="67" height="30" 
                        style={{display: "inline-block", width : 30, height :30, verticalAlign : "top"}}></img> </div>
                    </li>
                    <li className="ms-auto"><span className="counter text-info">0</span></li>
                </ul>
            </div>
        </div>
    </div>);
}


