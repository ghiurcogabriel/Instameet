import React, { useEffect, useState } from "react";
import "./UserHomepage.css";

//icons
import { FaPen } from "react-icons/fa";

//custom hooks
import { useUpdate } from "../../hooks/useUpdate";
import PostDetails from "../Utils/PostDetails";
import { getAuth } from "firebase/auth";
import { useCollection } from "../../hooks/useCollection";
import EditProfile from "../../common/EditProfile";

const UserHomepage = () => {
  const user = getAuth();

  //states for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //states for edit form
  const [showForm, setShowForm] = useState(false);
  const { error, loading, editProfile } = useUpdate();
  const { documents } = useCollection("posts");

  const updateProfile = ({ file, displayName }) => {
    editProfile(file, user, displayName);
  };

  return (
    <div className="user-homepage">
      <div className="user-container">
        <div className="user-details-container">
          <div className="img-profile">
            <img src={user.currentUser.photoURL} alt="profile pic" />
          </div>
          <div className="profile-desc">
            <div className="user-actions">
              <div style={{ display: "flex" }}>
                <h1 className="user-username">
                  {user.currentUser.displayName}
                </h1>
                <FaPen
                  color="white"
                  onClick={() => setShowForm(!showForm)}
                  style={{ cursor: "pointer", margin: "5px" }}
                />
              </div>
              <EditProfile showForm={showForm} updateProfile={updateProfile} />
            </div>
            <div className="user-profile-desc">
              <h3 className="number-of-posts">
                {documents?.length} {documents?.length <= 1 ? "post" : "posts"}
              </h3>
            </div>
          </div>
        </div>

        <div className="user-posts-container">
          <div className="user-images">
            <PostDetails
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomepage;
