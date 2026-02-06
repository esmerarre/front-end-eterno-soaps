
import "./QuantityUpdate.css"

type QuantityUpdateProps = {
  minValue?: number;
  maxValue?: number; // set this from backend stock
  onChange: (qty: number) => void // optional callback
  value: number;
};

const QuantityUpdate = ({
    maxValue=0, 
    minValue=30, 
    onChange, // optional callback
    value
}: 
    QuantityUpdateProps) => {

    return <div className="qty-btn-container">
        <button className="decrement-btn" onClick={() => onChange(Math.max(value - 1, minValue))}>
            <span className="quantity-symbols">-</span>
        </button>

        <p>{value}</p>
        
        <button className="increment-btn" onClick={() => onChange(Math.min(value + 1, maxValue))}>
            <span className="quantity-symbols">+</span>
        </button>
    </div>
}

export default QuantityUpdate