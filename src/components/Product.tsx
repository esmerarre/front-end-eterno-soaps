import type { Product, ProductVariant } from "../App";
import "./ProductList.css";
// import { useState } from "react";

interface ProductProps {
	product: Product;
	isSelected: boolean;
	onSelect: () => void;
	variants: ProductVariant[] | null;
	selectedVariant: ProductVariant | null;
	onVariantSelect: (variant: ProductVariant) => void;
	openModal: () => void;
	closeModal: () => void;
}

export default function ProductCard({
	product,
	isSelected,
	onSelect,
	variants,
	selectedVariant,
	onVariantSelect,
	openModal,
	closeModal,
}: ProductProps) {

	const defaultPrice = () => {
		if (!variants || variants.length === 0) return "Not Available";
		const prices = variants.map((variant) => variant.price);
		const minPrice = Math.min(...prices);
		return `$${minPrice}`;
	}

		//? automatically return null if variants is null or undefined
	const cheapestSize = variants?.reduce((min, curr) => 
		curr.price < min.price ? curr : min
	) ?? null;

	return (
		<div className="product-card-container">
			<button onClick={() => { onSelect(); openModal(); defaultPrice(); onVariantSelect()}} className="product-card">
				<h3>{product.name}</h3>
				<p>{product.description}</p>
			</button>

			{isSelected && variants && (
				<div className="modal" onClick={closeModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<span className="close" onClick={closeModal}>&times;</span>
						<h2>{product.name}</h2>
						<h4> {selectedVariant ? `$${selectedVariant.price}` : defaultPrice()}</h4>

						{variants.map((variant) => (
							<button
								key={variant.id}
								onClick={() => onVariantSelect(variant)}
								className={`variant-btn ${
									selectedVariant?.id === variant.id ? "active" : ""
								} ${cheapestSize?.id === variant.id ? "cheapest" : ""}`}
							>
								{variant.size}
							</button>
						))}

						<h3 className="modal-description">{product.description}</h3>
						<div className="ingredients-block">
							<h4> Ingredients: </h4>
							<p>{product.ingredients?.join(", ")}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
	
