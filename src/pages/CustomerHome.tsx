import "./CustomerHome.css";

export default function CustomerHome() {
  // 🔹 Add hooks or functions here later

  return (
    <section className="customer-home">
      <div className="home-container">

        <h2 className="home-title">
          {/* Page title */}
        </h2>

        <p className="home-subtitle">
          {/* Subtitle or tagline */}
        </p>

        <div className="home-actions">
          {/* Buttons / CTAs */}
        </div>

      </div>
    </section>
  );
}

// import './CustomerHome.css';

// export default function CustomerHome() {
//   return (
//     <section id="home" className="customer-home">
//       <div className="home-content">
//         <h1 className="home-title">Welcome to Jabon Eterno</h1>
//         <p className="home-tagline">Handcrafted Natural Soaps by Lucy</p>
//         <p className="home-description">
//           Experience the luxury of pure, artisan soaps made with love and the finest natural ingredients.
//           Each bar is carefully crafted to nourish your skin and elevate your daily routine.
//         </p>
//         <div className="home-buttons">
//           <button 
//             className="btn-primary"
//             onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
//           >
//             Shop Now
//           </button>
//           <button 
//             className="btn-secondary"
//             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
//           >
//             Learn More
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }