import React from "react";
import AdminOrder from "../features/admin/component/AdminOrder";
import Navbar from "../features/navbar/Navbar";

function AdminOrderPage() {
  return (
    <div>
      <Navbar>
        <AdminOrder></AdminOrder>
      </Navbar>
    </div>
  );
}

export default AdminOrderPage;
