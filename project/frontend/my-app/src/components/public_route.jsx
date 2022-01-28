import { Outlet } from "react-router";
import { Navigate } from "react-router";
import React, { useEffect } from "react";

const useAuth = () => {
  if (localStorage.getItem("user-info")) {
    return true;
  }
  return false;
};

const PublicRoute = (props) => {
  //   const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    const set = isAuth ? localStorage.getItem("user-info") : null;
    props.setLogIn(set);
  }, []);

  if (isAuth) {
    return <Navigate to="/userpage" />;
  }
  return <Outlet {...props} />;
};

export default PublicRoute;
