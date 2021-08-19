import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  //global isAuthenticated state and setter extracted from context
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  //history constant initialized to use methods on history hook
  const history = useHistory();

  //function to logout the user by setting isAuthenticated global state to false
  const logout = () => {
    setIsAuthenticated(false);
    history.push("/login");
  };

  //Navbar links to be returned if global isAuthenticated state is true
  const authNavbar = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/account">Account</NavLink>
        <button onClick={logout}>Logout</button>
      </>
    );
  };

  //Navbar links to be returned if global isAuthenticated state is false
  const unAuthNavbar = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </>
    );
  };

  //Navbar JSX conatining wrapper-div and a ternary expression either
  //calling for the authnavbar function if the globals isAuthenticated state is true, otherwise for the unauthnavbar function
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
        padding: "10px",
      }}
    >
      {isAuthenticated ? authNavbar() : unAuthNavbar()}
    </div>
  );
};
