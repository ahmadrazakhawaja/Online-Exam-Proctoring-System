import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamSettings from "./exam_settings";
import Alert from "./alert";
import "../user_page.css";
import { useForm } from "react-hook-form";

export default function UserPage(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [alert, setalert] = useState(null);
  const [userHistory, sethistory] = useState([]);
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

  useEffect(() => {
    const data2 = JSON.parse(localStorage.getItem("user-info"));
    const myHeaders = new Headers();
    myHeaders.append("content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${data2.token}`);
    console.log(data);
    fetch("http://127.0.0.1:5000/roomRoutes/gethistory", {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.code === 1) {
          if(json.data.RoomData){
          console.log(json.data.RoomData);
          sethistory(json.data.RoomData);
          }
          // localStorage.setItem("room-info", JSON.stringify(json.data.newRoom));
          // const room = JSON.parse(localStorage.getItem("room-info"));
          // navigate(`/userpage/Checking/:id`);
          
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
  }, [])

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
          localStorage.setItem("room-info", JSON.stringify(json.data.newRoom));
          // localStorage.setItem("room-info", JSON.stringify(json.data.newRoom));
          // const room = JSON.parse(localStorage.getItem("room-info"));
          // navigate(`/userpage/Checking/:id`);
          if (json.data.newRoom._id) {
            if(json.data.newRoom.admin === true){
              navigate(`/userpage/exam-room/${json.data.newRoom._id}`);
            }
            else{
              navigate(`/userpage/exam-room/${json.data.newRoom._id}/candidate`);
            }
            
          } else {
            setalert("room not available");
          }
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

  const JoinRoom = (id) => {
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
        id: id,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json.header.message);
        if (json.header.code === 1) {
          localStorage.setItem("room-info", JSON.stringify(json.data.newRoom));
          // localStorage.setItem("room-info", JSON.stringify(json.data.newRoom));
          // const room = JSON.parse(localStorage.getItem("room-info"));
          // navigate(`/userpage/Checking/:id`);
          if (json.data.newRoom._id) {
            if(json.data.newRoom.admin === true){
              navigate(`/userpage/exam-room/${json.data.newRoom._id}`);
            }
            else{
              navigate(`/userpage/exam-room/${json.data.newRoom._id}/candidate`);
            }
          } else {
            setalert("room not available");
          }
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
    <div className="container">
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
              // style={{ margin: "0 auto", marginBottom: "100px" }}
              value="Join Exam"
            />
          </form>
        </div>
        
      </div>
      <div className="row mt-5">
          <div className="col-12">
            <h2><b>User History</b></h2>
          <table className="table" style={{ marginBottom: '100px' }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">Time Started</th>
                <th scope="col">Ended</th>
              </tr>
            </thead>
            <tbody>
            {userHistory.map((element) => (

              <tr key={element.id} id="hov" onClick={!element.ended ? () => JoinRoom(element.roomid) : null}>
                <th scope="row">{element.id}</th>
                <td>{element.roomid}</td>
                <td>{element.timeStarted
                .replace(/T/, " ")
                .replace(/\..+/, "")}</td>
                <td>{element.ended.toString()}</td>
              </tr>
              
                

             ) )}
             </tbody>
</table>
          </div>
        </div>
    </div>
  );
}
