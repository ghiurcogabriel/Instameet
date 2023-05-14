import React from "react";
import "./Home.css";
import MainLogin from "../MainLogin/MainLogin";

const Home = () => {
  return (
    <div className="home-container">
      <div className="components">
        <MainLogin />
      </div>
    </div>
  );
};

export default Home;
