import React from "react";
import "./footer.css";

export default function Footer(params) {
  return (
    // <footer
    //   style={{ height: "100%", width: "100%", position: "relative" }}
    //   className="bg-dark text-center text-white"
    // >
    //   {/* <div class="container p-3">
    //     <section className="mb-2">
    //       <span style={{ marginRight: "10px" }} className="mr-3">
    //         Ahmad Raza Khawaja
    //       </span>
    //       <span style={{ marginRight: "10px" }} className="mr-3">
    //         Hassan Ahmad
    //       </span>
    //       <span>Asad Ur Rehman</span>
    //     </section>
    //   </div> */}
    //   <div
    //     className="text-center p-3"
    //     style={{
    //       backgroundColor: "rgba(0, 0, 0, 0.2)",
    //       height: "50px",
    //       textAlign: "center",
    //       position: "absolute",
    //       bottom: "0",
    //       left: "0",
    //       paddingTop: "100px",
    //       width: "100px",
    //     }}
    //   >
    //     © 2022 Copyright
    //   </div>
    // </footer>
    <React.Fragment>
      {/* <div id="wrap">
        <div id="main" className="container clear-top">
          <p>Your content here</p>
        </div>
      </div>
      <footer className="footer"></footer> */}
      <nav className="navbar fixed-bottom bg-dark"
       style={{margin: "auto"}}>
        <p
          className="navbar-brand text-center text-white"
          style={{ margin: "0 auto" }}
        >
          © 2022 Copyright
        </p>
      </nav>

    </React.Fragment>
  );
}
