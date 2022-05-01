import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../home_style.css";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("user-info")) {
  //     navigate("/userpage");
  //   } else {
  //     props.setLogIn(null);
  //   }
  // }, []);

  return (
    <React.Fragment>
    <div className="row g-0">
        <div className="col-12">
          <div className="containersk">
            <img src="/main_img4.jpg" className="image" alt="home page" />
              <div className="overlay">
                  <h1 className="text">Free online Exam Proctoring System</h1>
                  <Link to="/login" className="btn btn-danger btn-md m-2">
                    Log In
                  </Link>
                  <Link to="/signup" className="btn btn-danger btn-md m-2">
                    Sign Up
                  </Link>
                </div>
          </div>
        </div>
      </div>
    <div className="container-fluid">
      
      <div className="row mt-5 mb-5" style={{alignItems: 'center'}}>
        <div className="col-6">
          <img src="exam-01.svg" style={{ maxHeight: '500px', marginLeft: '20%' }} alt="Robot Image" />
        </div>
        <div className="col-6">
          <span style={{fontSize: '20px', fontWeight: 'bold'}}>Our Online Proctoring System Features New-age Anti-cheating Technology.</span>
        </div>
        <hr />
      </div>
      <div className="row mt-5 mb-5" style={{alignItems: 'center'}}>
        <div className="col-6">
            <span style={{fontSize: '20px', fontWeight: 'bold'}}>An Online Examination System For Secure And Seamless Online Exams. So you can stay confident about the Exam Integrity.</span>
          </div>
          <div className="col-6">
            <img src="secure-01.svg" style={{ maxHeight: '500px', marginRight: '20%' }} alt="Robot Image" />
          </div>
        
      </div>
    </div>
    <div className="row mt-5 mb-5 g-0"  style={{backgroundColor: 'rgb(33, 37, 41)',height: '100px', marginBottom: '8px', alignItems: 'center'}}>
        
              <div className="col-4 text-center">
              <Link to="/signup" className="subfooter" style={{color: 'white', fontSize: '15px', textDecorationLine: 'none'}} >
              <b>Sign Up</b>
                  </Link>
              </div>
              <div className="col-4 text-center" >
              <Link to="/login" className="subfooter" style={{color: 'white', fontSize: '15px', textDecorationLine: 'none'}}>
                    <b>Login</b>
                  </Link>
              </div>
              <div className="col-4 text-center" >
              <Link to="/" className="subfooter" style={{color: 'white', fontSize: '15px', textDecorationLine: 'none'}}>
              <b>Home</b>
                  </Link>
              
          
        </div>
      </div>
    </React.Fragment>
  );
}
