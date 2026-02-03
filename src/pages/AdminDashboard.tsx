import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import MonthlySalesChart from "../components/SalesChart";
import TopSellingProductsChart from "../components/TopSellingProductsChart";
// import InventoryStockChart from "../components/InventoryStockChart";





interface AdminDashboardProps {
   onAdminSignOut?: () => void;
}
interface ProductVariant {
 id: number;
 size: string;
 shape: string;
 stock_quantity: number;
}
interface InventoryItem {
 productName: string;
 variantLabel: string;
 stockQuantity: number;
}


export default function AdminDashboard({onAdminSignOut}: AdminDashboardProps) {
   const [inventory, setInventory] = useState<InventoryItem[]>([]);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
   const fetchInventory = async () => {
     try {
       // 1️⃣ get all products
       const productRes = await fetch("http://localhost:8000/products");
       const products = await productRes.json();


       const inventoryData: InventoryItem[] = [];


       // 2️⃣ get variants per product
       for (const product of products) {
         const variantRes = await fetch(
           `http://localhost:8000/products/${product.id}/variants`
         );
         const variants: ProductVariant[] = await variantRes.json();




         variants.forEach((variant: ProductVariant) => {
           inventoryData.push({
             productName: product.name,
             variantLabel: `${variant.size} / ${variant.shape}`,
             stockQuantity: variant.stock_quantity,
           });
         });
       }


       setInventory(inventoryData);
     } catch (error) {
       console.error("Failed to load inventory", error);
     } finally {
       setLoading(false);
     }
   };


   fetchInventory();
 }, []);


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


     {loading ? (
       <p>Loading inventory...</p>
     ) : (
       <table className="inventory-table">
         <thead>
           <tr>
             <th>Product</th>
             <th>Variant</th>
             <th>Stock Quantity</th>
           </tr>
         </thead>
         <tbody>
           {inventory.map((item, index) => (
             <tr key={index}>
               <td>{item.productName}</td>
               <td>{item.variantLabel}</td>
               <td>{item.stockQuantity}</td>
             </tr>
           ))}
         </tbody>
       </table>
     )}
     {/* {!loading && (
 <>
   <h3>Stock by Variant</h3>
   <InventoryStockChart data={inventory} />
 </>
)} */}


   </section>
 );
}
