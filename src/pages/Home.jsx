import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/ProductList";
import LoginPage from "./LoginPage";
 
import SignupPage from "./SignupPage";

function Home() {
  return (
    <div>
      {/* <Navbar>
        <ProductList></ProductList>
      </Navbar> */}
      {/* <LoginPage></LoginPage> */}
      <SignupPage></SignupPage>
    </div>
  );
}

export default Home;
