import React from "react";

function UserInfo({ user, index }) {
  return (
    <li key={index}>
      <p>
        <img src={user.picture.large} alt="user"></img>
      </p>
      <p>{user.name.first + " " + user.name.last}</p>
    </li>
  );
}

export default UserInfo;
