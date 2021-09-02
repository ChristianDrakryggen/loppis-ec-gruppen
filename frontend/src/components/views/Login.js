import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

export const Login = () => {
  //local state to keep the username and password for signing in
  const [userState, setUserState] = useState({ username: "", password: "" });

  //global setters for isAuthenticated and activeUser states extracted from context
  const { setIsAuthenticated, setActiveUser } = useContext(AuthContext);

  //history constant initialized to use methods on history hook
  const history = useHistory();

  //Function that fires on the input fields onChange events, setting the user state to an object containing the values of the input fields
  const changeUserData = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  //Function that runs on submission of form, setting the global authenticated state to true,
  //the global activeUser state to the local state user object, and redirects user to the account route
  const loginUser = async (e) => {
    e.preventDefault();
    const data = await AuthService.login(userState);
    const { isAuthenticated, user } = data;
    if (isAuthenticated) {
      setIsAuthenticated(isAuthenticated);
      setActiveUser(user);
      history.push("/account");
    }
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
