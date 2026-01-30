import "./ProductList.css";
import type { Product, ProductVariant } from "../App";
import ProductCard from "./Product";
// import {useState, useEffect} from "react";

interface ProductListProps {
    // Props needed to render product tiles and handle selection
    products: Product[];
    selectedProductId: number | null;
    onProductSelect: (productId: number) => void;
    productVariants: ProductVariant[] | null;
    selectedVariant: ProductVariant | null;
    onVariantSelect: (variant: ProductVariant) => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    // quantity?: number;
    onAdd?: () => void;
    onSubtract?: () => void;
}


const ProductList = ({
    
    products,
    selectedProductId,
    onProductSelect,
    productVariants,
    selectedVariant,
    onVariantSelect,
    isModalOpen,
    openModal,
    closeModal,
}: ProductListProps) => {

    // const 

    // const [quantity, setQuantity] = useState(1);

    // const onSubtract = () => {
	// 	// const quantity = 1
	// 	// const min = 1;
	// 	// const max = 30;
	// 	// if 

	// 	return 
	// }

	// const onAdd = () => {
	// 	return 

	// }
    console.log("products prop:", products);

    const getProductList = (products: Product[]) => {
        return products.map((product) => {
            return (
                <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProductId === product.id}
                    onSelect={() => onProductSelect(product.id)}
                    variants={selectedProductId === product.id ? productVariants : null}
                    selectedVariant={selectedVariant}
                    onVariantSelect={onVariantSelect}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                />
            );
        });
    };
    return (
        <div className="product-container">
            <ul>{getProductList(products)} </ul>
        </div>
    );
};

export default ProductList;