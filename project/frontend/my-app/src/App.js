import logo from "./logo.svg";
import "./App.css";
import React from "react";
import NavBar from "./components/navbar";
import SignUp from "./components/sign_up";
import LogIn from "./components/log_in";
import Home from "./components/home";
import Footer from "./components/footer";
import UserPage from "./components/user_page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/userpage" element={<UserPage />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
