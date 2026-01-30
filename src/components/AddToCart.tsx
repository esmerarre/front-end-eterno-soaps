// import {useState} from "react";
import "./AddToCart.css"

// type AddtoCartProps = {
//   minValue?: number;
//   maxValue?: number;
// };
interface AddToCartProps {
  onClick: () => void;
}

const AddToCart = ({ onClick }: AddToCartProps) => {
  return (
    <div className="add-to-cart-btn-container">
      <button className="add-cart-btn" onClick={onClick}>
        <span>Add to Cart</span>
      </button>
    </div>
  );
};


export default AddToCart