import type { CartItem, Product, ProductSummary, ProductVariant } from "../App";
import QuantityUpdate from "./QuantityUpdate";
import AddToCart from "./AddToCart";
import "./Product.css";
import { useState } from "react";

interface ProductProps {
	product: Product | ProductSummary;
	isSelected: boolean;
	onSelect: () => void;
	variants: ProductVariant[] | null;
	selectedVariant: ProductVariant | null;
	onVariantSelect: (variant: ProductVariant) => void;
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	onAddToCart: (item: CartItem) => void;
	openCart: () => void;

	
}

export default function ProductCard({
	
	product,
	isSelected,
	onSelect,
	variants,
	selectedVariant,
	onVariantSelect,
	isModalOpen,
	openModal,
	closeModal,
	onAddToCart,
	openCart,
}: ProductProps) {

	const defaultPrice = () => {
		if (!variants || variants.length === 0) return "Not Available";
		const prices = variants.map((variant) => variant.price);
		const minPrice = Math.min(...prices);
		return `$${minPrice}`;
	}
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	const handleAddToCartClick = () => {
		if (!selectedVariant) {
			alert("Please select a size before adding to cart."); // simple popup
			return;
		}
		
		onAddToCart({
			id: selectedVariant.id,
			productId: product.id,
			name: product.name,
			price: selectedVariant.price,
			quantity: selectedQuantity,
		})
		openCart();   // open the cart immediately
		closeModal(); // optional: close modal after adding
};

	// Sort variants by size (Small, Medium, Large, etc.)
	const sizeOrder = ["small", "medium", "large"];
	//copy of variants gets sorted here 
	const sortedVariants = variants ? [...variants].sort((a, b) => {
		const sizeA = a.size.toLowerCase();
		const sizeB = b.size.toLowerCase();
		const indexA = sizeOrder.indexOf(sizeA);
		const indexB = sizeOrder.indexOf(sizeB);
		
		// If both sizes are in the order array, sort by that order
		//-1 means the size is not in predefined order, next line is for when both sizes are in the size order
		if (indexA !== -1 && indexB !== -1) return indexA - indexB; // if negative, a comes before b
		// If only one is in the order array, it comes first
		if (indexA !== -1) return -1;
		if (indexB !== -1) return 1;
		// If neither are in the order array, sort alphabetically
		return sizeA.localeCompare(sizeB);
	}) : null;


// THIS LOGIC IS TO HIGHLIGHT DEFAULT SIZE BUTTON BUT MAY IMPLEMENT LATER
	// 	//first ? automatically returns null if variants is null or undefined
	// const cheapestSize = variants?.reduce((min, curr) => 
	// 	curr.price < min.price ? curr : min
	// ) ?? null;
	//NEEDS TO BE MOVED TO APPROPRIATE ClassName= LOCATION
	// // ${cheapestSize?.id === variant.id ? "cheapest" : ""}

	return (
		<div className="product-card-container">
			<button onClick={() => { onSelect(); openModal(); defaultPrice();}} className="product-card">
				<img src= "cottonwood_large-mb.jpg" alt="soap product image" id="card-img"/>
				<h3>{product.name}</h3>
				<p>{product.description}</p>
			</button>

		{isSelected && isModalOpen && variants && (
				<div className="modal" onClick={closeModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<button className="close" onClick={closeModal}>&times;</button>
						<img src= "cottonwood_large-mb.jpg" alt="soap product image"/>
						<h2>{product.name}</h2>
						<h4> {selectedVariant ? `$${selectedVariant.price}` : defaultPrice()}</h4>


					<div className="variant-buttons-container">
					{sortedVariants && sortedVariants.map((variant) => (
						<button
							key={variant.id}
							onClick={() => onVariantSelect(variant)}
							className={`variant-btn ${
								selectedVariant?.id === variant.id ? "active" : ""
							} `}
						>
							{variant.size}
						</button>
					))}
					</div>

						<h3 className="modal-description">{product.description}</h3>
						<div className="ingredients-block">
							<h3> Key Ingredients: </h3>
							<p>{product.ingredients?.join(", ")}</p>
						</div>
						<div className="quantity-add-cart-container">
							<QuantityUpdate
							minValue={1}
							maxValue={selectedVariant?.stockQuantity ?? 30} // limit by backend stock
							onChange={(qty) => setSelectedQuantity(qty)}
							/>
							<AddToCart onClick={handleAddToCartClick}
							
							/>
						</div>

					</div>
				</div>
			)}
		</div>
	);
}
	
