import "./AdminDashboard.css";
import MonthlySalesChart from "../components/SalesChart";
import TopSellingProductsChart from "../components/TopSellingProductsChart";
import InventoryManager from "../components/InventoryManager";
import type { NewProduct, Product, NewVariant } from "../App";
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
   const inventory: InventoryItem[] = products.flatMap((product) =>
     product.variants.map((variant) => ({
       productName: product.name,
       variantLabel: `${variant.size} / ${variant.shape}`,
       stockQuantity: variant.stockQuantity,
     }))
   );


 return (
   <section className="admin-dashboard">
       <div className="admin-header">
           <h1>Admin Dashboard</h1>
       </div>
       < div className="admin-content">
           <MonthlySalesChart />
           <TopSellingProductsChart />
       </div>
       <h2>Inventory Overview</h2>

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
           inventory.map((item, index) => (
             <tr key={index}>
               <td>{item.productName}</td>
               <td>{item.variantLabel}</td>
               <td>{item.stockQuantity}</td>
             </tr>
           ))
         )}
       </tbody>
     </table>
     <div className="inventory-manager-section">
        <InventoryManager createNewProduct={createNewProduct} createNewVariant={createNewVariant} products={products} />
    </div>


     {/* {!loading && (
 <>
   <h3>Stock by Variant</h3>
   <InventoryStockChart data={inventory} />
 </>
)} */}


   </section>
 );
}
