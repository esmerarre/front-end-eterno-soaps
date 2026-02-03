// import { useState } from "react";
// import SalesChart from "./components/SalesChart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import CartPage from "./pages/CartPage";
import CustomerHome from './pages/CustomerHome';
import ProductPage from './pages/ProductPage';
// import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import AdminDashboard from "./pages/AdminDashboard";
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import AdminSignIn from "./components/AdminSignIn";

export interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  imageUrl: string;
  categories: Category[]; // [] belongs to multiple categories
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  productId: number; //product_id in backend
  size: string;
  shape: string;
  imgKey: string;
  imageUrl: string;
  price: number;
  stockQuantity: number; //stock_quantity in backend
  product: Product[]; // belongs to one product
}

export interface ProductSummary {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  variants: ProductVariant[];
  imageUrl: string;
}

export interface CartItem {
  id: number;            // variant id
  productId: number;
  name: string;          // product name
  price: number;
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  products: ProductSummary[];
}

export interface Admin {
  id: number;
  username: string;
}

export interface NewProduct {
  name: string;
  description: string;
  ingredients: string[];
  imgKey: string;
}

export interface NewVariant {
  productId: number;
  size: string;
  shape: string;
  imgKey: string;
  price: number;
  stockQuantity: number;
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
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<ProductSummary[] | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  //product data to camelCase
const transformProductData = (product: any): Product => {  // Single product
  return {
    ...product,
    imageUrl: product.image_url,
    variants: product.variants.map((variant: any) => ({
      ...variant,
      productId: variant.product_id,
      imgKey: variant.img_key,
      imageUrl: variant.image_url,
      stockQuantity: variant.stock_quantity
    }))
  };
};

//transform variant data to camelCase
const transformVariantData = (variant: any): ProductVariant => { // Single variant
  return {
    ...variant,
    productId: variant.product_id,
    imgKey: variant.img_key,
    imageUrl: variant.image_url,
    stockQuantity: variant.stock_quantity
  };
};

  // Handler that updates productId AND clears selectedVariant
  const handleProductSelect = (id: number) => {
    setProductId(id);
    setSelectedVariant(null);  // Clear variant when switching products
  };

  const removeFromCart = (id: number) => {
  setCartItems(prev => prev.filter(item => item.id !== id));
};

  // Modal handlers
  const openModal = () => {
    if (isModalOpen) return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Admin modal handlers
  const openAdminModal = () => {
    if (isAdminModalOpen) return;
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  const displayAdminDashboard = () => {
    setIsAdminAuthenticated(true);
    closeAdminModal();
  }

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false);
  };

const addToCart = (item: CartItem) => {
  setCartItems((prev) => {
    const existing = prev.find((i) => i.id === item.id);

    if (existing) {
      return prev.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    }

    return [...prev, item];
  });
};

const openCart = () => setCartOpen(true);
const closeCart = () => setCartOpen(false);

  // Load all products once on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data.map(transformProductData));
      } catch (error) { 
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Load all categories once on page load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories(response.data);
      } catch (error) { 
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


    // Load all admin users once on page load
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admins`);
        setAdmins(response.data);
      } catch (error) { 
        console.error("Error fetching admins", error);
      }
    };
    fetchAdminUsers();
  }, []);


  // When a product is selected, fetch its variants
  useEffect(() => {
    if (!productId) return;
    const fetchProductVariants = async (productId: string) => {
      try {
        const response = await axios.get(`${BASE_URL}/products/${productId}/variants`);
        setProductVariants(response.data.map(transformVariantData));
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };
    if (productId) {
    fetchProductVariants(productId.toString());
    }
  }, [productId]);

  // When a category is selected, fetch its products
  useEffect(() => {
    if (categoryId === null) {
      setCategoryProducts(undefined);
      return;
    }

    const fetchCategoryProducts = async (categoryId: string) => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/${categoryId}`);
        const data = response.data;
        const products = Array.isArray(data) ? data : data?.products;
        setCategoryProducts(products ?? []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts(categoryId.toString());
  }, [categoryId]);

    const createNewProduct = async (newProduct: NewProduct) => {
      try {
        const payload = {
          name: newProduct.name,
          description: newProduct.description,
          ingredients: newProduct.ingredients,
          img_key: newProduct.imgKey,
        };

        const response = await axios.post(`${BASE_URL}/products`, payload)
        setProducts(prev => [...prev, transformProductData(response.data)]);
      } catch (error) {
        console.log(error);
      }
    };
    const createNewVariant = async (newVariant: NewVariant) => {
      try {
        const payload = {
          size: newVariant.size,
          shape: newVariant.shape,
          img_key: newVariant.imgKey,
          price: newVariant.price,
          stock_quantity: newVariant.stockQuantity,
        };
        const response = await axios.post(`${BASE_URL}/products/${newVariant.productId}/variants`, payload)
        // Update products list with new variant
        setProducts(prev => prev.map(product => 
          product.id === newVariant.productId 
            ? { ...product, variants: [...product.variants, transformVariantData(response.data)] }
            : product
        ));
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="app">
      <Router>
        <Header onCartClick={openCart}
        isAdmin={isAdminAuthenticated}
        onAdminSignOut={handleAdminSignOut}
        />
        <Routes>
          <Route path="/" element={<CustomerHome />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>

      </Router>
      
      <main className="main-content">
  
        {/* <CustomerHome /> */}
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
          onAddToCart={addToCart}
          openCart={openCart}
          onCategorySelect={setCategoryId}
          categoryProducts={categoryProducts}
          categories={categories}
        />
        {/* <AboutUs /> */}
        <ContactUs />
        {!isAdminAuthenticated && (
          <AdminSignIn 
          isOpen={isAdminModalOpen} 
          onClose={closeAdminModal} 
          admins={admins} 
          onSuccess={displayAdminDashboard} 
          />
        )}

        {isAdminAuthenticated && <AdminDashboard onAdminSignOut={handleAdminSignOut} createNewProduct={createNewProduct} createNewVariant={createNewVariant} products={products} />}
        
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Eterno Soaps by Lucy. All rights reserved.</p>
          <button onClick={() => { openAdminModal()}} className="sign-in-button">Admin Dashboard</button>
      </footer>
      {cartOpen && (
      <CartPage items={cartItems} onClose={closeCart} onRemoveItem={removeFromCart}/> 
      )}
    </div>
  );
};

