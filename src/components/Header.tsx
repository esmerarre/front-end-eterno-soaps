import "./header.css";
import shoppingbag from "../assets/shopping-bag.png";

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
                    <div className="jabon">JABON</div>
                    <div className="eterno">ETERNO</div>
                    </div>
                <nav className="header-nav">
                    <button onClick={() => scrollToSection("home")} className="nav-link">Home</button>
                    {isAdmin && (<button onClick={() => scrollToSection("admin-dashboard")} className="nav-link">Admin Dashboard</button>)}
                    <button onClick={() => scrollToSection("products")} className="nav-link">Products</button>
                    <button onClick={() => scrollToSection("contact")} className="nav-link">Contact</button>
                    {isAdmin && (
            <>
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