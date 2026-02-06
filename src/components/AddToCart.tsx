// import {useState} from "react";
import type { ProductVariant } from "../App";
import "./AddToCart.css"

// type AddtoCartProps = {
//   minValue?: number;
//   maxValue?: number;
// };
interface AddToCartProps {
  onClick: () => void;
  selectedVariant: ProductVariant | null; // pass selected variant to AddToCart for stock validation
  value: number;
}

const AddToCart = ({ onClick, selectedVariant, value }: AddToCartProps) => {

  const handleClick = () => {
    if (!selectedVariant) {
			alert("Please select a size before adding to cart."); // simple popup
			return;
		}
    if (selectedVariant.stockQuantity === 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }
    if (value <= 0) {
      alert("Please select a quantity before adding to cart.");
      return;
    }
    onClick();
  }

  return (
    <div className="add-to-cart-btn-container">
      <button className="add-cart-btn" onClick={handleClick}>
        <span>Add to Cart</span>
      </button>
    </div>
  );
};


export default AddToCart