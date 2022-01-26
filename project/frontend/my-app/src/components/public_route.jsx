import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

const useAuth = () => {
  if (localStorage.getItem("user-info")) {
    return true;
  }
  return false;
};

const PublicRoute = (props) => {
  //   const navigate = useNavigate();
  const isAuth = useAuth();
  if (isAuth) {
    props.setLogIn(localStorage.getItem("user-info"));
    return <Navigate to="/userpage" />;
  }
  props.setLogIn(null);
  return <Outlet {...props} />;
};

export default PublicRoute;
