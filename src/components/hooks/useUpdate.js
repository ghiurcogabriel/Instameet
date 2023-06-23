import { useState } from "react";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editProfile = async (file, currentUser, displayName) => {
    try {
      setLoading(true);
      const folderRef = ref(
        storage,
        "profile-pictures/" + currentUser.currentUser.uid + ".png"
      );

      if (file === undefined || file === null || file.length === 0) {
        setError("Please add a profile picture!");
      } else if (
        displayName === undefined ||
        displayName === null ||
        displayName.length === 0
      ) {
        setError("Please add a display name!");
      } else {
        const upload = await uploadBytes(folderRef, file);
        const photoURL = await getDownloadURL(folderRef);
        await updateProfile(currentUser.currentUser, {
          photoURL,
          displayName,
        });
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { loading, editProfile, error };
};
