import { Outlet } from "react-router";
import { Navigate, useNavigate } from "react-router";
import React, { useEffect } from "react";

const useAuth = () => {
  if (localStorage.getItem("user-info")) {
    return true;
  }
  return false;
};

const PublicRoute = (props) => {
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    const set = isAuth ? localStorage.getItem("user-info") : null;
    if (isAuth) {
      navigate('/userpage');
    }
    props.setLogIn(set);
  }, []);

  if (isAuth) {
    return null;
  }
  return <Outlet {...props} />;
};

export default PublicRoute;
