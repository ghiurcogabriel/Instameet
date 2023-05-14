import React, { useState } from "react";
import LoginPage from "./Login/LoginPage";
import Signup from "../Signup/Signup";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();

const MainLogin = () => {
  const [showForm, setShowForm] = useState(true);
  return (
    <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <button className="switch-login" onClick={() => setShowForm(!showForm)}>{showForm ? 'Signup for Free' : 'Login'}</button>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {showForm && <LoginPage />}
        {!showForm && <Signup data-aos="flip-right"/>}
        
      </div>
    </div>
  );
};

export default MainLogin;
