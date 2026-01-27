import "./ProductPage.css";

export default function ProductPage() {
  // 🔹 Data + types can live here later

  return (
    <section className="product-page">
      <div className="product-container">

        <header className="product-header">
          <h2 className="product-title">
            {/* Page heading */}
          </h2>
        </header>

        <div className="product-grid">
          {/* Product cards go here */}
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

