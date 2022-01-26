import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

const useAuth = () => {
  if (localStorage.getItem("user-info")) {
    return true;
  }
  return false;
};

const ProtectedRoute = (props) => {
  //   const navigate = useNavigate();
  const isAuth = useAuth();
  if (isAuth) {
    props.setLogIn(localStorage.getItem("user-info"));
    return <Outlet {...props} />;
  }
  props.setLogIn(null);
  return <Navigate to="/" />;
};

export default ProtectedRoute;
