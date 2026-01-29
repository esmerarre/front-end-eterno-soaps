import "./ProductList.css";
import type { Product, ProductVariant } from "../App";
import ProductCard from "./Product";

interface ProductListProps {
    // Props needed to render product tiles and handle selection
    products: Product[];
    selectedProductId: number | null;
    onProductSelect: (productId: number) => void;
    productVariants: ProductVariant[] | null;
    selectedVariant: ProductVariant | null;
    onVariantSelect: (variant: ProductVariant) => void;
    viewVariant: () => void; //void means the function does not return anything
    closeVariant: () => void;
}

const ProductList = ({
    products,
    selectedProductId,
    onProductSelect,
    productVariants,
    selectedVariant,
    onVariantSelect,
    viewVariant,
    closeVariant,
    openModal,
    closeModal,
}: ProductListProps) => {
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
                    viewVariant={viewVariant}
                    closeVariant={closeVariant}
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