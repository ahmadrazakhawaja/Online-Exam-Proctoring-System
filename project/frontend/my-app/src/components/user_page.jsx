import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage(props) {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("user-info")) {
  //     navigate("/login");
  //   }
  // }, []);
  const data = JSON.parse(localStorage.getItem("user-info"));

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome {data.first_name}</h1>
      <div className="row mt-5" style={{ width: "100%" }}>
        <div className="col text-center">
          <button className="btn btn-primary">Create Exam</button>
        </div>

        <div className="col text-center">
          <form style={{ width: "50%", marginLeft: "20%" }}>
            <div>
              <input
                type="text"
                className="form-control"
                id="Room-id"
                // value={value}
                // onChange={(event) => onChange(props.element, event)}
                aria-describedby="Room-id"
                placeholder="Enter Room-id"
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary mt-3"
              style={{ margin: "0 auto" }}
              value="Join Exam"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
