import type { Product, ProductVariant } from "../App";
import "./ProductList.css";

interface ProductProps {
	product: Product;
	isSelected: boolean;
	onSelect: () => void;
	variants: ProductVariant[] | null;
	selectedVariant: ProductVariant | null;
	onVariantSelect: (variant: ProductVariant) => void;
}

export default function ProductCard({
	product,
	isSelected,
	onSelect,
	variants,
	selectedVariant,
	onVariantSelect,
}: ProductProps) {
	return (
		<div className="product-card">
			<h3>{product.name}</h3>
			<p>{product.description}</p>

			<button onClick={onSelect} className="btn-view-variants">
				View Sizes & Prices
			</button>

			{isSelected && variants && (
				<div className="variants-container">
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
			)}

			{isSelected && selectedVariant && (
				<div className="selected-info">
					<p>
						Selected: {selectedVariant.size} - ${selectedVariant.price}
					</p>
					<p>Stock: {selectedVariant.stockQuantity}</p>
				</div>
			)}
		</div>
	);
}
