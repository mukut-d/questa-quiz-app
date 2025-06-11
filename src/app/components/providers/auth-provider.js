"use client";
const { createContext } = require("react");

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const ctxValues = {};
  return (
    <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
