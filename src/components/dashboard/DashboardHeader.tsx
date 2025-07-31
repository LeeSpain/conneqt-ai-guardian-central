import { Button } from "@/components/ui/button";
import { Home, LogOut, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const currentTime = new Date();
  
  const timeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleHomepage = () => {
    navigate('/');
  };

  return (
    <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {timeOfDay()}, Admin
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {format(currentTime, "EEEE, MMMM do yyyy")}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleHomepage} 
              variant="ghost" 
              size="sm"
              className="hidden md:flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Homepage
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};