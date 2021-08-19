import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState({ username: "" });

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, activeUser, setActiveUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
