import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { selectCompleteUserInfo, updateUserAsync } from "../userSlice";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function UserProfile() {
  const userDetail = useSelector(selectCompleteUserInfo);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showEditAddressForm, setEditShowAddressForm] = useState(false);
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  function addAddressHandler(address) {
    const newUser = {
      ...userDetail,
      addresses: [...userDetail.addresses, address],
    }; // to avoid shallow copy
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  }
  
  function removeAddressHandler(e, index) {
    const newUser = {
      ...userDetail,
      addresses: [...userDetail.addresses],
    }; // to avoid shallow copy
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  }
  const setValueEditFormHandler = (index) => {
    setEditShowAddressForm(true);
    const address = userDetail.addresses[index];
    setValue("fullName", address.fullName);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("country", address.country);
    setValue("zipCode", address.zipCode);
    setValue("phone", address.phone);
    setValue("streetAddress", address.streetAddress);
  };

  function editAddressHandler(address, editAddressIndex) {
    const newUser = { ...userDetail, addresses: [...userDetail.addresses] }; // for shallow copy issue
    newUser.addresses.splice(editAddressIndex, 1, address);
    dispatch(updateUserAsync(newUser));
    setEditShowAddressForm(false);
  }

  return (
    <>
      {userDetail && (
        <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-8 bg-white mt-5 min-h-screen">
          <div className=" flex gap-3 flex-col sm:px-7">
            <div className="border-b-2 border-gray-300 py-5">
              <h1 className=" text-2xl font-bold tracking-tight text-gray-700">
                {userDetail.fullName}
              </h1>
              <p className=" text-sm/6 text-gray-600"> {userDetail.email}</p>
            </div>
            {/* Address Section  */}
            <section>
              <div>
                <button
                  type="button"
                  onClick={(e) => setShowAddAddressForm(true)}
                  className={`${
                    showAddAddressForm || showEditAddressForm
                      ? "hidden"
                      : "block"
                  } font-medium border-2 rounded-md border-green-700  text-white bg-green-700 text-sm px-5 py-2`}
                >
                  Add Address
                </button>

                <div className="border-b border-gray-900/10 pb-0">
                  <div className="mt-4 ">
                    {showAddAddressForm || showEditAddressForm ? (
                      <form
                        noValidate
                        onSubmit={handleSubmit((address) => {
                          if (showAddAddressForm) {
                            addAddressHandler(address);
                          }

                          if (showEditAddressForm) {
                            editAddressHandler(address, editAddressIndex);
                          }
                          reset();
                        })}
                        className="px-8 py-5 my-5 bg-white"
                      >
                        <div>
                          {/* Add/Edit Address Form */}
                          <div className="border-b border-gray-900/10 mb-5 pb-10">
                            <p className="mt-1 text-xl text-gray-700">
                              Note: Use a permanent address where you can
                              receive mail.
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
                                        value:
                                          /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                        message: "Email is not valid",
                                      },
                                    })}
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                  />
                                  {errors.email && (
                                    <p className="text-red-500">
                                      {errors.email.message}
                                    </p>
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
                                    <p className="text-red-500">
                                      {errors.phone.message}
                                    </p>
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
                                    <p className="text-red-500">
                                      {errors.city.message}
                                    </p>
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
                                    <p className="text-red-500">
                                      {errors.state.message}
                                    </p>
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
                              className="font-medium border-2 rounded-md border-green-700  text-white bg-green-700 text-sm px-5 py-2"
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => {
                                setShowAddAddressForm(false);
                                setEditShowAddressForm(false);
                                reset();
                              }}
                              type="button"
                              className="font-medium border-2 rounded-md border-green-700  text-white bg-green-700 text-sm px-5 py-2"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="font-medium border-2 rounded-md border-green-700  text-white bg-green-700 text-sm px-5 py-2"
                            >
                              {showEditAddressForm ? "Edit" : "Add"}
                              <span className="max-sm:hidden ml-1">
                                Address
                              </span>
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : null}
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center gap-x-3">
                        <ul
                          role="list"
                          className="divide-y divide-gray-100 min-w-full"
                        >
                          <p className="mt-1 text-sm/6 text-gray-600">
                            Saved Address.
                          </p>
                          {userDetail.addresses.length > 0 ? (
                            userDetail.addresses.map((address, index) => (
                              <li
                                key={index}
                                className="flex  gap-x-6 py-5 items-center justify-between border-t border-gray-300"
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
                                <div className="flex flex-col gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      setEditAddressIndex(index);
                                      setValueEditFormHandler(index);
                                    }}
                                    className="font-medium border-2 rounded-md border-indigo-400 text-indigo-500 hover:text-white hover:bg-indigo-500 text-sm px-5 "
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={(e) =>
                                      removeAddressHandler(e, index)
                                    }
                                    type="button"
                                    className="font-medium border-2 rounded-md border-indigo-400 text-indigo-500 hover:text-white hover:bg-indigo-500 text-sm px-5"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </li>
                            ))
                          ) : (
                            <p className="mt-1 text-md text-gray-600">
                              Currently There is No Address
                            </p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
