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
import Welcome from "./components/verifyUser";
import ChangePassword from "./components/change_password";
import ChangePassword2 from "./components/change_password2";
import EnterEmail from "./components/enter_email";
import UploadImage from "./components/upload_image";
import ExamSettings from "./components/exam_settings";
import Socket from "./components/socket";
import Panel from "./components/admin_panel";
import CandidatePanel from "./components/candidatePanel";
import AdminSettings from "./components/exam_settings2";
import CheckPanel from "./components/checking";
import CandidatePersonal from "./components/candidatePersonal";
import VerifyAdmin from "./components/verifyAdmin";
import PageNotFound from "./components/PageNotFound";

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
          <Route path="/confirm/:confirmationCode" element={<Welcome />} />
          <Route path="/change-password" element={<EnterEmail />} />
          <Route
            path="/change-password/:confirmationCode"
            element={<ChangePassword />}
          />
          <Route path="*" element={<PageNotFound/>} />
        </Route>
        <Route element={<ProtectedRoute setLogIn={setLoggedIn} />}>
          <Route element={<UserPage />} path="/userpage" />
          <Route
            element={<Setting setLogIn={setLoggedIn} />}
            path="/userpage/setting"
          />
          <Route
            path="/userpage/setting/change-password"
            element={<ChangePassword2 setLogIn={setLoggedIn} />}
          />
          <Route
            path="/userpage/setting/upload-image"
            element={<UploadImage setLogIn={setLoggedIn} />}
          />
          <Route
            path="/userpage/exam-settings"
            element={<ExamSettings setLogIn={setLoggedIn} />}
          />
          <Route element={<Socket setLogIn={setLoggedIn} />}>
            <Route
              path="/userpage/Checking/:id"
              element={<CheckPanel setLogIn={setLoggedIn} />}
            />
             <Route element={<VerifyAdmin setLogIn={setLoggedIn} />}>
            <Route
              path="/userpage/exam-room/:id"
              element={<Panel setLogIn={setLoggedIn} />}
            >
              <Route
                path="Exam-Settings"
                element={<AdminSettings setLogIn={setLoggedIn} />}
              />
              <Route
                path=":id2"
                element={<CandidatePersonal setLogIn={setLoggedIn} />}
              />
            </Route>
            </Route>
            <Route
              path="/userpage/exam-room/:id/candidate"
              element={<CandidatePanel setLogIn={setLoggedIn} />}
            />
          </Route>
          <Route path="*" element={<PageNotFound/>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
