import "./header.css";
import eternologo from "../assets/eternologo.png";
// import React, { useState } from "react"
import shoppingbag from "../assets/shopping-bag.png";
// import CartPage from "../pages/CartPage";



interface HeaderProps {
  onCartClick: () => void;
  isAdmin?: boolean; 
  onAdminSignOut?: () => void; 

}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, '', `#${id}`);
  }
};

const Header: React.FC<HeaderProps> = ({ onCartClick, isAdmin, onAdminSignOut }) => {
    
 
    
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
                    <button onClick={() => scrollToSection("home")} className="nav-link">Home</button>
                    <button onClick={() => scrollToSection("products")} className="nav-link">Products</button>
                    <button onClick={() => scrollToSection("contact")} className="nav-link">Contact</button>
                    {isAdmin && (
            <>
              <button onClick={() => scrollToSection("admin-dashboard")} className="nav-link">Admin Dashboard</button>
              <button className="nav-link" onClick={onAdminSignOut}>
                Sign Out
              </button>
            </>
          )}
                    <button onClick={onCartClick} className="nav-link ">
                        <img
                        src={shoppingbag} 
                        alt="Shopping Bag Icon"
                        className="checkout-btn-icon"
                        />
                    </button>
                </nav>
            </div>
        </header>
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



