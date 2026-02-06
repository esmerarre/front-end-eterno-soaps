import Header from "../components/Header";
import CustomerHome from "../pages/CustomerHome";
import ProductPage from "../pages/ProductPage";
import ContactUs from "../pages/ContactUs";
import CartPage from "../pages/CartPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminSignIn from "../components/AdminSignIn";
import { useEffect } from "react";


import type {
  Product,
  ProductVariant,
  CartItem,
  ProductSummary,
  Category,
  Admin,
  NewProduct,
  NewVariant,
} from "../App";

interface MainLayoutProps {
  // data
  products: Product[];
  productId: number | null;
  productVariants: ProductVariant[] | null;
  selectedVariant: ProductVariant | null;
  categories: Category[];
  categoryProducts?: ProductSummary[];
  cartItems: CartItem[];
  cartOpen: boolean;
  admins: Admin[];
  isAdminAuthenticated: boolean;
  isAdminModalOpen: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  // handlers
  onProductSelect: (id: number) => void;
  onVariantSelect: (variant: ProductVariant) => void;
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;

  onCategorySelect: (categoryId: number | null) => void;


  openAdminModal: () => void;
  closeAdminModal: () => void;
  onAdminSuccess: () => void;
  onAdminSignOut: () => void;

  createNewProduct: (p: NewProduct) => void;
  createNewVariant: (v: NewVariant) => void;
  deleteVariant: (productId: number, variantId: number) => void;
  deleteProduct: (productId: number) => void;
  updateStock: (productId: number, variantId: number, newStock: number) => void;
}


export default function MainLayout(props: MainLayoutProps) {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState(null, "", `#${id}`);
        }};

    useEffect(() => {
        if (props.isAdminAuthenticated) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [props.isAdminAuthenticated]);



  


  return (
    <>
      {/* Header */}
      <Header
        onCartClick={props.openCart}
        isAdmin={props.isAdminAuthenticated}
        onAdminSignOut={props.onAdminSignOut}
      />

      {/* Main content */}
      <main className="main-content">
        
        <section id="home">
          <CustomerHome />
        </section>
        <section id="admin-dashboard" className={props.isAdminAuthenticated ? "admin-page" : undefined}> 

        {props.isAdminAuthenticated ? (
            
          <AdminDashboard 
            products={props.products}
            createNewProduct={props.createNewProduct}
            createNewVariant={props.createNewVariant}
            deleteVariant={props.deleteVariant}
            deleteProduct={props.deleteProduct}
            onAdminSignOut={props.onAdminSignOut}
            updateStock={props.updateStock}
          />
        ): null}
        </section>

        <section id="products">
          <ProductPage
            products={props.products}
            onProductSelect={props.onProductSelect}
            selectedProductId={props.productId}
            productVariants={props.productVariants}
            selectedVariant={props.selectedVariant}
            onVariantSelect={props.onVariantSelect}
            onAddToCart={props.onAddToCart}
            openCart={props.openCart}
            categories={props.categories}
            categoryProducts={props.categoryProducts}
            onCategorySelect={props.onCategorySelect}
            isModalOpen={props.isModalOpen}
            openModal={props.openModal}
            closeModal={props.closeModal}
          />
        </section>

        <section id="contact">
          <ContactUs />
        </section>
        
    
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Eterno Soaps by Lucy. All rights reserved.</p>
        <button className="sign-in-button" onClick={() => {
            if (props.isAdminAuthenticated) {
                scrollToSection("admin-dashboard");
            } else {
                props.openAdminModal();
            }
        }}
    >
        Admin Dashboard
        </button>

      </footer>

      {/* Cart modal */}
      {props.cartOpen && (
        <CartPage
          items={props.cartItems}
          onClose={props.closeCart}
          onRemoveItem={props.onRemoveFromCart}
        />
      )}

      {/* Admin sign-in modal */}
      {!props.isAdminAuthenticated && (
        <AdminSignIn
          isOpen={props.isAdminModalOpen}
          onClose={props.closeAdminModal}
          admins={props.admins}
            onSuccess={props.onAdminSuccess}
        />
      )}
    </>
  );
}
