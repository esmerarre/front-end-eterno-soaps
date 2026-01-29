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

	return (
		<div className="product-card-container">
			<button onClick={() => { onSelect(); openModal(); }} className="product-card">
				<h3>{product.name}</h3>
				<p>{product.description}</p>
			</button>

			{isSelected && variants && (
				<div className="modal" onClick={closeModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<span className="close" onClick={closeModal}>&times;</span>
						<h2>{product.name}</h2>
						<h4>Available Sizes:</h4>
						{variants.map((variant) => (
							<button
								key={variant.id}
								onClick={() => onVariantSelect(variant)}
								className={`variant-btn ${
									selectedVariant?.id === variant.id ? "active" : ""
								}`}
							>
								{variant.size} - ${variant.price}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
	
