import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RoleDashboard } from "@/components/dashboard/RoleDashboard";
import { UserProvider } from "@/contexts/UserContext";
import { AdminContainer } from "@/components/layouts/AdminContainer";

export default function AdminDashboard() {
  return (
    <UserProvider>
      <DashboardLayout>
        <AdminContainer>
          <DashboardHeader />
          <RoleDashboard />
        </AdminContainer>
      </DashboardLayout>
    </UserProvider>
  );
}