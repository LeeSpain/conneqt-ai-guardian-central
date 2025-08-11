
import { useState } from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminContainer } from "@/components/layouts/AdminContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Code, Puzzle, Check, Settings, MessageSquare } from "lucide-react";

const WebsiteIntegration = () => {
  const [activeTab, setActiveTab] = useState("widget");

  return (
    <DashboardLayout>
      <AdminContainer>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Healthcare Website Integration</h1>
            <p className="text-muted-foreground">Connect your healthcare systems with ConneqtCentral</p>
          </div>
          <Button className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Integration Settings
          </Button>
        </div>

        <Tabs defaultValue="widget" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="widget" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Support Widget
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              API
            </TabsTrigger>
            <TabsTrigger value="plugins" className="flex items-center gap-2">
              <Puzzle className="w-4 h-4" />
              Plugins
            </TabsTrigger>
          </TabsList>

          {/* Support Widget Tab */}
          <TabsContent value="widget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Healthcare Support Widget</CardTitle>
                <CardDescription>
                  Easily add our support widget to your healthcare website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/2">
                    <h3 className="font-medium mb-2">Widget Preview</h3>
                    <div className="border rounded-lg p-4 bg-background h-[300px] relative">
                      <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div className="bg-background shadow-lg rounded-lg p-4 max-w-[250px] absolute bottom-20 right-4 border">
                        <div className="text-sm font-medium mb-2">Healthcare Support</div>
                        <div className="text-xs text-muted-foreground mb-3">
                          How can we assist with your healthcare needs today?
                        </div>
                        <Button size="sm" className="w-full text-xs">Start Chat</Button>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="font-medium mb-2">Configuration</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium block mb-1">Widget Title</label>
                        <Input defaultValue="Healthcare Support" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">Welcome Message</label>
                        <Input defaultValue="How can we assist with your healthcare needs today?" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">Button Text</label>
                        <Input defaultValue="Start Chat" />
                      </div>
                      <div className="pt-2">
                        <Button>Save Configuration</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Installation</CardTitle>
                <CardDescription>
                  Add this code to your website to enable the support widget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-foreground text-background p-4 rounded-md font-mono text-sm overflow-x-auto">
{`<script src="https://cdn.conneqtcentral.com/widget.js" 
  data-api-key="YOUR_API_KEY"
  data-service="healthcare"
  data-language="auto">
</script>`}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c0-1.1.9-2 2-2h2"/><path d="M4 12c0-1.1.9-2 2-2h2"/><path d="M4 8c0-1.1.9-2 2-2h2"/></svg>
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Healthcare API Integration</CardTitle>
                <CardDescription>
                  Connect your healthcare systems with our API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">API Keys</h3>
                  <div className="bg-muted p-4 rounded-md flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm">••••••••••••••••••••••••8f2a</div>
                      <div className="text-xs text-muted-foreground mt-1">Created: April 12, 2025</div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Reveal</Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Available Endpoints</h3>
                  <div className="space-y-2">
                    {[
                      {
                        method: "GET",
                        endpoint: "/api/v1/patients",
                        description: "Retrieve patient information"
                      },
                      {
                        method: "POST",
                        endpoint: "/api/v1/medication-events",
                        description: "Record medication dispensing events"
                      },
                      {
                        method: "GET",
                        endpoint: "/api/v1/glucose-readings",
                        description: "Retrieve glucose monitoring data"
                      },
                      {
                        method: "POST",
                        endpoint: "/api/v1/support-tickets",
                        description: "Create customer support tickets"
                      }
                    ].map((endpoint, i) => (
                      <div key={i} className="border rounded-md p-3 bg-background">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                            endpoint.method === "GET" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}>
                            {endpoint.method}
                          </span>
                          <span className="font-mono text-sm">{endpoint.endpoint}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-2">
                    View API Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plugins Tab */}
          <TabsContent value="plugins">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Healthcare System Plugins</CardTitle>
                <CardDescription>
                  Pre-built integrations for popular healthcare platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Electronic Health Records",
                      description: "Connect with major EHR systems",
                      status: "installed",
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                    },
                    {
                      name: "Pharmacy Systems",
                      description: "Connect with medication dispensing systems",
                      status: "installed",
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pill"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                    },
                    {
                      name: "Health Monitoring Devices",
                      description: "Connect with glucose monitors and wearables",
                      status: "available",
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    },
                    {
                      name: "Emergency Services",
                      description: "Connect with emergency response systems",
                      status: "available",
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-alert"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                    },
                  ].map((plugin, i) => (
                    <div key={i} className="border rounded-lg p-4 bg-background">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-md text-primary">
                          {plugin.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{plugin.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{plugin.description}</p>
                          <div className="mt-3 flex justify-between items-center">
                            {plugin.status === "installed" ? (
                              <span className="text-xs flex items-center gap-1 text-green-600">
                                <Check className="w-3 h-3" />
                                Installed
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">Available</span>
                            )}
                            <Button size="sm" variant={plugin.status === "installed" ? "outline" : "default"}>
                              {plugin.status === "installed" ? "Configure" : "Install"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AdminContainer>
    </DashboardLayout>
  );
};

export default WebsiteIntegration;
