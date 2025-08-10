import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUserRole } from "@/hooks/useUserRole";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Phone, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  Settings,
  BarChart3,
  FileText,
  Eye,
  Lock
} from 'lucide-react';

export const RoleDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isOwner, isManager, isStaff, isViewer, canAccessFeature } = useUserRole();

  // Role-specific metrics
  const getMetricsForRole = () => {
    const baseMetrics = [
      {
        title: "Active Clients",
        value: "24",
        change: "+2.5%",
        trend: "up" as const,
        icon: Users,
        description: "Total active client accounts"
      }
    ];

    if (isOwner || isManager) {
      return [
        ...baseMetrics,
        {
          title: "Monthly Revenue",
          value: "$12,450",
          change: "+8.2%",
          trend: "up" as const,
          icon: DollarSign,
          description: "Revenue this month"
        },
        {
          title: "Call Volume",
          value: "1,247",
          change: "+15.3%",
          trend: "up" as const,
          icon: Phone,
          description: "Total calls handled"
        },
        {
          title: "Growth Rate",
          value: "23.4%",
          change: "+3.1%",
          trend: "up" as const,
          icon: TrendingUp,
          description: "Business growth rate"
        }
      ];
    }

    if (isStaff) {
      return [
        ...baseMetrics,
        {
          title: "My Calls Today",
          value: "47",
          change: "+12.5%",
          trend: "up" as const,
          icon: Phone,
          description: "Calls handled today"
        },
        {
          title: "Resolution Rate",
          value: "94.2%",
          change: "+2.1%",
          trend: "up" as const,
          icon: TrendingUp,
          description: "Issue resolution rate"
        }
      ];
    }

    // Viewer gets minimal metrics
    return [
      baseMetrics[0],
      {
        title: "System Status",
        value: "Online",
        change: "99.9%",
        trend: "up" as const,
        icon: TrendingUp,
        description: "System uptime"
      }
    ];
  };

  // Role-specific quick actions
  const getQuickActionsForRole = () => {
    const actions = [] as Array<{
      title: string;
      description: string;
      icon: any;
      action: () => void;
      variant: "default" | "outline";
    }>;

    if (canAccessFeature('clients')) {
      actions.push({
        title: "Manage Clients",
        description: "View and manage client accounts",
        icon: Users,
        action: () => navigate("/client-management"),
        variant: "default"
      });
    }

    if (canAccessFeature('team')) {
      actions.push({
        title: "Team Management",
        description: "Manage team members and roles",
        icon: UserCheck,
        action: () => navigate("/team-management"),
        variant: "default"
      });
    }

    if (canAccessFeature('reports')) {
      actions.push({
        title: "View Reports",
        description: "Access business analytics",
        icon: BarChart3,
        action: () => navigate("/call-center"),
        variant: "default"
      });
    }

    if (canAccessFeature('settings')) {
      actions.push({
        title: "Settings",
        description: "Configure system settings",
        icon: Settings,
        action: () => navigate("/platform-settings"),
        variant: "outline"
      });
    }

    // Always expose the Business Needs flow entry point from Admin
    actions.push({
      title: "Business Needs Questionnaire",
      description: "Start the Business Needs flow",
      icon: FileText,
      action: () => navigate("/solution-builder"),
      variant: "default"
    });

    return actions;
  };

  const metrics = getMetricsForRole();
  const quickActions = getQuickActionsForRole();

  return (
    <div className="space-y-6">
      {/* Role-specific welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Welcome back, {currentUser?.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">{currentUser?.role}</Badge>
            <span className="text-sm text-muted-foreground">
              {isViewer && "View-only access"}
              {isStaff && "Standard access"}
              {isManager && "Management access"}
              {isOwner && "Full access"}
            </span>
          </div>
        </div>
      </div>

      {/* Role-based restrictions notice */}
      {isViewer && (
        <Alert>
          <Eye className="h-4 w-4" />
          <AlertDescription>
            You have view-only access. Contact your administrator to request additional permissions.
          </AlertDescription>
        </Alert>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for your role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <action.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-foreground">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <Button 
                          variant={action.variant} 
                          size="sm"
                          onClick={action.action}
                          className="w-full"
                        >
                          Open
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role-specific recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            {isOwner || isManager ? "Business overview" : "Your recent actions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isViewer ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Activity history requires additional permissions
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Client "Tech Solutions Inc" status updated</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">New support ticket created</span>
                  <span className="text-xs text-muted-foreground ml-auto">15 min ago</span>
                </div>
                {(isOwner || isManager) && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Monthly report generated</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};