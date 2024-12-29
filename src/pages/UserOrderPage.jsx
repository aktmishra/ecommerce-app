import React from "react";
import UserOrder from "../features/user/component/userOrder";
import Navbar from "../features/navbar/Navbar";

function UserOrderPage() {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
        <UserOrder></UserOrder>
      </Navbar>
    </div>
  );
}

export default UserOrderPage;
