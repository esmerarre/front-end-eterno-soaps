import { useState } from "react";
import SalesChart from "./components/SalesChart";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Seller Dashboard (Prototype)</h1>

      <SalesChart />

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;

