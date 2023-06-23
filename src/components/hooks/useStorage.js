import { ref, uploadBytesResumable  , getDownloadURL } from "firebase/storage";

import { storage } from "../firebase/config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { authUser } from "../firebase/config";

export const useStorage = (storageName) => {
  //   const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [pause, setPause] = useState("");
  const [running, setRunning] = useState([""]);
  const [progress, setProgress] = useState(null);
  const [user] = useAuthState(authUser);
  const [imgUrls, setImgUrls] = useState([]);
  // console.log(imgUrls);

  //   useEffect(() => {
  const addImageToStorage = async (file) => {
    const metadata = {
      customMetadata: {
        'user': user.uid
      }
    };

    if(file == null) return;
    const storageRef = ref(storage, storageName + file.name + user.uid);
    const uploadTask =  uploadBytesResumable(storageRef, file, metadata);
     uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress("Upload is " + progress + "% done");
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            setPause("Upload is paused");
            // console.log("Upload is paused");
            break;
          case "running":
            setRunning("Upload is running");
            // console.log("Upload is running");
            break;
          default:
            return;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            setError("You don't have permission to access this photos..");
            break;
          case "storage/canceled":
            // User canceled the upload
            setError("Upload cancelled");
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            setError("Unknown error occurred, please try again later");
            break;
          default:
            return setError(
              "Something went wrong while uploading this photo.."
            );
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgUrls(downloadURL);
        });
      }
    );
  };

  return {addImageToStorage, error, progress, pause, running, imgUrls };
};
