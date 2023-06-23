import React, { useState } from "react";
import "./AddPost.css";
import { useFirebase } from "../../hooks/useFirebase";
import { useStorage } from "../../hooks/useStorage";

const AddPost = ({ uid }) => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { addDocument } = useFirebase("posts");
  const { addImageToStorage, imgUrls, error, progress } = useStorage("posts/");

  const handleAddImage = () => {
    addImageToStorage(image);
    // console.log(image);
  };
  // console.log(imgUrls);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  await addImageToStorage(image);
    // console.log(image);
    setTimeout(async () => {
      await addDocument({ uid, description, location, imgUrls });
      console.log(uid, description, location, imgUrls);
    }, 1000);
  };

  return (
    <div className="add-post-container">
      <div className="form-top-text">
        <span className="form-title">Upload your file</span>
        <p className="form-paragraph">File should be an image</p>
      </div>

      <label htmlFor="file-input" className="drop-container">
        <span className="drop-title">Drop files here</span>
        <span className="or">or</span>
        <input
          type="file"
          accept="image/*"
          // required=""
          // value={image}
          id="file-input"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <button
        onClick={handleAddImage}
        className="button-name"
        style={{ height: "30px", margin: "10px" }}
      >
        Add photo
      </button>
      <form className="add-form" onSubmit={handleSubmit}>
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
