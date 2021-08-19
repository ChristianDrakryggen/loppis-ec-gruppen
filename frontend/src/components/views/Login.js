import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const { setIsAuthenticated, setActiveUser } = useContext(AuthContext);
  const history = useHistory();

  const changeUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setActiveUser(user);
    history.push("/account");
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={changeUserData}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeUserData}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
