import React, { useState } from "react";
import "./AddPost.css";
import { useFirebase } from "../../hooks/useFirebase";

const AddPost = ({ uid }) => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { addDocument } = useFirebase("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ uid, image, description, location });
    console.log(image, description, location);
  };
  return (
    <div className="add-post-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-top-text">
          <span className="form-title">Upload your file</span>
          <p className="form-paragraph">File should be an image</p>
        </div>

        <label htmlFor="file-input" className="drop-container">
          <span className="drop-title">Drop files here</span>
          or
          <input
            type="text"
            // accept="image/*"
            required=""
            value={image}
            id="file-input"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <div className="add-fields">
          <label htmlFor="description">
            <span className="post-name">Add Description:</span>
            <textarea
              name="description"
              cols={50}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label htmlFor="location">
            <span className="post-name">Add Location:</span>
            <input
              type="text"
              name="location"
              id=""
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="button-name">
          Add post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
