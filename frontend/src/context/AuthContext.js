import React, { createContext, useState } from "react";

//Context consumer variable is created
export const AuthContext = createContext();

//Context Provider function is created, taking a children prop representing all components the context is wrapping
const AuthProvider = ({ children }) => {
  //Global isAuthenticated state to check if a user is signed in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Global activeUser state to contain the data of the signed in user
  const [activeUser, setActiveUser] = useState({ username: "" });

  //Provider function returns the "actual" provider component, telling it to consume the children prop (representing the wrapped components),
  //as well as providing the diffrent global states in an object via the value prop
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, activeUser, setActiveUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
