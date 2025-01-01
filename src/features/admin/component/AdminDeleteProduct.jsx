import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,  useParams } from "react-router";
import {
    clearSelectedProduct,
  fetchProductByIdAsync,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";

function AdminDeleteProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  function noHandler() {
    dispatch(clearSelectedProduct())
  }
  function yesHandler() {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product))
    dispatch(clearSelectedProduct())

  }

  return (
    <div className="flex  min-h-screen justify-center   px-6 py-12 lg:px-8 items-center">
      <div className=" flex flex-col gap-6   items-center justify-center">
        <h1 className=" text-2xl font-bold tracking-tight text-gray-700 text-center">
          Do you Really want to delete this Product?{" "}
        </h1>
        <div className="flex gap-5">
          <Link to="/admin">
            <button
              onClick={noHandler}
              type="button"
              className="font-medium text-gray-900 border-2 rounded-md border-indigo-600 text-sm px-5 py-2 hover:bg-green-700 hover:text-white hover:border-none "
            >
              No
            </button>
          </Link>
          <Link to="/admin">
            <button
              onClick={yesHandler}
              type="button"
              className="font-medium text-gray-900 border-2 rounded-md border-indigo-600 text-sm px-5 py-2 hover:bg-red-700 hover:text-white hover:border-none"
            >
              Yes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDeleteProduct;
