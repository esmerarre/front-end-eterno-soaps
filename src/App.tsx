// import { useState } from "react";
// import SalesChart from "./components/SalesChart";

import Header from './components/Header';
import CustomerHome from './pages/CustomerHome';
import ProductPage from './pages/ProductPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
  
        <CustomerHome />
        <ProductPage />
        <AboutUs />
        <ContactUs />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Eterno Soaps by Lucy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
