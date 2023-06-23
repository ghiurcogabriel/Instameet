import React, { useState } from "react";
import { FaBars, FaPlusCircle, FaUser } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { Link, NavLink } from "react-router-dom";
import { authUser } from "../../firebase/config";
import { useLogout } from "../../hooks/useLogout";

import logo from "../../assets/svg/logoBackground.svg";
import "./navbar.css";
import Search from "../../Pages/Search/Search";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styleUserLandingPage } from "../MuiModal";
import AddPost from "../../Pages/Posts/AddPost";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Navbar = () => {
  const [user] = useAuthState(authUser);
  const { logout, error } = useLogout();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(user);
  return (
    <nav className={user ? "navbar-loggedin" : "navbar"}>
      <div className="left">
        <Link to="/login">
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
            <div className={"plus-button"}>
              <FaPlusCircle
                onClick={handleOpen}
                size={25}
                color="#257272"
                style={{ cursor: "pointer" }}
              />
              <span className="tooltip">Add new post</span>
              <Modal
                // className="main-modal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleUserLandingPage}>
                  <AddPost close={handleClose} uid={user?.uid} />
                </Box>
              </Modal>
            </div>
          </li>
          <li>
            <NavLink to="/userHomepage" className={activeLink}>
              <FaUser />
            </NavLink>
          </li>
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
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Log Out
            </button>
            <p>{error}</p>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
