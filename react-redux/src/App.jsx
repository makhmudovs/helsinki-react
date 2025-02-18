import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>increase</button>
        <p>count is {count}</p>
        <button onClick={() => dispatch(decrement())}>decrease</button>
        <button onClick={() => dispatch(reset())}>0</button>
      </div>
    </>
  );
}

export default App;
