import React from "react";

import AdminProductList from "../features/admin/component/AdminProductList";
import Navbar from "../features/navbar/Navbar";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
}

export default AdminHome;
