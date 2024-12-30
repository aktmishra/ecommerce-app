import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectCompleteUserInfo, selectUserOrders } from "../userSlice";
 
import { Link } from "react-router";

function UserOrder() {
  const orders = useSelector(selectUserOrders);
  const user = useSelector(selectCompleteUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, []);

  if (orders.length === 0) {
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
    <div>
      {orders.map((order, index) => (
        <div
          key={index}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-5"
        >
          <div className="pt-8">
            <h1 className=" text-2xl font-bold tracking-tight text-gray-700">
              Order Id # {order.id}
            </h1>
            <p className=" text-md font-semibold tracking-tight text-gray-700 mt-2">
              Order Status <span className="text-red-700 ml-2" >{order.status}</span>
            </p>
          </div>
          <div className="mt-3 px-4 max-sm:px-0 ">
            <div className="flow-root">
              <ul
                role="list"
                className="-my-6 divide-y divide-gray-200 px-4 py-6 sm:px-6 "
              >
                {order.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200 max-sm:size-14">
                      <img
                        alt={product.title}
                        src={product.thumbnail}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>{product.title}</p>
                          <div className="flex flex-col   items-start ">
                            <p className="">${product.price}</p>
                            <p className="block text-sm/6 font-medium text-gray-900">
                              Qty. {product.quantity}
                            </p>
                          </div>
                        </div>
                        <p className=" text-sm text-gray-500">
                          {product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-0 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{order.totalItem}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping Address.</p>

            <div className="mt-2 border border-gray-300">
              <div className="flex  gap-x-6 p-2 items-center justify-between">
                <div className="flex min-w-0 gap-x-4 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {order.selectedAddress.fullName}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {order.selectedAddress.email}
                    </p>
                    <p className="text-sm/6 text-gray-900">
                      {order.selectedAddress.phone}
                    </p>
                  </div>
                </div>
                <div className=" shrink-0 sm:flex sm:flex-col sm:items-start">
                  <p className="text-sm/6 text-gray-900">
                    {order.selectedAddress.streetAddress}
                  </p>
                  <div className="flex gap-2">
                    <p className="text-sm/6 text-gray-900">
                      {order.selectedAddress.city}
                    </p>
                    <p className="text-sm/6 text-gray-900">
                      {order.selectedAddress.state}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-sm/6 text-gray-900">
                      {order.selectedAddress.zipCode}
                    </p>
                    <p className="text-sm/6 text-gray-900">
                      {order.selectedAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrder;
