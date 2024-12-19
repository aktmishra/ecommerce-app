import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../productSlice";

function ProductGrid() {
  const products = useSelector(selectAllProducts);
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link to={`/product-detail/${product.id}`} key={product.id}>
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
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className="text-sm line-through font-medium text-gray-600">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
