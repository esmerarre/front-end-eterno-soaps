// import { useState } from "react";
// import SalesChart from "./components/SalesChart";

import Header from './components/Header';
import CustomerHome from './pages/CustomerHome';
import ProductPage from './pages/ProductPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import './App.css';

export default function App() {
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
        <p>&copy; 2026 Jabon Eterno by Lucy. All rights reserved.</p>
      </footer>
    </div>
  );
}
