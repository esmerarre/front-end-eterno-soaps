import {useState} from "react";
import "./QuantityUpdate.css"


type QuantityUpdateProps = {
  minValue?: number;
  maxValue?: number;
};

const QuantityUpdate = ({minValue= 1, maxValue= 30}: QuantityUpdateProps) => {
    const [count, setCount] = useState(minValue);

    //handle increase function
    const handleIncrement = () => {
        if (count < maxValue) {
            setCount((prevState: number) => prevState + 1);
        }
    };

    //handle decrease function
    const handleDecrement = () => {
        if (count > 1) {
            setCount((prevState: number) => prevState - 1);
        }
    };

    return <div className="qty-btn">
        <button className="increment-btn" onClick={handleIncrement}>
            <span className="quantity-symbols">+</span>
        </button>

        <p>{count}</p>
        <button className="decrement-btn" onClick={handleDecrement}>
            <span className="quantity-symbols">-</span>
        </button>
    </div>
}

export default QuantityUpdate