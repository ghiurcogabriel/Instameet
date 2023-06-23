import React from "react";
import { FaComment, FaEllipsisH, FaHeart } from "react-icons/fa";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ marginTop: "4%" }}>
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
