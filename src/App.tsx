// import { useState } from "react";
// import SalesChart from "./components/SalesChart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";


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

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<ProductSummary[] | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  interface BackendVariant {
  id: number;
  product_id: number;
  size: string;
  shape: string;
  img_key: string;
  image_url: string;
  price: number;
  stock_quantity: number;
}

interface BackendProduct {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  image_url: string;
  variants: BackendVariant[];
}

interface BackendProductSummary {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  image_url: string;
  variants?: {
    id: number;
    product_id: number;
    size: string;
    shape: string;
    img_key: string;
    image_url: string;
    price: number;
    stock_quantity: number;
  }[];
}



  //product data to camelCase
const transformProductData = (product: BackendProduct): Product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  ingredients: product.ingredients,
  imageUrl: product.image_url,
  categories: [], // populated elsewhere
  variants: product.variants.map(transformVariantData),
});

const transformVariantData = (variant: BackendVariant): ProductVariant => ({
  id: variant.id,
  productId: variant.product_id,
  size: variant.size,
  shape: variant.shape,
  imgKey: variant.img_key,
  imageUrl: variant.image_url,
  price: variant.price,
  stockQuantity: variant.stock_quantity,
  product: [], // backend relation, not needed here
});


// Convert backend snake_case to frontend camelCase for ProductSummary
const transformProductSummaryData = (
  product: BackendProductSummary
): ProductSummary => {
  const variants: ProductVariant[] =
    product.variants?.map((variant) => ({
      id: variant.id,
      productId: variant.product_id,
      size: variant.size,
      shape: variant.shape,
      imgKey: variant.img_key,
      imageUrl: variant.image_url,
      price: variant.price,
      stockQuantity: variant.stock_quantity,
      product: [],
    })) ?? [];

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    ingredients: product.ingredients,
    imageUrl: product.image_url,
    variants,
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
        const transformed = (products ?? []).map(transformProductSummaryData);
        setCategoryProducts(transformed);
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

    const deleteVariant = async (productId: number, variantId: number) => {
  try {
    await axios.delete(
      `${BASE_URL}/products/${productId}/variants/${variantId}`
    );

    // 🔑 Update frontend state so React re-renders
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? {
              ...product,
              variants: product.variants.filter(
                variant => variant.id !== variantId
              ),
            }
          : product
      )
    );
  } catch (error) {
    console.error("Error deleting variant:", error);
  }
};

    const deleteProduct = async (productId: number) => {
      try {
        await axios.delete(
          `${BASE_URL}/products/${productId}`
        );
        setProducts((prev) => prev.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

  return (
  <Router>
    <Routes>
      <Route
          path="/"
          element={
            <MainLayout
              products={products}
              productId={productId}
              productVariants={productVariants}
              selectedVariant={selectedVariant}
              categories={categories}
              categoryProducts={categoryProducts}
              cartItems={cartItems}
              cartOpen={cartOpen}
              admins={admins}
              isAdminAuthenticated={isAdminAuthenticated}
              isAdminModalOpen={isAdminModalOpen}

              onProductSelect={handleProductSelect}
              onVariantSelect={setSelectedVariant}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              openCart={openCart}
              closeCart={closeCart}

              onCategorySelect={setCategoryId}

              openAdminModal={openAdminModal}
              closeAdminModal={closeAdminModal}
              onAdminSuccess={displayAdminDashboard}
              onAdminSignOut={handleAdminSignOut}

              createNewProduct={createNewProduct}
              createNewVariant={createNewVariant}
              deleteVariant={deleteVariant}
              deleteProduct={deleteProduct}
            />
          }
      />

    <Route path="/success" element={<Success />} />
    <Route path="/cancel" element={<Cancel />} />
  </Routes>
</Router>
  );
}
