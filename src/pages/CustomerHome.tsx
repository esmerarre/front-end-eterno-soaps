import eternologo from '../assets/eternologo.png';
import './CustomerHome.css';

export default function CustomerHome() {
  return (
    <section id="home" className="customer-home">
      <div className="home-content">
        <div className='slide'>
          <img src={eternologo} alt="Eterno Soaps Logo" className="home-logo" />
        </div>
        <div className="slide">
        <h1 className="home-title">Welcome to Eterno Soaps</h1>
        <p className="home-tagline">Handcrafted Natural Soaps by Lucy</p>
        <p className="home-description">
          Experience the luxury of pure, artisan soaps made with love and the finest natural ingredients.
          Each bar is carefully crafted to nourish your skin and elevate your daily routine.
        </p>
        <div className="home-buttons">
          <button 
            className="btn-primary"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop Now
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}