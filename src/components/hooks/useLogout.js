import { useState, useEffect } from "react";
import { authUser } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    try {
      await signOut(authUser);
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { logout, error };
};
