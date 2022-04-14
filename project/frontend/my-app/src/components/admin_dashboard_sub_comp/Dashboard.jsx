
import React from "react";

export default function Dashboard(params) {
return (
    <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div className="white-box">
                            <h3 className="box-title">Products Yearly Sales</h3>
                            <div className="d-md-flex">
                                <ul className="list-inline d-flex ms-auto">
                                    <li className="ps-3">
                                        <h5><i className="fa fa-circle me-1 text-info"></i>Mac</h5>
                                    </li>
                                    <li className="ps-3">
                                        <h5><i className="fa fa-circle me-1 text-inverse"></i>Windows</h5>
                                    </li>
                                </ul>
                            </div>
                            {/* <div id="ct-visits" style="height: 405px;">
                                <div className="chartist-tooltip" style="top: -17px; left: -12px;"><span
                                        className="chartist-tooltip-value">6</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
    </div>);
    }