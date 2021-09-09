import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Products } from "../user/Products";
import { UserInfo } from "../user/UserInfo";

export const Account = () => {
  //Imports the activeUser global state to render the username on the account page
  const { activeUser } = useContext(AuthContext);
  return (
    <>
      <h1>Account</h1>
      <UserInfo />
      <p>Welcome {activeUser.firstname || activeUser.username}</p>
      <div>
        <Products />
      </div>
    </>
  );
};
