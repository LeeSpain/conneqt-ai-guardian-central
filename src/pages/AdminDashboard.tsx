import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  PhoneCall, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  UserCheck,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();


  // Business-focused metrics
  const businessMetrics = [
    {
      title: "Active Clients",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Total client accounts"
    },
    {
      title: "Service Requests",
      value: "89",
      change: "+23%",
      trend: "up",
      icon: PhoneCall,
      description: "Today's completed services"
    },
    {
      title: "Client Satisfaction",
      value: "96%",
      change: "+3%",
      trend: "up",
      icon: UserCheck,
      description: "Average rating this month"
    },
    {
      title: "Monthly Revenue",
      value: "$23,450",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      description: "Recurring service revenue"
    }
  ];

  const recentActivity = [
    { type: "Client Onboarded", message: "MegaCorp Inc. successfully onboarded with premium package", time: "15 min ago", priority: "positive" },
    { type: "Service Delivered", message: "Monthly analytics report delivered to TechFlow Solutions", time: "1 hour ago", priority: "normal" },
    { type: "Payment Processed", message: "$4,200 subscription renewal from DataSync Corp", time: "2 hours ago", priority: "normal" },
    { type: "Client Meeting", message: "Quarterly review scheduled with Global Industries", time: "3 hours ago", priority: "normal" },
    { type: "Support Request", message: "Technical consultation requested by StartUp Ventures", time: "4 hours ago", priority: "attention" }
  ];

  const quickStats = [
    { label: "Avg Response Time", value: "< 30 min", icon: Clock },
    { label: "Client Retention", value: "98%", icon: CheckCircle },
    { label: "Service Delivery", value: "99.2%", icon: Activity },
    { label: "Pending Reviews", value: "8", icon: AlertTriangle }
  ];

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Key Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                trend={metric.trend as 'up' | 'down'}
                icon={metric.icon}
                description={metric.description}
              />
            ))}
          </div>

          {/* Quick Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Service Performance
              </CardTitle>
              <CardDescription>
                Real-time service delivery metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Business Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest business events and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.priority === 'positive' ? 'bg-green-500' :
                        activity.priority === 'attention' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common business operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/client-management')}
                  >
                    <Users className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Manage Clients</p>
                      <p className="text-sm text-muted-foreground">View and update client information</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/call-center')}
                  >
                    <PhoneCall className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Service Analytics</p>
                      <p className="text-sm text-muted-foreground">Review call metrics and performance</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/platform-settings')}
                  >
                    <TrendingUp className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Business Reports</p>
                      <p className="text-sm text-muted-foreground">Generate performance reports</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;