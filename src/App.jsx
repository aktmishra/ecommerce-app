import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDeatailsPage from "./pages/ProductDeatailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    element: <CartPage></CartPage>
  },
  {
    path: "/checkout",
    element: <CheckoutPage></CheckoutPage>
  },
  {
    path: "/product-detail",
    element: <ProductDeatailsPage></ProductDeatailsPage>
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
