import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectAllProducts,
  selectProductById,
} from "../productSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

function ProductGrid() {
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectLoggedInUser);

  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-1 items-center"
              >
                <Link
                  to={
                    user.role === "admin"
                      ? `/admin/product-detail/${product.id}`
                      : `/product-detail/${product.id}`
                  }
                >
                  <div className="group relative min-h-60 border-gray-300 border-2 p-1 rounded-md  ">
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      className="aspect-square  w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto  "
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <p href={product.thumbnail}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </p>
                        </h3>
                        <p href="" className="flex gap-1 items-center">
                          <StarIcon className="size-4  text-yellow-400 fill-yellow-400"></StarIcon>
                          <span className="text-gray-600 text-sm">
                            {product.rating}
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                        <p className="text-sm line-through font-medium text-gray-600">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                {user.role === "admin" && (
                  <div className="flex gap-1 mt-1">
                    <Link
                      to={`/admin/edit-product/${product.id}`}
                      type="button"
                      onClick={(e) => {}}
                      className = {product.deleted === true ?"hidden":"font-medium border-2 rounded-md border-indigo-400 text-indigo-500 hover:text-white hover:bg-indigo-500 text-sm px-3" }
                    >
                      Edit
                    </Link>
                    {product.deleted === true ? (
                      <div className="font-medium border-2 rounded-md border-red-700 bg-red-700 text-white text-sm px-3">
                        Deleted
                      </div>
                    ) : (
                      <Link
                        type="button"
                        to={`/admin/delete-product/${product.id}`}
                        className="font-medium border-2 rounded-md border-red-700 text-red-700 hover:text-white hover:bg-indigo-500 text-sm px-3"
                      >
                        Delete
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
