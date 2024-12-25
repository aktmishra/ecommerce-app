import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDeatailsPage from "./pages/ProductDeatailsPage";
import Protected from "./features/auth/component/Protected";


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
      <Home></Home>
    </Protected>),
  },

  {
    path: "/signup",
    element: 
      <SignupPage></SignupPage>
    ,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/cart",
    element: (<Protected>
      <CartPage></CartPage>
    </Protected>),
  },
  {
    path: "/checkout",
    element: (<Protected>
      <CheckoutPage></CheckoutPage>
    </Protected>),
  },
  {
    path: "/product-detail/:id",
    element: (<Protected>
      <ProductDeatailsPage></ProductDeatailsPage>
    </Protected>),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
