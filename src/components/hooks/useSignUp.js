import { useState, useEffect } from "react";
import { authUser } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(
        authUser,
        email,
        password
      );
      console.log(result);

      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName,
      });

      dispatch({ type: "SIGNIN", payload: result.user });

      if (!result) {
        throw new Error("Could not complete the authentication..");
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { signUp, isPending, error };
};
