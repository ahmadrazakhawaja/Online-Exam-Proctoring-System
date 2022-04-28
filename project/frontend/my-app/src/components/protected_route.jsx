import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Navigate, useNavigate } from "react-router";

const useAuth = () => {
  if (localStorage.getItem("user-info")) {
    return true;
  }
  return false;
};

// const checkRoom = () => {
//   if (localStorage.getItem("room-info")) {
//     let tmp = JSON.parse(localStorage.getItem("room-info"));
//     if(tmp.browserTracking)
//   }
//   return false;
// };
// }

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const isAuth = useAuth();
  
  

  useEffect(() => {
    const set = isAuth ? localStorage.getItem("user-info") : null;
    props.setLogIn(set);
    if(!isAuth){
      navigate('/');
    }
  }, []);

  if (isAuth) {
    return <Outlet {...props} />;
  }
  return null;
};

export default ProtectedRoute;
