import React from "react";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import logo from "../../assets/svg/logoNoBackground.svg";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import Search from "../../Pages/Search/Search";
import { authUser } from "../../firebase/config";

import { useAuthState } from "react-firebase-hooks/auth";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Navbar = () => {
 
  const [user] = useAuthState(authUser);

  console.log(user); 
  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{ width: "200px", height: "70px" }}
          />
        </Link>
      </div>
        <Search />

      <div className="right">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkBtn">
          <FaBars style={{ color: "white" }} />
        </label>
        <ul className="list">
          <li>
            <NavLink to="./mens" className={activeLink}>
              <FaHome />
            </NavLink>
          </li>
          <li>
            <NavLink to="/womens" className={activeLink}>
              <FaUser />
            </NavLink>
          </li>

          {/* {user && ( */}
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="button-17"
              // style={{
              //   height: "35px",
              //   width: "75px",
              //   fontWeight: "bold",
              //   fontSize: "15px",
              //   marginLeft: "15px",
              //   cursor: "pointer",
              // }}
              // onClick={logout}
            >
              Log Out
            </button>
          </div>
          {/* )} */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
