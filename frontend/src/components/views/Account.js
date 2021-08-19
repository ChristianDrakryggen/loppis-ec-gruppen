import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Account = () => {
  //Imports the activeUser global state to render the username on the account page
  const { activeUser } = useContext(AuthContext);
  return (
    <>
      <h1>Account</h1>
      <p>Welcome {activeUser.username}</p>
    </>
  );
};
