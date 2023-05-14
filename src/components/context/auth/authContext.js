import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "SIGNIN":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const { state, dispatch } = useReducer(AuthReducer, {
    user: null,
    authIsReady: false,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
  );
};
