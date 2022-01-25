import React from "react";

export default function Footer(params) {
  return (
    <footer
      style={{ position: "fixed", bottom: "0", width: "100%" }}
      className="bg-dark text-center text-white"
    >
      {/* <div class="container p-3">
        <section className="mb-2">
          <span style={{ marginRight: "10px" }} className="mr-3">
            Ahmad Raza Khawaja
          </span>
          <span style={{ marginRight: "10px" }} className="mr-3">
            Hassan Ahmad
          </span>
          <span>Asad Ur Rehman</span>
        </section>
      </div> */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright
      </div>
    </footer>
  );
}
