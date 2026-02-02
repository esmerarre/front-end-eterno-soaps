interface AdminDashboardProps {
    onAdminSignOut?: () => void;
}

export default function AdminDashboard({onAdminSignOut}: AdminDashboardProps) {
  return (
    <section className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={onAdminSignOut}>Sign Out</button>
    </section>
  );
}