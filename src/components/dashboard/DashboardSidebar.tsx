
import { 
  LayoutDashboard, 
  Users, 
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
  { title: "Overview", icon: LayoutDashboard, path: "/admin-dashboard" },
  { title: "AI Guardian", icon: Bot, path: "/ai-guardian" },
  { title: "Client Management", icon: Users, path: "/client-management" },
  { title: "Call Center", icon: PhoneCall, path: "/call-center" },
  { title: "Website Integration", icon: Globe, path: "/website-integration" },
  { title: "Platform Settings", icon: Settings, path: "/platform-settings" },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">
          <span className="text-conneqt-blue">Conneqt</span>Central
        </h2>
        <p className="text-xs text-gray-500 mt-1">AI Agent Platform</p>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-2 ${
                        location.pathname === item.path 
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
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
          <SidebarGroupLabel>AI Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { title: "Business Integrations", icon: LinkIcon, path: "/platform-settings" },
                { title: "Voice System", icon: Headphones, path: "/platform-settings" },
                { title: "AI Training", icon: BrainCircuit, path: "/platform-settings" },
                { title: "Analytics", icon: BarChart3, path: "/platform-settings" }
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-2 ${
                        location.pathname === item.path 
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
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
        <SidebarTrigger className="absolute bottom-4 left-4" />
      </SidebarContent>
    </Sidebar>
  );
};
