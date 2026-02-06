import "./AdminDashboard.css";
import MonthlySalesChart from "../components/SalesChart";
import TopSellingProductsChart from "../components/TopSellingProductsChart";
import InventoryManager from "../components/InventoryManager";
import type { NewProduct, Product, NewVariant } from "../App";
import { useState } from "react";
// import InventoryStockChart from "../components/InventoryStockChart";

interface AdminDashboardProps {
    createNewProduct: (newProduct: NewProduct) => void;
    products: Product[];
    onAdminSignOut?: () => void;
    deleteVariant: (productId: number, variantId: number) => void;
    createNewVariant: (newVariant: NewVariant) => void;
    deleteProduct: (productId: number) => void;
}

interface InventoryItem {
    productId: number;
    variantId: number;
    productName: string;
    variantLabel: string;
    stockQuantity: number;
}

export default function AdminDashboard({
    createNewProduct, 
    products, 
    createNewVariant,
    deleteVariant,
    deleteProduct
}: AdminDashboardProps) {
   // Build inventory from products prop (no fetch needed - App.tsx handles fetching)
   const [showManager, setShowManager] = useState(false);
   const [showAnalytics, setShowAnalytics] = useState(false); 
   const [showInventory, setShowInventory] = useState(false);  



   const inventory: InventoryItem[] = products.flatMap((product) =>
     product.variants.map((variant) => ({
        productId: product.id,
        variantId: variant.id,
        productName: product.name,
        variantLabel: `${variant.size} / ${variant.shape}`,
        stockQuantity: variant.stockQuantity,
     }))
   );


 return (
   <section className="admin-dashboard">
       <header className="admin-header">
           <h2 className="admin-title">Admin Dashboard</h2>
       </header>

        {/* ANALYTICS */}
    <section className="admin-section">
        <div className="section-header">
        <h2>Analytics Overview</h2>
            <button
                className="toggle-button"
                onClick={() => setShowAnalytics((prev) => !prev)}
                >
                {showAnalytics ? "Hide" : "Manage Analytics"}

            </button>
        </div>
        {showAnalytics && (
        <div className="admin-content chart-grid">
           <MonthlySalesChart />

           <TopSellingProductsChart />
        </div>
        )}
    </section>

        {/* INVENTORY */}
    <section className="admin-section">
        <div className="section-header">
        <h2>Inventory Overview</h2>
            <button
                className="toggle-button"
                onClick={() => setShowInventory((prev) => !prev)}
                >
                {showInventory ? "Hide" : "Manage Inventory Overview"}

            </button>
        </div>

        
        {showInventory && (
        <>
            <table className="inventory-table">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Variant</th>
                    <th>Stock Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {inventory.length === 0 ? (
                    <tr>
                    <td colSpan={3}>No products available</td>
                    </tr>
                ) : (
                    inventory.map((item) => {
                    let rowClass = "";
                    if (item.stockQuantity <= 3) rowClass = "stock-critical";
                    else if (item.stockQuantity <= 8) rowClass = "stock-low";

                    return (
                        <tr key={item.variantId} className={rowClass}>
                        <td>{item.productName}</td>
                        <td>{item.variantLabel}</td>
                        <td>{item.stockQuantity}</td>
                        <td>
                            <button
                            className="delete-variant-btn"
                            onClick={() => {
                                const confirmed = window.confirm(
                                    "Are you sure you want to delete this variant?");
                                    if (confirmed) {
                                        deleteVariant(item.productId, item.variantId);
                                    }
                                }}
                                >
                                    ❌
                            </button>
                        </td>
                        </tr>
                    );
                    })
                )}
                </tbody>
            </table>
        </>
    )}
    
    </section>

    {/* MANAGEMENT */}
    <section className="admin-section">
        <div className="section-header">
            <h2>Inventory Management</h2>
            <button
            className="toggle-button"
            onClick={() => setShowManager((prev) => !prev)}
            >
            {showManager ? "Hide" : "Manage Inventory"}
            </button>
        </div>

        {showManager && (
            <InventoryManager
            createNewProduct={createNewProduct}
            createNewVariant={createNewVariant}
            products={products}
            deleteProduct={deleteProduct}
            />
        )}
    </section>
     {/* {!loading && (
 <>
   <h3>Stock by Variant</h3>
   <InventoryStockChart data={inventory} />
 </>
)} */}


   </section>
 );
}
