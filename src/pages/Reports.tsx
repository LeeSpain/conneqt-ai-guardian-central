import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { UserProvider } from "@/contexts/UserContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { TrendingUp, Users, Phone, Clock, DollarSign, Target } from "lucide-react";

const salesData = [
  { month: "Jan", revenue: 12000, clients: 45 },
  { month: "Feb", revenue: 15000, clients: 52 },
  { month: "Mar", revenue: 18000, clients: 61 },
  { month: "Apr", revenue: 22000, clients: 73 },
  { month: "May", revenue: 25000, clients: 89 },
  { month: "Jun", revenue: 28000, clients: 95 },
];

const callData = [
  { time: "9AM", calls: 120 },
  { time: "10AM", calls: 150 },
  { time: "11AM", calls: 180 },
  { time: "12PM", calls: 200 },
  { time: "1PM", calls: 160 },
  { time: "2PM", calls: 190 },
  { time: "3PM", calls: 220 },
  { time: "4PM", calls: 180 },
];

const performanceData = [
  { name: "Resolved", value: 340, color: "hsl(var(--primary))" },
  { name: "In Progress", value: 120, color: "hsl(var(--secondary))" },
  { name: "Pending", value: 45, color: "hsl(var(--muted))" },
];

function ReportsContent() {
  const { currentUser, canAccessFeature } = useUserRole();

  if (!canAccessFeature('reports')) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              You don't have permission to view reports. Contact your administrator for access.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics for your business
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Role: {currentUser?.role}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reports are unavailable</CardTitle>
          <CardDescription>Connect your data sources to enable analytics.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No demo charts shown. Once integrated, this page will render live metrics.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Reports() {
  return (
    <UserProvider>
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <DashboardHeader />
          <ReportsContent />
        </div>
      </DashboardLayout>
    </UserProvider>
  );
}