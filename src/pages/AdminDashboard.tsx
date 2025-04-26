
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Bot, 
  BarChart3, 
  Users, 
  PhoneCall, 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  LogOut, 
  Home, 
  Send, 
  BrainCircuit,
  Gauge,
  AlertCircle,
  Link as LinkIcon,
  Eye,
  FileCheck
} from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ text: string; isAI: boolean }[]>([]);
  const [oversightMode, setOversightMode] = useState("autonomous");

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
        text: "I've analyzed your request and can assist with that. Would you like me to proceed with the recommended action?", 
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

  // Simulated AI performance metrics
  const aiMetrics = {
    confidence: 94,
    resolutionRate: 96,
    avgHandlingTime: "1m 42s",
    customerSatisfaction: 4.7
  };

  // Simulated active channel data
  const activeChannels = [
    { channel: "Web Chat", count: 42, trend: "up" },
    { channel: "Voice Calls", count: 17, trend: "up" },
    { channel: "Email", count: 31, trend: "down" },
    { channel: "Social Media", count: 23, trend: "up" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section with AI Controls */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {timeOfDay()}, Admin
              </h1>
              <p className="text-gray-500 mt-1">
                {format(currentTime, "EEEE, MMMM do yyyy, h:mm a")}
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="border p-2 rounded-md bg-white">
                <div className="flex items-center gap-3 mb-1">
                  <BrainCircuit className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">AI Oversight Mode:</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Button 
                    variant={oversightMode === "autonomous" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setOversightMode("autonomous")}
                    className="text-xs h-8"
                  >
                    Autonomous
                  </Button>
                  <Button 
                    variant={oversightMode === "supervised" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setOversightMode("supervised")}
                    className="text-xs h-8"
                  >
                    Supervised
                  </Button>
                  <Button 
                    variant={oversightMode === "training" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setOversightMode("training")}
                    className="text-xs h-8"
                  >
                    Training
                  </Button>
                </div>
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
          </div>

          {/* AI Performance Dashboard */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                AI Agent Performance
              </CardTitle>
              <CardDescription>
                Real-time metrics for autonomous operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">AI Confidence</div>
                  <div className="text-2xl font-bold">{aiMetrics.confidence}%</div>
                  <div className="h-2 bg-gray-100 rounded mt-2">
                    <div className="h-full bg-blue-500 rounded" style={{ width: `${aiMetrics.confidence}%` }}></div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Resolution Rate</div>
                  <div className="text-2xl font-bold">{aiMetrics.resolutionRate}%</div>
                  <div className="h-2 bg-gray-100 rounded mt-2">
                    <div className="h-full bg-green-500 rounded" style={{ width: `${aiMetrics.resolutionRate}%` }}></div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Avg Handling Time</div>
                  <div className="text-2xl font-bold">{aiMetrics.avgHandlingTime}</div>
                  <div className="flex items-center text-green-600 text-xs mt-2">
                    <ArrowDown className="w-3 h-3 mr-1" /> 12% from last week
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Customer Satisfaction</div>
                  <div className="text-2xl font-bold">{aiMetrics.customerSatisfaction}/5</div>
                  <div className="flex items-center text-green-600 text-xs mt-2">
                    <ArrowUp className="w-3 h-3 mr-1" /> 0.3 from last week
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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

          {/* Channel Activity and AI Chat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Channel Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Channels</CardTitle>
                <CardDescription>Current AI agent engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channel</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeChannels.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.channel}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>
                          {item.trend === "up" ? 
                            <ArrowUp className="w-4 h-4 text-green-600" /> : 
                            <ArrowDown className="w-4 h-4 text-red-600" />
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* AI Guardian Chat */}
            <Card className="md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bot className="w-5 h-5 text-blue-600" />
                  Chat with AI Guardian
                </CardTitle>
                <CardDescription className="text-sm">
                  Get instant assistance from your AI agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-3 h-[180px] mb-3 overflow-y-auto">
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
                    placeholder="Type your message to AI Guardian..."
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
          </div>

          {/* System Status Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Integrations Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <LinkIcon className="w-5 h-5 text-blue-600" />
                  Business Integrations
                </CardTitle>
                <CardDescription>
                  Status of connected business systems
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-3">
                  {[
                    { name: "CRM System (Salesforce)", status: "Connected", health: "Excellent" },
                    { name: "Payment Processor (Stripe)", status: "Connected", health: "Good" },
                    { name: "ERP Platform (SAP)", status: "Connected", health: "Warning" },
                    { name: "Email Marketing (Mailchimp)", status: "Connected", health: "Good" },
                  ].map((system, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          system.health === "Excellent" ? "bg-green-500" :
                          system.health === "Good" ? "bg-blue-500" :
                          system.health === "Warning" ? "bg-yellow-500" : "bg-red-500"
                        }`}></div>
                        <span className="font-medium text-sm">{system.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{system.status}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Manage Integrations
                </Button>
              </CardContent>
            </Card>

            {/* AI Monitoring */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Human Oversight Alerts
                </CardTitle>
                <CardDescription>
                  Interactions flagged for human review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "CS-2303", type: "Low Confidence", time: "2 min ago", priority: "high" },
                    { id: "CS-2301", type: "Customer Request", time: "15 min ago", priority: "medium" },
                    { id: "CS-2299", type: "Policy Exception", time: "32 min ago", priority: "low" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <AlertCircle className={`w-4 h-4 ${
                          alert.priority === "high" ? "text-red-500" :
                          alert.priority === "medium" ? "text-yellow-500" : 
                          "text-blue-500"
                        }`} />
                        <span className="font-medium text-sm">{alert.type} <span className="text-gray-500 font-normal">({alert.id})</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{alert.time}</span>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <FileCheck className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
