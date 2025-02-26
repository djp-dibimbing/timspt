import DashboardLayout from "../components/dashboardLayout";

export default function home() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Dashboard Home</h1>
      <p>Welcome to the admin dashboard.</p>
    </DashboardLayout>
  );
}