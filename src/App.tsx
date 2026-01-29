// import { useState } from "react";
// import SalesChart from "./components/SalesChart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import CustomerHome from './pages/CustomerHome';
import ProductPage from './pages/ProductPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<CustomerHome />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>

      </Router>
      
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
