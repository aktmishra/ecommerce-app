import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  removeProductFromCartAsync,
  selectItems,
  updateProductQuantityAsync,
} from "./cartSlice";
import { discountedPrice } from "../../app/constant";

export default function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const totalAmount =
    items && items.length > 0
      ? Math.round(
          items.reduce(
            (amount, item) =>
              discountedPrice(item.product) * item.quantity + amount,
            0
          )
        )
      : 0; // Return 0 if items is undefined or empty

  const totalItem =
    items && items.length > 0
      ? items.reduce((total, item) => item.quantity + total, 0)
      : 0;

  function quantityHandler(e, item) {
    dispatch(
      updateProductQuantityAsync({ id:item.id, quantity: +e.target.value })
    );
  }

  function removeProductHandler(itemId) {
    dispatch(removeProductFromCartAsync(itemId));
  }
  if (items && items.length === 0) {
    return (
      <div className="flex flex-col gap-5 items-center min-h-screen justify-center">
        <p className="font-extrabold text-3xl text-gray-900">Empty Cart</p>
        <div>Please Buy Something</div>
        <Link to="/">
          <button
            type="button"
            className="font-medium text-indigo-500 hover:text-indigo-700 border-2 hover:border-indigo-700 border-indigo-500 rounded-md py-2 px-4"
          >
            Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </div>
    );
  }
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
            {items&&items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={item.product.title}
                    src={item.product.thumbnail}
                    className="size-full object-cover"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{item.product.title}</a>
                      </h3>
                      <p className="ml-4">${discountedPrice(item.product)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.product.brand}
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
                        onChange={(e) => quantityHandler(e, item)}
                        name=""
                        id="Qty"
                        className="border-gray-200 border-2"
                        value={item.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={() => removeProductHandler(item.id)}
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
          <p>{totalItem}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
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
