import "./header.css";

export default function Header() {
    const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Jabon Eterno</h1>
          <p className="header-subtitle">by Lucy</p>
        </div>
        <nav className="header-nav">
          <button onClick={() => scrollToSection('home')} className="nav-link">
            Home
          </button>
          <button onClick={() => scrollToSection('products')} className="nav-link">
            Products
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About Us
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
