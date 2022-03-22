import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExamSettings from "./exam_settings";

export default function UserPage(props) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("user-info")) {
  //     navigate("/login");
  //   }
  // }, []);
  const data = JSON.parse(localStorage.getItem("user-info"));

  const examset = () => {
    navigate("/userpage/socket");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome {data.first_name}</h1>
      <div className="row mt-5" style={{ width: "100%" }}>
        <div className="col text-center">
          <button onClick={examset} className="btn btn-primary">
            Create Exam
          </button>
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
              style={{ margin: "0 auto", marginBottom: "100px" }}
              value="Join Exam"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
