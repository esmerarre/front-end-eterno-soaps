import "./ProductList.css";
import type { CartItem, Product, ProductSummary, ProductVariant } from "../App";
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
    onAddToCart: (item: CartItem) => void;
    openCart: () => void;
    categoryProducts?: ProductSummary[];
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
    onAddToCart,
    openCart,
    categoryProducts,
}: ProductListProps) => {
    
    // Determine which products to display
    const productsToRender = categoryProducts !== undefined ? categoryProducts : products;

    console.log("products prop:", products);
    console.log("categoryProducts prop:", categoryProducts);

    const getProductList = (products: Product[] | ProductSummary[]) => {
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
                    onAddToCart={onAddToCart}
                    openCart={openCart}
                />
            );
        });
    };
    
    return (
        <div className="product-container">
            {productsToRender.length === 0 ? (
                <p className="no-products">No products found in this category.</p>
            ) : (
                <ul>{getProductList(productsToRender)}</ul>
            )}
        </div>
    );
};

export default ProductList;