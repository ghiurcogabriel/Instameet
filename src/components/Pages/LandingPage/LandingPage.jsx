import React, { useState } from "react";
import { FaComment, FaEllipsisH, FaHeart } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import { authUser } from "../../firebase/config";
import bila from '../../assets/background/bila.jpg';

import "./LandingPage.css";
import AddPost from "../Posts/AddPost";

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [user] = useAuthState(authUser);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    height: "80%",
    bgcolor: "#2a2a2a70;",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="landing-page" style={{ marginTop: "4%" }}>
      <button
        style={{ width: "200px", alignSelf: "flex-end" }}
        onClick={handleOpen}
        className="add-new-post-btn"
      >
        add new post
      </button>
      <Modal
        // className="main-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddPost close={handleClose} uid={user?.uid} />
        </Box>
      </Modal>

      {/* <img style={{width: '300px', opacity: 0.3}} src={bila} alt="bila" /> */}
      <div className="lp-container">
        <div className="lp-user-feed">
          <div className="lp-user-details">
            <div className="lp-user-name">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                alt="profile-pic"
                className="profile-pic"
              />
              <div className="details">
                <h2>Gabriel GH</h2>
                <p>Cluj-Napoca, Romania</p>
              </div>
            </div>
            <FaEllipsisH />
          </div>
          <div className="lp-img-post">
            <img
              src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
              alt="post"
              className="post-img"
            />
          </div>
          <div className="lp-post-react">
            <div className="post-likes">
              <FaHeart />
              <span>99 likes</span>
            </div>
            <div>
              <FaComment />
              <span>10 Comment</span>
            </div>
          </div>
          <div className="post-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              atque, necessitatibus vitae eligendi quasi aliquid.
            </p>
          </div>
          <div className="post-comments">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt="profile-pic"
              className="profile-pic"
            />
            <input
              type="text"
              name="comment"
              className="comment-input"
              placeholder="Write your comment"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
