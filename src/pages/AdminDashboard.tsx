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
    createNewVariant: (newVariant: NewVariant) => void;
}

interface InventoryItem {
    productName: string;
    variantLabel: string;
    stockQuantity: number;
}

export default function AdminDashboard({createNewProduct, products, createNewVariant}: AdminDashboardProps) {
   // Build inventory from products prop (no fetch needed - App.tsx handles fetching)
   const [showManager, setShowManager] = useState(false);
   const [showAnalytics, setShowAnalytics] = useState(false);  // default open
    const [showInventory, setShowInventory] = useState(false);  // default open


   const inventory: InventoryItem[] = products.flatMap((product) =>
     product.variants.map((variant) => ({
       productName: product.name,
       variantLabel: `${variant.size} / ${variant.shape}`,
       stockQuantity: variant.stockQuantity,
     }))
   );


 return (
   <section className="admin-dashboard">
       <header className="admin-header">
           <h1>Admin Dashboard</h1>
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
        <div className="admin-content">
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
                </tr>
                </thead>
                <tbody>
                {inventory.length === 0 ? (
                    <tr>
                    <td colSpan={3}>No products available</td>
                    </tr>
                ) : (
                    inventory.map((item, index) => {
                    let rowClass = "";
                    if (item.stockQuantity <= 3) rowClass = "stock-critical";
                    else if (item.stockQuantity <= 8) rowClass = "stock-low";

                    return (
                        <tr key={index} className={rowClass}>
                        <td>{item.productName}</td>
                        <td>{item.variantLabel}</td>
                        <td>{item.stockQuantity}</td>
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
