import "./header.css";
import eternologo from "../assets/eternologo.png";
import React, { useState } from "react"
import shoppingbag from "../assets/shopping-bag.png";
import CartPage from "../pages/CartPage";
import type { CartItem } from "../services/checkout";

const testItems: CartItem[] = [
  { id: 1, name: "Stripe Test Soap", price: 10, quantity: 1 },
  { id: 2, name: "Alovera Soap", price: 15, quantity: 2 },
]

const Header: React.FC = () => {
    const [cartOpen, setCartOpen] = useState(false)
    const handleCartClick = () => {
        setCartOpen(true)
  
    
  }
    
    return (
        <>
        <header className="header">
            <div className="header-container">
                 <div className="header-logo" >
                    <img 
                    src={eternologo} 
                    alt = "Eterno Soap Logo"
                    className="logo-image"/>
                    </div>
                <nav className="header-nav">
                    <button className="nav-link">
                        Home
                    </button>
                    <button className="nav-link">
                        Products
                    </button>
                    <button className="nav-link">
                        Contact Us
                    </button>
                    <button onClick={handleCartClick} className="nav-link ">
                        <img
                        src={shoppingbag} 
                        alt="Shopping Bag Icon"
                        className="checkout-btn-icon"
                        />
                    </button>
                </nav>
            </div>
        </header>
        {cartOpen && <CartPage items={testItems} onClose={() => setCartOpen(false)} />}
        </>

    );

};
export default Header;

//             <div key={soap.name} className="product-card">
//               {/* Image */}
//               <div className="product-image-placeholder">
//                 <img
//                   src={placeholder}
//                   alt={soap.name}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               </div>

// export default function Header() {
//     const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };
//   return (
//     <header className="header">
//       <div className="header-container">
//         <div className="header-logo">
//           <h1>Jabon Eterno</h1>
//           <p className="header-subtitle">by Lucy</p>
//         </div>
//         <nav className="header-nav">
//           <button onClick={() => scrollToSection('home')} className="nav-link">
//             Home
//           </button>
//           <button onClick={() => scrollToSection('products')} className="nav-link">
//             Products
//           </button>
//           <button onClick={() => scrollToSection('about')} className="nav-link">
//             About Us
//           </button>
//           <button onClick={() => scrollToSection('contact')} className="nav-link">
//             Contact
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// }
