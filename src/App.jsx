import "./App.css";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDeatailsPage from "./pages/ProductDeatailsPage";
import Protected from "./features/auth/component/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccesPage";
import UserOrderPage from "./pages/UserOrderPage";
import { fetchLoggedInUserDetailsAsync } from "./features/user/userSlice";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./features/auth/component/Logout";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import AdminProtected from "./features/auth/component/AdminProtected";
import AdminHome from "./pages/AdminHome";
import AdminProductDeatailsPage from "./pages/AdminProductDeatailsPage";
import AdminEditProductPage from "./pages/AdminEditProductFormPage";
import AdminAddProductPage from "./pages/AdminAddProductPage";
import AdminDeleteProduct from "./features/admin/component/AdminDeleteProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },

  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDeatailsPage></ProductDeatailsPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage></ForgetPasswordPage>,
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome></AdminHome>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <AdminProtected>
        <AdminProductDeatailsPage></AdminProductDeatailsPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/edit-product/:id",
    element: (
      <AdminProtected>
        <AdminEditProductPage></AdminEditProductPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/delete-product/:id",
    element: (
      <AdminProtected>
        <AdminDeleteProduct></AdminDeleteProduct>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/add-product",
    element: (
      <AdminProtected>
        <AdminAddProductPage></AdminAddProductPage>
      </AdminProtected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserDetailsAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
