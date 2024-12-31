import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductForm from "../features/admin/component/ProductForm";

function AdminAddProductPage() {
  return (
    <div>
      <Navbar>
        <h1 className="text-2xl font-bold tracking-tight text-gray-700">
          Add Product
        </h1>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  );
}

export default AdminAddProductPage;
