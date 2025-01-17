import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Pagination from "../../pagination/Pagination";

import {
  ChevronDownIcon,
  EyeIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersByFiltersAsync,
  selectAllOrder,
  selectTotalItems,
  updateOrderAsync,
} from "../../order/orderSlice";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constant";

const sortOptions = [
  { name: "Date: Newest", sort: "date", order: "asc", current: false },
  { name: "Date: Oldest", sort: "date", order: "desc", current: false },
  {
    name: "Amount: Low to Hight",
    sort: "totalAmount",
    order: "asc",
    current: false,
  },
  {
    name: "Amount: High to Low",
    sort: "totalAmount",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function chooseBgColor(status) {
  switch (status) {
    case "pending":
      return "bg-purple-600";
    case "accepted":
      return "bg-blue-600";
    case "dispatched":
      return "bg-yellow-600";
    case "delivered":
      return "bg-green-600";
    case "canceled":
      return "bg-red-600";
    default:
      return "bg-purple-600";
  }
}
function chooseTextColor(status) {
  switch (status) {
    case "pending":
      return "text-purple-600";
    case "accepted":
      return "text-blue-600";
    case "dispatched":
      return "text-yellow-600";
    case "delivered":
      return "text-green-600";
    case "canceled":
      return "text-red-600";
    default:
      return "text-purple-600";
  }
}
function AdminOrder() {
  const orders = useSelector(selectAllOrder);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch();
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  function handleSort(e, option) {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  }

  function handlePage(page) {
    setPage(page);
  }

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchOrdersByFiltersAsync({ sort, pagination }));
  }, [dispatch, sort, page]);

  function handleShow(order) {
    console.log(order.id);
  }

  function handleEdit(order) {
    console.log(order.id);
    setEditableOrderId(order.id);
  }

  function handleOrderStatus(e, order) {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  }

  return (
    <div>
      <div className="bg-white container mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 flex flex-col min-h-screen ">
        <div className="flex justify-between px-2">
          <div>
            <p className="group inline-flex justify-center text-3xl font-bold text-gray-800 ">
              Total Order:{" "}
              <span className="ml-2 text-green-700 font-extrabold">
                {totalItems}
              </span>
            </p>
          </div>
          <div>
            {/* Sorting */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border-2 rounded-md border-gray-700 p-1">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-700 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="w-48 absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <div
                        onClick={(e) => handleSort(e, option)}
                        className={classNames(
                          option.current
                            ? "font-medium text-gray-900"
                            : "text-gray-500",
                          "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        )}
                      >
                        {option.name}
                      </div>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <section className="container max-w-7xl px-2 ">
          <div className="flex flex-col mt-2 ">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg ">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700  ">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm text-nowrap font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          ORDER ID
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          ITEM DETAILS
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap"
                        >
                          TOTAL OTY.
                        </th>
                        <th
                          scope="col"
                          className=" px-8 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          AMOUNT
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm text-nowrap font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          SHIPPING ADDRESS
                        </th>

                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            STATUS
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm text-nowrap font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {orders &&
                        orders.map((order, index) => (
                          <tr key={order.id}>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {order.id}
                            </td>
                            <td className="px-4 py-4 text-gray-500 whitespace-nowrap dark:text-gray-300">
                              {order.items.map((item, index) => (
                                <div key={index}>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      <span className="text-sm min-w-14  ">
                                        Oty. {item.quantity}
                                      </span>
                                      <span className="ml-3 min-w-16 text-sm  ">
                                        $ {discountedPrice(item.product)}
                                      </span>
                                    </div>

                                    <img
                                      className="object-cover ml-3 w-6 h-6 rounded-full   "
                                      src={item.product.thumbnail}
                                      alt={item.product.title}
                                    />
                                    <div className="text-xs text-gray-800  dark:text-white ">
                                      {item.product.title}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </td>
                            <td className="px-8 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <strong>{order.totalItem}</strong>
                            </td>
                            <td className="px-8 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              $ <strong>{order.totalAmount}</strong>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap min-w-fit">
                              <div className="">
                                <div>
                                  <strong>
                                    {order.shippingAddress.fullName}
                                  </strong>
                                  ,
                                </div>
                                <div>{order.shippingAddress.email},</div>
                                <div>{order.shippingAddress.phone}, </div>
                                <div>
                                  {order.shippingAddress.streetAddress},{" "}
                                </div>
                                <div>
                                  {order.shippingAddress.zipCode},{" "}
                                  {order.shippingAddress.city},{" "}
                                </div>
                                <div>{order.shippingAddress.state}, </div>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {order.id === editableOrderId ? (
                                <select
                                  onChange={(e) => handleOrderStatus(e, order)}
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="dispatched">Dispatched</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="canceled">Canceled</option>
                                </select>
                              ) : (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${chooseBgColor(
                                      order.status
                                    )}`}
                                  />
                                  <h2
                                    className={`text-sm font-normal mb-1 ${chooseTextColor(
                                      order.status
                                    )}`}
                                  >
                                    {order.status}
                                  </h2>
                                </div>
                              )}
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <EyeIcon
                                  onClick={(e) => handleShow(order)}
                                  className="text-white size-6 cursor-pointer hover:text-green-700 "
                                ></EyeIcon>
                                <PencilSquareIcon
                                  onClick={(e) => handleEdit(order)}
                                  className="text-white size-6 cursor-pointer hover:text-red-600"
                                ></PencilSquareIcon>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* pagination code */}

        <Pagination
          handlePage={handlePage}
          totalItems={totalItems}
          page={page}
        ></Pagination>
      </div>
    </div>
  );
}

export default AdminOrder;
