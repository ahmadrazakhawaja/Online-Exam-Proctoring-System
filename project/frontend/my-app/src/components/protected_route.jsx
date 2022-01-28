import React, { useEffect } from "react";
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

  useEffect(() => {
    const set = isAuth ? localStorage.getItem("user-info") : null;
    props.setLogIn(set);
  }, []);

  if (isAuth) {
    return <Outlet {...props} />;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
