import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamSettings from "./exam_settings";
import Alert from "./alert";
import { useForm } from "react-hook-form";

export default function UserPage(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [alert, setalert] = useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("user-info")) {
  //     navigate("/login");
  //   }
  // }, []);
  const data = JSON.parse(localStorage.getItem("user-info"));

  const examset = () => {
    navigate("/userpage/exam-settings");
  };

  const onSubmit = (data, event) => {
    localStorage.setItem("room-info", JSON.stringify({ _id: data["room-id"] }));
    navigate(`/userpage/exam-room/${data["room-id"]}/candidate`);
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
          <form
            onSubmit={handleSubmit((data, event) => onSubmit(data, event))}
            style={{ width: "50%", marginLeft: "20%" }}
          >
            <div>
              <input
                type="text"
                className="form-control"
                id="Room-id"
                // value={value}
                // onChange={(event) => onChange(props.element, event)}
                aria-describedby="Room-id"
                placeholder="Enter Room-id"
                {...register("room-id", {
                  required: {
                    value: true,
                    message: "Room ID is required",
                  },
                  minLength: {
                    value: 24,
                    message: "Length should be of 24 digits",
                  },
                  maxLength: {
                    value: 24,
                    message: "Length should be of 24 digits",
                  },
                })}
              />
              {errors["room-id"] && errors["room-id"].message}
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
