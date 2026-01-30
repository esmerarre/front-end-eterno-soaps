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
import { use, useEffect, useState } from 'react';
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  categories: Category[]; // [] belongs to multiple categories
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  productId: number; //product_id in backend
  size: string;
  shape: string;
  price: number;
  stockQuantity: number; //stock_quantity in backend
  product: Product; // belongs to one product
}

export interface Category {
  id: number;
  name: string;
  description: string;
  products: Product[];
}


// Base API URL for backend requests (Vite only exposes VITE_ prefixed vars)
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("VITE_BACKEND_URL=", import.meta.env.VITE_BACKEND_URL);



export default function App() {
  // Global app state (owned here, passed down to ProductPage)
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [productVariants, setProductVariants] = useState<ProductVariant[] | null>(null); //reveiew default null state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler that updates productId AND clears selectedVariant
  const handleProductSelect = (id: number) => {
    setProductId(id);
    setSelectedVariant(null);  // Clear variant when switching products
  };

  // Modal handlers
  const openModal = () => {
    if (isModalOpen) return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onAddBag = () => {
    closeModal();
    // decrease stock quantity logic to be added
  };

  // Load all products once on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) { 
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // When a product is selected, fetch its variants
  useEffect(() => {
    if (!productId) return;
    const fetchProductVariants = async (id: string) => {
      try {
        const response = await axios.get(`${BASE_URL}/products/${productId}/variants`);
        setProductVariants(response.data);
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };
    if (productId) {
    fetchProductVariants(productId.toString());
    }
  }, [productId]);

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
        <ProductPage 
          products={products} 
          onProductSelect={handleProductSelect}
          selectedProductId={productId}
          productVariants={productVariants}
          selectedVariant={selectedVariant}
          onVariantSelect={setSelectedVariant}
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          onAddBag={onAddBag}
        />
        <AboutUs />
        <ContactUs />
        
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Eterno Soaps by Lucy. All rights reserved.</p>
      </footer>
    </div>
  );
};

