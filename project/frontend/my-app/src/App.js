import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import SignUp from "./components/sign_up";
import LogIn from "./components/log_in";
import Home from "./components/home";
import Footer from "./components/footer";
import UserPage from "./components/user_page";
import ProtectedRoute from "./components/protected_route";
import PublicRoute from "./components/public_route";
import Setting from "./components/settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user-info"));

  return (
    <Router>
      <NavBar status={loggedIn} setLogIn={setLoggedIn} />
      <Routes>
        <Route element={<PublicRoute setLogIn={setLoggedIn} />}>
          <Route element={<Home setLogIn={setLoggedIn} />} exact path="/" />
          <Route element={<SignUp setLogIn={setLoggedIn} />} path="/signup" />
          <Route element={<LogIn setLogIn={setLoggedIn} />} path="/login" />
        </Route>
        <Route element={<ProtectedRoute setLogIn={setLoggedIn} />}>
          <Route element={<UserPage />} path="/userpage" />
          <Route
            element={<Setting setLogIn={setLoggedIn} />}
            path="/userpage/setting"
          />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
