import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Lock, LayoutDashboard, Users, Shield, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

const AdminDashboard = () => {
  // Simulating a subscription tier - in a real app, this would come from auth context or API
  const [subscriptionTier, setSubscriptionTier] = useState<'starter' | 'professional' | 'enterprise'>('starter');
  
  // Function to change subscription tier (for demo purposes)
  const changeSubscriptionTier = (tier: 'starter' | 'professional' | 'enterprise') => {
    setSubscriptionTier(tier);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer Interactions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {subscriptionTier === 'starter' && '87/100'}
                      {subscriptionTier === 'professional' && '342/500'}
                      {subscriptionTier === 'enterprise' && 'Unlimited'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {subscriptionTier === 'starter' && '87% of monthly limit used'}
                      {subscriptionTier === 'professional' && '68% of monthly limit used'}
                      {subscriptionTier === 'enterprise' && 'No usage limits'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {subscriptionTier === 'starter' && '24h'}
                      {subscriptionTier === 'professional' && '12h'}
                      {subscriptionTier === 'enterprise' && 'Instant'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {subscriptionTier === 'starter' && 'Standard response time'}
                      {subscriptionTier === 'professional' && 'Priority response'}
                      {subscriptionTier === 'enterprise' && 'Dedicated support team'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {subscriptionTier === 'starter' && '1'}
                      {subscriptionTier === 'professional' && '3'}
                      {subscriptionTier === 'enterprise' && '10'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum allowed users for your plan
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Features Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Features</CardTitle>
                  <CardDescription>
                    Features available in your current subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic features - available to all plans */}
                    <div className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Basic dashboard access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Customer interaction tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Basic email support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>Essential reporting</span>
                    </div>

                    {/* Professional features */}
                    <div className="flex items-center space-x-2">
                      {subscriptionTier === 'starter' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier === 'starter' ? 'text-gray-400' : ''}>
                        Advanced reporting
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {subscriptionTier === 'starter' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier === 'starter' ? 'text-gray-400' : ''}>
                        Team collaboration tools
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {subscriptionTier === 'starter' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier === 'starter' ? 'text-gray-400' : ''}>
                        Priority email & phone support
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {subscriptionTier === 'starter' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier === 'starter' ? 'text-gray-400' : ''}>
                        Interactive AI assistant
                      </span>
                    </div>

                    {/* Enterprise features */}
                    <div className="flex items-center space-x-2">
                      {subscriptionTier !== 'enterprise' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier !== 'enterprise' ? 'text-gray-400' : ''}>
                        Advanced API integration
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {subscriptionTier !== 'enterprise' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier !== 'enterprise' ? 'text-gray-400' : ''}>
                        Custom branding options
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {subscriptionTier !== 'enterprise' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier !== 'enterprise' ? 'text-gray-400' : ''}>
                        Dedicated account manager
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {subscriptionTier !== 'enterprise' ? (
                        <Lock className="h-5 w-5 text-gray-300" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <span className={subscriptionTier !== 'enterprise' ? 'text-gray-400' : ''}>
                        Full-featured AI analytics
                      </span>
                    </div>
                  </div>
                </CardContent>
                {subscriptionTier !== 'enterprise' && (
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = '/subscriptions'}
                    >
                      Upgrade Your Plan
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>
                    {subscriptionTier === 'starter' && 'Basic analytics are available in the Starter plan'}
                    {subscriptionTier === 'professional' && 'Advanced analytics are available in the Professional plan'}
                    {subscriptionTier === 'enterprise' && 'Full analytics suite is available in the Enterprise plan'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Analytics - available to all */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Basic Analytics</h3>
                    <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Customer Interaction Summary Chart</p>
                    </div>
                  </div>
                  
                  {/* Advanced Analytics - Professional and Enterprise */}
                  {subscriptionTier !== 'starter' && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">User Engagement Metrics</p>
                        </div>
                        <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Response Time Analysis</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Enterprise Analytics */}
                  {subscriptionTier === 'enterprise' && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">AI-Powered Analytics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Predictive Customer Behavior</p>
                        </div>
                        <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Advanced Trend Analysis</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Upgrade Message */}
                  {subscriptionTier !== 'enterprise' && (
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-800">
                        {subscriptionTier === 'starter' ? 
                          'Upgrade to Professional or Enterprise for advanced analytics capabilities.' :
                          'Upgrade to Enterprise for AI-powered analytics and custom reporting.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Customers Tab */}
            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>
                    View and manage your customer interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="grid grid-cols-4 font-medium">
                        <div>Customer</div>
                        <div>Status</div>
                        <div>Last Contact</div>
                        <div>Actions</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {/* Sample customers */}
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-4 grid grid-cols-4 items-center">
                          <div>Customer {i}</div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Active
                            </span>
                          </div>
                          <div>Today</div>
                          <div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Feature limitations based on plan */}
                  {subscriptionTier === 'starter' && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-md text-sm">
                      <p className="text-amber-800">
                        You are limited to viewing the last 30 days of customer data with the Starter plan.
                      </p>
                    </div>
                  )}
                  
                  {subscriptionTier === 'professional' && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <Button>Export Customer Data</Button>
                      <Button disabled>
                        <Lock className="mr-2 h-4 w-4" />
                        Advanced Segmentation
                        <span className="ml-2 text-xs">(Enterprise Only)</span>
                      </Button>
                    </div>
                  )}
                  
                  {subscriptionTier === 'enterprise' && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <Button>Export Customer Data</Button>
                      <Button>Advanced Segmentation</Button>
                      <Button>AI Customer Analysis</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account and subscription settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      General Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-md px-3 py-2" 
                          defaultValue="Your Company Name" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                          type="email" 
                          className="w-full border rounded-md px-3 py-2" 
                          defaultValue="contact@example.com" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Plan Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Subscription Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Current Plan:</span>
                        <span className="font-bold text-conneqt-blue">
                          {subscriptionTier === 'starter' && 'Starter Plan'}
                          {subscriptionTier === 'professional' && 'Professional Plan'}
                          {subscriptionTier === 'enterprise' && 'Enterprise Plan'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Billing Cycle:</span>
                        <span>Monthly</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Next Billing Date:</span>
                        <span>May 15, 2025</span>
                      </div>
                      <Button className="w-full" onClick={() => window.location.href = '/subscriptions'}>
                        {subscriptionTier === 'enterprise' ? 'Manage Subscription' : 'Upgrade Plan'}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Advanced Settings - Different for each plan */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                    
                    {subscriptionTier === 'starter' && (
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500 mb-4">
                          Advanced settings are available in the Professional and Enterprise plans.
                        </p>
                        <Button variant="outline" onClick={() => window.location.href = '/subscriptions'}>
                          Upgrade to Access
                        </Button>
                      </div>
                    )}
                    
                    {subscriptionTier === 'professional' && (
                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center space-x-2 mb-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Enable team collaboration features</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2 mb-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Receive weekly analytics reports</span>
                          </label>
                        </div>
                        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-md">
                          <Lock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            Custom branding options (Enterprise only)
                          </span>
                        </div>
                        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-md">
                          <Lock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            API configuration (Enterprise only)
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {subscriptionTier === 'enterprise' && (
                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center space-x-2 mb-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Enable team collaboration features</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2 mb-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span>Receive weekly analytics reports</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Custom Branding</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <input type="color" className="h-10 w-full" defaultValue="#3B82F6" />
                              <span className="text-xs text-gray-500">Primary Color</span>
                            </div>
                            <div>
                              <input type="color" className="h-10 w-full" defaultValue="#1E40AF" />
                              <span className="text-xs text-gray-500">Secondary Color</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">API Configuration</label>
                          <input 
                            type="text" 
                            className="w-full border rounded-md px-3 py-2" 
                            placeholder="API Key" 
                            defaultValue="sk_test_enterprise_api_key" 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
