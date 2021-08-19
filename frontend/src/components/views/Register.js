import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Register = () => {
  //local state to keep the username and password for registering
  const [user, setUser] = useState({ username: "", password: "" });

  //history constant initialized to use methods on history hook
  const history = useHistory();

  //Function that fires on the input fields onChange events, setting the user state to an object containing the values of the input fields
  const changeUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //Function that runs on submission of form, alerting the user state object and pushing the user to the login route
  const registerNewUser = (e) => {
    e.preventDefault();
    alert("Registered: " + JSON.stringify(user));
    history.push("/login");
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={registerNewUser}>
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
