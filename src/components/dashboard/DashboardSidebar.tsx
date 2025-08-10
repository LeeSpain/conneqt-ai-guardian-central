
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  Settings, 
  PhoneCall, 
  Globe, 
  Bot,
  MessageCircle, 
  Link as LinkIcon,
  Headphones,
  BarChart3,
  FileText,
  BrainCircuit
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
  { title: "Client Management", icon: Users, path: "/client-management" },
  { title: "Team Management", icon: UserCheck, path: "/team-management" },
  { title: "Service Analytics", icon: BarChart3, path: "/call-center" },
  { title: "Reports", icon: FileText, path: "/reports" },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-foreground">
          Conneqt<span className="text-primary">Central</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Business Dashboard</p>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Business Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-3 ${
                        location.pathname === item.path 
                          ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { title: "Platform Settings", icon: Settings, path: "/platform-settings" },
                { title: "Website Integration", icon: Globe, path: "/website-integration" },
                { title: "AI Agents", icon: BrainCircuit, path: "/ai-agents" },
                { title: "AI Guardian", icon: Bot, path: "/ai-guardian" }
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-3 ${
                        location.pathname === item.path 
                          ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
