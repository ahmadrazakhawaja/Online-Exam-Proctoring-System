    // const  BasicTable = () => {
    //     return (<div classNameName="row">
    //     <div classNameName="col-sm-12">
    //         <div classNameName="white-box">
    //             <h3 classNameName="box-title">Basic Table</h3>
    //             <p classNameName="text-muted">Add classNameName <code>.table</code></p>
    //             <div classNameName="table-responsive">
    //                 <table classNameName="table text-nowrap">
    //                     <thead>
    //                         <tr>
    //                             <th classNameName="border-top-0">#</th>
    //                             <th classNameName="border-top-0">First Name</th>
    //                             <th classNameName="border-top-0">Last Name</th>
    //                             <th classNameName="border-top-0">Username</th>
    //                             <th classNameName="border-top-0">Role</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <tr>
    //                             <td>1</td>
    //                             <td>Deshmukh</td>
    //                             <td>Prohaska</td>
    //                             <td>@Genelia</td>
    //                             <td>admin</td>
    //                         </tr>
    //                         <tr>
    //                             <td>2</td>
    //                             <td>Deshmukh</td>
    //                             <td>Gaylord</td>
    //                             <td>@Ritesh</td>
    //                             <td>member</td>
    //                         </tr>
    //                         <tr>
    //                             <td>3</td>
    //                             <td>Sanghani</td>
    //                             <td>Gusikowski</td>
    //                             <td>@Govinda</td>
    //                             <td>developer</td>
    //                         </tr>
    //                         <tr>
    //                             <td>4</td>
    //                             <td>Roshan</td>
    //                             <td>Rogahn</td>
    //                             <td>@Hritik</td>
    //                             <td>supporter</td>
    //                         </tr>
    //                         <tr>
    //                             <td>5</td>
    //                             <td>Joshi</td>
    //                             <td>Hickle</td>
    //                             <td>@Maruti</td>
    //                             <td>member</td>
    //                         </tr>
    //                         <tr>
    //                             <td>6</td>
    //                             <td>Nigam</td>
    //                             <td>Eichmann</td>
    //                             <td>@Sonu</td>
    //                             <td>supporter</td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // </div>);
    // }
    
    // export default BasicTable;

    import React from "react";

    export default function BasicTable(params) {
    return (
        <div className="main-wrapper">
            <aside class="left-sidebar" data-sidebarbg="skin6">
            <div class="scroll-sidebar">
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="sidebar-item pt-2">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="dashboard.html"
                                aria-expanded="false">
                                <i class="far fa-clock" aria-hidden="true"></i>
                                <span class="hide-menu">Dashboard</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="profile.html"
                                aria-expanded="false">
                                <i class="fa fa-user" aria-hidden="true"></i>
                                <span class="hide-menu">Profile</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="basic-table.html"
                                aria-expanded="false">
                                <i class="fa fa-table" aria-hidden="true"></i>
                                <span class="hide-menu">Basic Table</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="fontawesome.html"
                                aria-expanded="false">
                                <i class="fa fa-font" aria-hidden="true"></i>
                                <span class="hide-menu">Icon</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="map-google.html"
                                aria-expanded="false">
                                <i class="fa fa-globe" aria-hidden="true"></i>
                                <span class="hide-menu">Google Map</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="blank.html"
                                aria-expanded="false">
                                <i class="fa fa-columns" aria-hidden="true"></i>
                                <span class="hide-menu">Blank Page</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="404.html"
                                aria-expanded="false">
                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                <span class="hide-menu">Error 404</span>
                            </a>
                        </li>
                    </ul>

                </nav>
            </div>
        </aside>  
            <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="white-box">
                            <h3 className="box-title">Basic Table</h3>
                            <p className="text-muted">Add className <code>.table</code></p>
                            <div className="table-responsive">
                                <table className="table text-nowrap">
                                    <thead>
                                        <tr>
                                            <th className="border-top-0">#</th>
                                            <th className="border-top-0">First Name</th>
                                            <th className="border-top-0">Last Name</th>
                                            <th className="border-top-0">Username</th>
                                            <th className="border-top-0">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Deshmukh</td>
                                            <td>Prohaska</td>
                                            <td>@Genelia</td>
                                            <td>admin</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Deshmukh</td>
                                            <td>Gaylord</td>
                                            <td>@Ritesh</td>
                                            <td>member</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Sanghani</td>
                                            <td>Gusikowski</td>
                                            <td>@Govinda</td>
                                            <td>developer</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Roshan</td>
                                            <td>Rogahn</td>
                                            <td>@Hritik</td>
                                            <td>supporter</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Joshi</td>
                                            <td>Hickle</td>
                                            <td>@Maruti</td>
                                            <td>member</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Nigam</td>
                                            <td>Eichmann</td>
                                            <td>@Sonu</td>
                                            <td>supporter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
    }


