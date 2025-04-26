import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, BarChart3, Users, PhoneCall, ArrowUp, ArrowDown, MessageCircle, LogOut, Home, Send } from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ text: string; isAI: boolean }[]>([]);

  const handleLogout = () => {
    // TODO: Add actual logout logic (e.g., clearing authentication tokens)
    navigate('/');
  };

  const handleHomepage = () => {
    navigate('/');
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages([...chatMessages, { text: message, isAI: false }]);
    setMessage('');
    
    // Simulate AI response (Replace with actual AI integration)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        text: "Thanks for your message. How can I assist you today?", 
        isAI: true 
      }]);
    }, 1000);
  };

  const currentTime = new Date();
  const timeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {timeOfDay()}, Admin
              </h1>
              <p className="text-gray-500 mt-1">
                {format(currentTime, "EEEE, MMMM do yyyy, h:mm a")}
              </p>
            </div>
            <div className="flex gap-2">
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Clients</p>
                    <h3 className="text-2xl font-bold mt-2">245</h3>
                    <p className="text-sm text-green-600 flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 mr-1" /> 12% increase
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Calls</p>
                    <h3 className="text-2xl font-bold mt-2">1,234</h3>
                    <p className="text-sm text-green-600 flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 mr-1" /> 8% increase
                    </p>
                  </div>
                  <PhoneCall className="w-8 h-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">AI Interactions</p>
                    <h3 className="text-2xl font-bold mt-2">3,456</h3>
                    <p className="text-sm text-green-600 flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 mr-1" /> 24% increase
                    </p>
                  </div>
                  <Bot className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                    <h3 className="text-2xl font-bold mt-2">$12,345</h3>
                    <p className="text-sm text-red-600 flex items-center mt-2">
                      <ArrowDown className="w-4 h-4 mr-1" /> 3% decrease
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Guardian Chat */}
            <Card className="md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bot className="w-5 h-5 text-blue-600" />
                  Chat with AI Guardian
                </CardTitle>
                <CardDescription className="text-sm">
                  Get instant assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-3 h-[200px] mb-3 overflow-y-auto">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 p-2 rounded-lg text-sm ${
                        msg.isAI 
                          ? "bg-blue-50 mr-8" 
                          : "bg-green-50 ml-8"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {msg.isAI && <Bot className="w-3 h-3 mt-1" />}
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Platform Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest updates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "New client registered", time: "5 minutes ago", icon: Users },
                    { title: "Support ticket resolved", time: "1 hour ago", icon: PhoneCall },
                    { title: "AI Guardian update completed", time: "2 hours ago", icon: Bot },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <activity.icon className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
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
