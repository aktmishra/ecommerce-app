import "./App.css";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, selectCount } from "./features/counter/counterSlice";
import ProductList from "./features/product-list/ProductList"

function App() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();

  return (
    
      <div className=" ">
       <ProductList></ProductList>
      </div>
    
  )
}

export default App;
