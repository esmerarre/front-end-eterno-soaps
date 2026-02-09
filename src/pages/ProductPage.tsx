import "./ProductPage.css";
import type { CartItem, Product, ProductSummary, ProductVariant } from "../App";
import ProductList from "../components/ProductList";
import ProductListFilter from "../components/ProductListFilter";

interface ProductPageProps {
  products: Product[];
  onProductSelect: (productId: number) => void;
  selectedProductId: number | null;
  productVariants: ProductVariant[] | null;
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  onAddToCart: (item: CartItem) => void;
  openCart: () => void;
  onCategorySelect: (categoryId: number | null) => void;
  categoryProducts: ProductSummary[] | undefined;
  categories?: { id: number; name: string }[];
}

export default function ProductPage({
  products,
  onProductSelect,
  selectedProductId,
  productVariants,
  selectedVariant,
  onVariantSelect,
  isModalOpen,
  openModal,
  closeModal,
  onAddToCart,
  openCart,
  onCategorySelect,
  categoryProducts,
  categories,
}: ProductPageProps) {

  return (
    <section className="product-page">
      <div className="product-container">
        <header className="product-header">
          <h2 className="product-title">
            Our Handcrafted Soaps
          </h2>
        </header>
        <div className="filter-container">
          <ProductListFilter 
            onCategorySelect={onCategorySelect}
            categories={categories}
          />
        </div>
        <div>
          <ProductList
            categoryProducts={categoryProducts}
            products={products}
            selectedProductId={selectedProductId}
            onProductSelect={onProductSelect}
            productVariants={productVariants}
            selectedVariant={selectedVariant}
            onVariantSelect={onVariantSelect}
            isModalOpen={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
            onAddToCart={onAddToCart}
            openCart={openCart}
          />
        </div>
      </div>
    </section>
  );
}

