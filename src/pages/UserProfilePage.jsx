import React from "react";
import UserProfile from "../features/user/component/UserProfile";
import Navbar from "../features/navbar/Navbar";

function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <h1 className="text-2xl font-bold tracking-tight text-gray-700">
          My Profile
        </h1>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
}

export default UserProfilePage;
