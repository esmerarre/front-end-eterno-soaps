// import "./CustomerHome.css";

// export default function CustomerHome() {
//   // 🔹 Add hooks or functions here later

//   return (
//     <section className="customer-home">
//       <div className="home-container">

//         <h2 className="home-title">
//           {/* Page title */}
//         </h2>

//         <p className="home-subtitle">
//           {/* Subtitle or tagline */}
//         </p>

//         <div className="home-actions">
//           {/* Buttons / CTAs */}
//         </div>

//       </div>
//     </section>
//   );
// }

import './CustomerHome.css';


export default function CustomerHome() {
  return (
    <div>
      <section id="home">
        <h1>Welcome to Eterno Soaps</h1>
        <p>Handmade soaps for every mood 🌿</p>
      </section>

      <section id="products">
        <h2>Our Products</h2>
        {/* Maybe show featured products here */}
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        {/* Include your contact form here */}
      </section>
    </div>
  );
}