

import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col gap-5 items-center ">
        <p>{count}</p>
        <div className="flex gap-5 "><button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button></div>
      </div>
    </>
  );
}

export default App;
