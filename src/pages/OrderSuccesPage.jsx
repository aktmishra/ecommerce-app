import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router";
import { resetCartAsync } from "../features/cart/cartSlice";
import { currentOrderReset } from "../features/order/orderSlice";
import { selectCompleteUserInfo } from "../features/user/userSlice";

function OrderSuccessPage() {
  const  userDetail = useSelector(selectCompleteUserInfo);
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    //reset cart
    dispatch(resetCartAsync( userDetail.id));
    // reset currentOrder
    dispatch(currentOrderReset());
  }, [dispatch,  userDetail]);

  return (
    <div>
      {!id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-screen min-w-fit place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Thank You !</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Your order Number is #{id}
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            {`You can check your order in My Account > My Orders`}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccessPage;
