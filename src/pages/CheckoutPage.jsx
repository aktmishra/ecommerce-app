import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, Navigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import {
  removeProductFromCartAsync,
  selectItems,
  updateProductQuantityAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { createOrderAsync } from "../features/order/orderSlice";

function CheckoutPage() {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const dispatch = useDispatch();
  const totalAmount = Math.round(
    items.reduce((amount, item) => item.price * item.quantity + amount, 0)
  );
  const totalItem = items.reduce((total, item) => item.quantity + total, 0);

  function quantityHandler(e, product) {
    dispatch(
      updateProductQuantityAsync({ ...product, quantity: +e.target.value })
    );
  }

  function removeProductHandler(id) {
    dispatch(removeProductFromCartAsync(id));
  }

  function addressHandler(e) {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  }

  function paymentHandler(e) {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  }

  function orderHandler() {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        user,
        selectedAddress,
        totalAmount,
        totalItem,
        paymentMethod,
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Enter Address and Payment Method");
    }
    //TODO : Redirect to order-success page
    //TODO : clear cart after order
    //TODO : on server change the stock number of items
  }

  function onSubmit(data) {
    console.log(data);
    dispatch(
      updateUserAsync({
        ...user,
        addresses: [...user.addresses, data],
      })
    );
    reset();
  }

  return (
    <>
      {items.length === 0 && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-5 gap-y-2 lg:grid-cols-5">
          {/* This form is for address*/}

          <div className="  lg:col-span-3 ">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="px-8 py-5 my-12 bg-white"
            >
              <div>
                {/* Personal Info */}
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="full-name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="full-name"
                          type="text"
                          {...register("fullName", {
                            required: "Full Name is required",
                          })}
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.fullName && (
                          <p className="text-red-500">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "Email is not valid",
                            },
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone Number is required",
                            pattern: {
                              value:
                                /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
                              message: ["- Enter Valid Phone Number"],
                            },
                          })}
                          type="tele"
                          autoComplete="phone"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          {...register("country", {
                            required: "Country is Required",
                          })}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option value="India">India</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Canada">Canada</option>
                          <option value="China">China</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                        {errors.country && (
                          <p className="text-red-500">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="streetAddress"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="streetAddress"
                          name="street-address"
                          {...register("streetAddress", {
                            required: " Required",
                          })}
                          type="text"
                          autoComplete="streetAddress"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.streetAddress && (
                          <p className="text-red-500">
                            {errors.streetAddress.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "City is Required",
                          })}
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register("state", {
                            required: "State is Required",
                          })}
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="zipCode"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP Code
                      </label>
                      <div className="mt-2">
                        <input
                          id="zipCode"
                          {...register("zipCode", {
                            required: "Zip Code is Required",
                          })}
                          type="text"
                          autoComplete="zipCode"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* button */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
                {/* Saved Addresses  */}
                <div className="border-b border-gray-900/10 pb-0">
                  <div className="space-y-5">
                    <fieldset>
                      <legend className="text-sm/6 font-semibold text-gray-900">
                        Address
                      </legend>
                      <p className="mt-1 text-sm/6 text-gray-600">
                        Choose one existing address.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-x-3">
                          <ul role="list" className="divide-y divide-gray-100">
                            {user.addresses.map((address, index) => (
                              <li
                                key={index}
                                className="flex  gap-x-6 py-5 items-center justify-center"
                              >
                                <input
                                  onChange={(e) => addressHandler(e)}
                                  id={index}
                                  name="address"
                                  type="radio"
                                  value={index}
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                />
                                <label
                                  htmlFor={address.email}
                                  className="flex gap-x-48 py-5 flex-wrap"
                                >
                                  <div className="flex min-w-0 gap-x-4 ">
                                    <div className="min-w-0 flex-auto">
                                      <p className="text-sm/6 font-semibold text-gray-900">
                                        {address.fullName}
                                      </p>
                                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                                        {address.email}
                                      </p>
                                      <p className="text-sm/6 text-gray-900">
                                        {address.phone}
                                      </p>
                                    </div>
                                  </div>
                                  <div className=" shrink-0 sm:flex sm:flex-col sm:items-start">
                                    <p className="text-sm/6 text-gray-900">
                                      {address.streetAddress}
                                    </p>
                                    <div className="flex gap-2">
                                      <p className="text-sm/6 text-gray-900">
                                        {address.city}
                                      </p>
                                      <p className="text-sm/6 text-gray-900">
                                        {address.state}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <p className="text-sm/6 text-gray-900">
                                        {address.zipCode}
                                      </p>
                                      <p className="text-sm/6 text-gray-900">
                                        {address.country}
                                      </p>
                                    </div>
                                  </div>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                {/* Payment Mode */}
                <div className="border-b border-gray-900/10 pb-4">
                  <div className="mt-5 space-y-10">
                    <fieldset>
                      <legend className="text-sm/6 font-semibold text-gray-900">
                        Payment Mode
                      </legend>
                      <p className="mt-1 text-sm/6 text-gray-600">
                        Choose one.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-x-3">
                          <input
                            value="cash"
                            id="cash"
                            name="payment-mode"
                            type="radio"
                            onChange={paymentHandler}
                            checked={paymentMethod === "cash"}
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            value="card"
                            id="card"
                            name="payment-mode"
                            type="radio"
                            onChange={paymentHandler}
                            checked={paymentMethod === "card"}
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* left side end */}

          {/* right side start here*/}

          {items && (
            <div className="lg:col-span-2">
              <div className=" mx-auto my-12 max-w-7xl px-2  sm:px-3 lg:px-5 bg-white">
                <div className="pt-8">
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
                                  onChange={(e) => quantityHandler(e, product)}
                                  name=""
                                  id="Qty"
                                  className="border-gray-200 border-2"
                                  value={product.quantity}
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
                                  onClick={() =>
                                    removeProductHandler(product.id)
                                  }
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
                    <button
                      onClick={orderHandler}
                      className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order Now
                    </button>
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
            </div>
          )}
          {/* right side end here */}
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
