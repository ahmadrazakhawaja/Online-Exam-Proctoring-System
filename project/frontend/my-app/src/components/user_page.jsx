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

  return <h1 style={{ textAlign: "center" }}>Welcome {data.userName}</h1>;
}
