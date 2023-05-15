import { useState, useEffect } from "react";
import { authUser } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(authUser, email, password);
      console.log(result);

      dispatch({ type: "SIGNIN", payload: result.user });

      if (!result) {
        throw new Error("Could not complete the sign in..");
      }
    } catch (err) {
      console.log(err);
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

  return { login, isPending, error };
};
