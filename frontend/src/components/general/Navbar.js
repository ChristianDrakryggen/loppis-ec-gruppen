import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import { Basket } from "./Basket";
import { BasketContext } from "../../context/BasketContext";

export const Navbar = () => {
  //global isAuthenticated state and setter extracted from context
  const { isAuthenticated, setIsAuthenticated, setActiveUser } =
    useContext(AuthContext);

  //initiation of basketcontext variable to use the contexts methods
  const basketContext = useContext(BasketContext);

  //history constant initialized to use methods on history hook
  const history = useHistory();

  //function to logout the user by setting isAuthenticated global state to false
  const logout = async () => {
    const data = await AuthService.logout();
    if (data.success) {
      setActiveUser(data.user);
      setIsAuthenticated(false);
      history.push("/login");
    }
  };

  //Navbar links to be returned if global isAuthenticated state is true
  const authNavbar = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/account">Account</NavLink>
        <div style={{ display: "flex" }}>
          <p style={{ fontWeight: "bold", marginRight: "10px" }}>
            Items in basket: {basketContext.basket.length}
          </p>
          {basketContext.showBasket ? (
            <button onClick={() => basketContext.setShowBasket(false)}>
              Hide basket
            </button>
          ) : (
            <button onClick={() => basketContext.setShowBasket(true)}>
              ShowBasket
            </button>
          )}
        </div>
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
        <div style={{ display: "flex" }}>
          <p style={{ fontWeight: "bold", marginRight: "10px" }}>
            Items in basket: {basketContext.basket.length}
          </p>
          {basketContext.showBasket ? (
            <button onClick={() => basketContext.setShowBasket(false)}>
              Hide basket
            </button>
          ) : (
            <button onClick={() => basketContext.setShowBasket(true)}>
              ShowBasket
            </button>
          )}
        </div>
      </>
    );
  };

  //Navbar JSX conatining wrapper-div and a ternary expression either
  //calling for the authnavbar function if the globals isAuthenticated state is true, otherwise for the unauthnavbar function
  return (
    <>
      <Basket />
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
    </>
  );
};
