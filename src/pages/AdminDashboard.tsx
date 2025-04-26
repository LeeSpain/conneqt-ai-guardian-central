import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, BarChart3, Users, PhoneCall, ArrowUp, ArrowDown, MessageCircle } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-500 mt-1">Here's what's happening with your platform today.</p>
            </div>
            <Button onClick={() => window.location.href = '/ai-guardian'} className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Open AI Guardian
            </Button>
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

          {/* AI Guardian Integration */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-blue-600" />
                AI Guardian Quick Access
              </CardTitle>
              <CardDescription>
                Start a conversation or check recent interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 p-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Recent AI Interactions</h3>
                <div className="space-y-2">
                  {["Client inquiry about pricing", "Support ticket resolution", "Website integration help"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm p-2 hover:bg-gray-50 rounded-md">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Bot className="w-4 h-4 mr-2" /> Start New Conversation
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" /> Review Client Interactions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your platform's latest updates and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "New client registered", time: "5 minutes ago", icon: Users },
                  { title: "Support ticket resolved", time: "1 hour ago", icon: PhoneCall },
                  { title: "AI Guardian update completed", time: "2 hours ago", icon: Bot },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
