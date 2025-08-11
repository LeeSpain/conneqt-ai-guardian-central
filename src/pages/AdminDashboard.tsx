import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RoleDashboard } from "@/components/dashboard/RoleDashboard";
import { UserProvider } from "@/contexts/UserContext";
import { AdminContainer } from "@/components/layouts/AdminContainer";
import useScrollToTop from '@/hooks/useScrollToTop';

export default function AdminDashboard() {
  useScrollToTop();
  
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