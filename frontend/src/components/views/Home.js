import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserService from "../../services/UserService";

export const Home = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);

  //get all users and set the to users state
  const getUsers = async () => {
    const data = await UserService.getAllUsers();
    if (data) {
      setUsers(data.users);
    }
  };

  //function to redirect to Store route
  const toStore = (id) => {
    history.push(`/store/${id}`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <h3>Stores</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid black",
              marginRight: "10px",
              maxWidth: "25%",
              padding: "20px",
            }}
          >
            <h4>{user.storename || user.username}</h4>
            <button onClick={() => toStore(user._id)}>To store</button>
          </div>
        ))}
      </div>
    </>
  );
};
