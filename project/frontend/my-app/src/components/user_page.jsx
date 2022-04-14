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
    const data2 = JSON.parse(localStorage.getItem("user-info"));
    const myHeaders = new Headers();
    myHeaders.append("content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${data2.token}`);
    console.log(data);
    fetch("http://127.0.0.1:5000/roomRoutes/checkRoom", {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      body: JSON.stringify({
        id: data["room-id"],
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.code === 1) {
          localStorage.setItem(
            "room-info",
            JSON.stringify({ _id: data["room-id"] })
          );
          // localStorage.setItem("room-info", JSON.stringify(json.data.newRoom));
          // const room = JSON.parse(localStorage.getItem("room-info"));
          navigate(`/userpage/Checking/:id`);
        } else {
          // if (json.header.message === "User Made") {
          //   // localStorage.setItem("user-info", JSON.stringify(json.data));
          //   // props.setLogIn(localStorage.getItem("user-info"));
          //   // navigate("/login");
          //   setsubmit(true);
          // } else {
          // setsubmit({
          //   submit: true,
          //   redirect: false,
          // });
          setalert(json.header.message);
        }
        // }
      });
  };

  return (
    <div>
      {alert && <Alert alert={alert} setalert={setalert} />}
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
