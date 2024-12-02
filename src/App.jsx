import "./App.css";
 
 

import Home from "./pages/Home";
import  React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
   
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },

  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  }
]);



function App() {
 

  return (
    
      <div className="App">
        <RouterProvider router={router} />
      </div>
    
  )
}

export default App;
