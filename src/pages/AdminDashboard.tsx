import type { NewProduct } from "../App";
import InventoryManager from "../components/InventoryManager";

interface AdminDashboardProps {
    onAdminSignOut?: () => void;
    createNewProduct?: (newProduct: NewProduct) => void;
}

export default function AdminDashboard({onAdminSignOut, createNewProduct}: AdminDashboardProps) {
  return (
    <section className="admin-dashboard">
      <h1>Admin Dashboard</h1>
        <InventoryManager createNewProduct={createNewProduct} />
      <button onClick={onAdminSignOut}>Sign Out</button>
    </section>
  );
}