import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { selectItems } from "./cartSlice";
 

export default function Cart() {
  const items = useSelector(selectItems);
 const totalAmount = items.reduce((amount, item)=>item.price*item.quantity+amount, 0);
 const totalItem = items.reduce((total, items)=>items.quantity+total, 0)

  return (
    <div className="mt-8 mx-auto max-w-[80%] px-4 sm:px-6 lg:px-20 bg-white">
      <div className="pt-12">
        <h1 className=" text-4xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>
      </div>
      <div className="mt-8 px-4 ">
        <div className="flow-root">
          <ul
            role="list"
            className="-my-6 divide-y divide-gray-200 px-4 py-6 sm:px-6 "
          >
            {items.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="size-full object-cover"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.title}</a>
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex gap-2">
                      <label
                        htmlFor="Qty"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Qty.
                      </label>
                      <select
                        name=""
                        id="Qty"
                        className="border-gray-200 border-2"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total Items in Cart</p>
          <p>${totalItem}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
           
            <Link to="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
              Checkout
            </Link>
         
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
