import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "./features/counter/counterSlice";

function App() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col gap-5 items-center ">
        <p>{count}</p>
        <div className="flex gap-5 ">
          <button onClick={() => dispatch(increment())}>Increment</button>
         
        </div>
      </div>
    </>
  );
}

export default App;
