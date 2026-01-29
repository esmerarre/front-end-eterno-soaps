import "./ProductPage.css";
import type { Product, ProductVariant } from "../App";
import ProductList from "../components/ProductList";

interface ProductPageProps {
  // Data + callbacks passed from App
  products: Product[];
  onProductSelect: (productId: number) => void;
  selectedProductId: number | null;
  productVariants: ProductVariant[] | null;
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  onAddBag: () => void;
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
  onAddBag,
}: ProductPageProps) {

  return (
    <section className="product-page">
      <div className="product-container">

        <header className="product-header">
          <h2 className="product-title">
            Our Handcrafted Soaps
          </h2>
        </header>

        <div>
          {/* ProductList renders the grid; ProductCard renders each tile */}
          <ProductList
            products={products}
            selectedProductId={selectedProductId}
            onProductSelect={onProductSelect}
            productVariants={productVariants}
            selectedVariant={selectedVariant}
            onVariantSelect={onVariantSelect}
            isModalOpen={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
      </div>
    </section>
  );
}


// import "./ProductPage.css";

// export default function ProductPage() {
//   return (
//     <main className="content">
//       <section className="product-section">
//         <h2>ALOEVERA SOAP</h2>
//         <p className="price">$10</p>
//         <p>
//           Infused with aloe vera, known for its soothing and moisturizing
//           properties, this soap helps calm dryness and irritation, leaving
//           skin soft, refreshed, and balanced. Ideal for daily use on all skin
//           types.
//         </p>
//       </section>
//     </main>
//   );
// }
// import { soaps } from "../data/soaps";
// import placeholder from "../assets/placeholder.png";
// import "./ProductPage.css";

// export default function ProductPage() {
//   return (
//     <section id="products" className="product-page">
//       <div className="products-container">
//         {/* Header */}
//         <div className="products-header">
//           <h2 className="products-title">Our Handcrafted Soaps</h2>
//           <p className="products-subtitle">
//             Each bar is made with love using only the finest natural ingredients
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="products-grid">
//           {soaps.map((soap) => (
//             <div key={soap.name} className="product-card">
//               {/* Image */}
//               <div className="product-image-placeholder">
//                 <img
//                   src={placeholder}
//                   alt={soap.name}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               </div>

//               {/* Info */}
//               <div className="product-info">
//                 <h3 className="product-name">{soap.name}</h3>

//                 <p className="product-description">
//                   {soap.description}
//                 </p>

//                 {soap.ingredients && (
//                   <p className="product-ingredients">
//                     <strong>Ingredients:</strong> {soap.ingredients}
//                   </p>
//                 )}

//                 <div className="product-footer">
//                   <span className="product-price">{soap.price}</span>
//                   <button className="btn-add-cart">Add to Cart</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

