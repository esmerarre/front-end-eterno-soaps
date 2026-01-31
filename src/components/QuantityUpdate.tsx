
import "./QuantityUpdate.css"
import { useState } from "react";


type QuantityUpdateProps = {

  minValue?: number;
  maxValue?: number; // set this from backend stock
  onChange: (qty: number) => void // optional callback
};

const QuantityUpdate = ({
    maxValue=1, 
    minValue=30, 
    onChange, // optional callback
}: 
    QuantityUpdateProps) => {
    const [count, setCount] = useState<number>(minValue);
 
    const onIncrement = () => {
    setCount((prev) => {
      const next = Math.min(prev + 1, maxValue);
      onChange(next); // ✅ ONLY inside click handler
      return next;
    });
  };

  const onDecrement = () => {
    setCount((prev) => {
      const next = Math.max(prev - 1, minValue);
      onChange(next); // ✅ ONLY inside click handler
      return next;
    });
  };

    return <div className="qty-btn-container">
        <button className="decrement-btn" onClick={onDecrement}>
            <span className="quantity-symbols">-</span>
        </button>

        <p>{count}</p>
        
        <button className="increment-btn" onClick={onIncrement}>
            <span className="quantity-symbols">+</span>
        </button>
    </div>
}

export default QuantityUpdate