// import { useState } from "react";
// import SalesChart from "./components/SalesChart";

import Header from './components/Header';
import CustomerHome from './pages/CustomerHome';
import ProductPage from './pages/ProductPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import './App.css';
import { use, useEffect, useState } from 'react';
import axios from 'axios'

export interface Product {
  id: number;
  name: string;
  description: string;
  categories: Category[];
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  productId: number; //product_id in backend
  size: string;
  shape: string;
  price: number;
  stockQuantity: number; //stock_quantity in backend
  product: Product[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  products: Product[];
}


const BASE_URL = import.meta.env.APP_BACKEND_URL;




export default function App() {
  const [products, setProducts] = useState([]);
  const [productVariant, setProductVariant] = useState(null); //reveiew default null state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) { 
        console.error("Error fetching products:", error);
      }
    };

    const []







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
