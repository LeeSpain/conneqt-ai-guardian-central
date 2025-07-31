import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RoleDashboard } from "@/components/dashboard/RoleDashboard";
import { UserProvider } from "@/contexts/UserContext";

export default function AdminDashboard() {
  return (
    <UserProvider>
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <DashboardHeader />
          <RoleDashboard />
        </div>
      </DashboardLayout>
    </UserProvider>
  );
}