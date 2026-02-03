import "./AdminDashboard.css";
import MonthlySalesChart from "../components/SalesChart";
import TopSellingProductsChart from "../components/TopSellingProductsChart";

interface AdminDashboardProps {
    onAdminSignOut?: () => void;
}


export default function AdminDashboard({onAdminSignOut}: AdminDashboardProps) {
  return (
    <section className="admin-dashboard">
        <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <button className="sign-out-button" onClick={onAdminSignOut}>Sign Out</button>
        </div>
        < div className="admin-content">
            <MonthlySalesChart />
            <TopSellingProductsChart />
        </div>

    </section>
  );
}