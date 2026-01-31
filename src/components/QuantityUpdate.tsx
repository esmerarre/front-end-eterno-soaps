
import "./QuantityUpdate.css"

type QuantityUpdateProps = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const QuantityUpdate = ({
    count, 
    onDecrement, 
    onIncrement}: 
    QuantityUpdateProps) => {
 

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