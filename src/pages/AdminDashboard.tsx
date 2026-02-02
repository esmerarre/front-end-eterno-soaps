import AdminSignIn from "../components/AdminSignIn";


interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose}: AdminDashboardProps) {
  return (
    <section className="admin-dashboard">
        <div className="sign-in-container">
            <AdminSignIn isOpen={isOpen} onClose={onClose} />
        </div>
    </section>
  );
}