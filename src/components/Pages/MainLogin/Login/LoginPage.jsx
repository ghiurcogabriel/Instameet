import React from "react";
import {FaGoogle} from 'react-icons/fa';
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="form-container">
        <p className="title">Login</p>
        {/* <p>oh, Welcome back, sir!</p> */}
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#s">
                Forgot Password ?
              </a>
            </div>
          </div>
          <button className="sign">Sign in</button>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Or login with google</p>
          <div className="line"></div>
        </div>
        <div className="social-icons">
          <button aria-label="Log in with Google" className="icon">
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
