import React, { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { AuthContext } from "../../context/AuthContext";

export const UserInfo = () => {
  //breaks out global states and setters from auth context
  const { activeUser, setActiveUser } = useContext(AuthContext);

  //state containing userInfo to be sent to backend/rendered on client
  const [userInfo, setUserInfo] = useState({
    storename: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  //boolean state to see if form is open or closed
  const [addingUserInfo, setAddingUserInfo] = useState(false);

  //function that sets the userInfo state properties to whatever is supplied by the user
  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  //function that sends the userinfo state to the backend for update and sets the global active user properties to the userinfo state properties
  const updateUser = async (e) => {
    e.preventDefault();
    const data = await UserService.updateUser(userInfo);
    if (data) {
      setActiveUser({
        ...activeUser,
        storename: userInfo.storename,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
        phone: userInfo.phone,
      });
      setAddingUserInfo(false);
    }
  };

  //useEffect that runs setUserinfo every time the form opens/closes (addinguserinfo changes) to populate the input fields with the activeusers properties
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      storename: activeUser.storename,
      firstname: activeUser.firstname,
      lastname: activeUser.lastname,
      email: activeUser.email,
      phone: activeUser.phone,
    });
  }, [addingUserInfo]);

  return (
    <div>
      {!addingUserInfo && (
        <div style={{ display: "flex" }}>
          <button onClick={() => setAddingUserInfo(true)}>
            Add/Change User Info
          </button>
          <p style={{ margin: "15px 10px" }}>{activeUser.storename}</p>
          <p style={{ margin: "15px 10px" }}>{activeUser.firstname}</p>
          <p style={{ margin: "15px 10px" }}>{activeUser.lastname}</p>
          <p style={{ margin: "15px 10px" }}>{activeUser.email}</p>
          <p style={{ margin: "15px 10px" }}>{activeUser.phone}</p>
        </div>
      )}
      {addingUserInfo && (
        <form onSubmit={updateUser}>
          <input
            name="storename"
            value={userInfo.storename}
            onChange={handleInput}
            placeholder="Storename"
          />
          <input
            name="firstname"
            value={userInfo.firstname}
            onChange={handleInput}
            placeholder="Firstname"
          />
          <input
            name="lastname"
            value={userInfo.lastname}
            onChange={handleInput}
            placeholder="Lastname"
          />
          <input
            name="email"
            value={userInfo.email}
            onChange={handleInput}
            placeholder="Email"
          />
          <input
            name="phone"
            value={userInfo.phone}
            onChange={handleInput}
            placeholder="Phone"
          />
          <button type="submit">Save</button>
          <button onClick={() => setAddingUserInfo(false)}>Close</button>
        </form>
      )}
    </div>
  );
};
