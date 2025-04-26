
import { Home, Users, Settings, PhoneCall, Globe, LayoutDashboard } from "lucide-react";
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
import { Link } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { title: "Overview", icon: Home, path: "/admin-dashboard" },
  { title: "Client Management", icon: Users, path: "/client-management" },
  { title: "Call Center", icon: PhoneCall, path: "/call-center" },
  { title: "Platform Settings", icon: Settings, path: "/platform-settings" },
  { title: "Website Integration", icon: Globe, path: "/website-integration" },
];

export const DashboardSidebar = () => {
  return (
    <Sidebar>
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">
          <span className="text-conneqt-blue">Conneqt</span>Central
        </h2>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
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
