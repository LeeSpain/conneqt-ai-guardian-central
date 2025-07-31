import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  PhoneCall, 
  ArrowUp, 
  ArrowDown, 
  LogOut, 
  Home, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  UserCheck,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleHomepage = () => {
    navigate('/');
  };

  const currentTime = new Date();
  const timeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Business-focused metrics
  const businessMetrics = [
    {
      title: "Active Clients",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Service Calls Today",
      value: "89",
      change: "+23%",
      trend: "up",
      icon: PhoneCall,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Customer Satisfaction",
      value: "96%",
      change: "+3%",
      trend: "up",
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Monthly Revenue",
      value: "$23,450",
      change: "-2%",
      trend: "down",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentActivity = [
    { type: "New Client", message: "TechCorp Solutions joined our platform", time: "5 min ago", priority: "normal" },
    { type: "Service Completed", message: "Call resolved for Widget Industries", time: "12 min ago", priority: "normal" },
    { type: "Payment Received", message: "$2,300 payment from Global Systems", time: "1 hour ago", priority: "normal" },
    { type: "Client Feedback", message: "5-star rating from DataFlow Inc.", time: "2 hours ago", priority: "positive" },
    { type: "Service Issue", message: "Response needed for MegaTech support", time: "3 hours ago", priority: "attention" }
  ];

  const quickStats = [
    { label: "Response Time", value: "< 2 min", icon: Clock },
    { label: "Resolution Rate", value: "94%", icon: CheckCircle },
    { label: "System Uptime", value: "99.9%", icon: Activity },
    { label: "Open Tickets", value: "12", icon: AlertTriangle }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {timeOfDay()}, Admin
              </h1>
              <p className="text-muted-foreground mt-1">
                {format(currentTime, "EEEE, MMMM do yyyy")}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleHomepage} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Homepage
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="destructive" 
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Key Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessMetrics.map((metric, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          {metric.value}
                        </h3>
                        <span className={`text-sm flex items-center gap-1 ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.trend === 'up' ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )}
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
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