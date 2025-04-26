
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  Shield, 
  Bot, 
  Globe, 
  Headphones, 
  BrainCircuit,
  Save,
  RefreshCcw
} from "lucide-react";

const PlatformSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Platform Settings</h1>
              <p className="text-gray-500">Configure your AI agent platform</p>
            </div>
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save All Changes
            </Button>
          </div>

          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>AI Agent</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Voice System</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure basic platform settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="ConneqtCentral" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <select id="timezone" className="w-full h-10 px-3 py-2 border rounded-md">
                        <option>Europe/Madrid</option>
                        <option>America/New_York</option>
                        <option>America/Los_Angeles</option>
                        <option>Asia/Tokyo</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input id="notification-email" type="email" defaultValue="admin@conneqtcentral.com" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Interface Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <Switch id="dark-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="compact-view">Compact View</Label>
                        <Switch id="compact-view" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-alerts">Sound Alerts</Label>
                        <Switch id="sound-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-refresh">Auto Refresh</Label>
                        <Switch id="auto-refresh" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Agent Configuration</CardTitle>
                  <CardDescription>
                    Configure your autonomous AI agent's behavior and capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Core AI Behavior</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autonomous-mode">Fully Autonomous Mode</Label>
                          <p className="text-xs text-gray-500">AI operates without human oversight</p>
                        </div>
                        <Switch id="autonomous-mode" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="continuous-learning">Continuous Learning</Label>
                          <p className="text-xs text-gray-500">AI improves from interactions</p>
                        </div>
                        <Switch id="continuous-learning" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="human-escalation">Human Escalation</Label>
                          <p className="text-xs text-gray-500">Fallback to human agents</p>
                        </div>
                        <Switch id="human-escalation" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">AI Confidence Thresholds</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="confidence-threshold">Minimum Confidence Threshold</Label>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <input
                          id="confidence-threshold"
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="75"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Low (Human Review)</span>
                          <span>High (Autonomous)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Language Models</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-md bg-blue-50 border-blue-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Primary Model</span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
                        </div>
                        <p className="text-xs mt-2 text-gray-600">GPT-4o - Maximum capability and reasoning</p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">Fallback Model</span>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Standby</span>
                        </div>
                        <p className="text-xs mt-2 text-gray-600">GPT-4o-mini - For high traffic periods</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Reset to Defaults
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="voice" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Voice System Configuration</CardTitle>
                  <CardDescription>
                    Configure voice synthesis and recognition settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Voice Identity</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Voice Gender</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 bg-blue-50 border-blue-200">Female</Button>
                          <Button variant="outline" className="flex-1">Male</Button>
                          <Button variant="outline" className="flex-1">Neutral</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Voice Accent</Label>
                        <select className="w-full h-10 px-3 py-2 border rounded-md">
                          <option>British English</option>
                          <option>American English</option>
                          <option>Australian English</option>
                          <option>Spanish</option>
                          <option>Dutch</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Voice Parameters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-speed">Speaking Speed</Label>
                          <span className="text-sm">Normal</span>
                        </div>
                        <input
                          id="voice-speed"
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="50"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Slow</span>
                          <span>Fast</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-pitch">Pitch</Label>
                          <span className="text-sm">Medium</span>
                        </div>
                        <input
                          id="voice-pitch"
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="50"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Language Settings</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 p-3 border rounded-md bg-blue-50 border-blue-100">
                          <span className="font-medium">English</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Primary</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <span>Spanish</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <span>Dutch</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <span>French</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Voice Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Compliance</CardTitle>
                  <CardDescription>
                    Configure security settings and compliance features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Data Protection</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="data-encryption">End-to-end Encryption</Label>
                          <p className="text-xs text-gray-500">Secure all communications</p>
                        </div>
                        <Switch id="data-encryption" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="data-retention">Data Retention Policy</Label>
                          <p className="text-xs text-gray-500">Auto-delete after 30 days</p>
                        </div>
                        <Switch id="data-retention" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="audit-logging">Comprehensive Audit Logging</Label>
                          <p className="text-xs text-gray-500">Track all AI actions</p>
                        </div>
                        <Switch id="audit-logging" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Compliance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-green-50 border-green-100">
                        <Shield className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="font-medium">GDPR</p>
                          <p className="text-xs text-gray-600">Compliant</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-green-50 border-green-100">
                        <Shield className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="font-medium">PCI DSS</p>
                          <p className="text-xs text-gray-600">Compliant</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-yellow-50 border-yellow-100">
                        <Shield className="w-4 h-4 text-yellow-600" />
                        <div>
                          <p className="font-medium">HIPAA</p>
                          <p className="text-xs text-gray-600">In Progress</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-gray-50">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium">SOC 2</p>
                          <p className="text-xs text-gray-600">Not Configured</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Access Control</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-xs text-gray-500">Required for all admin users</p>
                        </div>
                        <Switch id="two-factor" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="session-timeout">Session Timeout</Label>
                          <p className="text-xs text-gray-500">Automatically log out after inactivity</p>
                        </div>
                        <select className="h-9 px-3 py-1 border rounded-md">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Update Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlatformSettings;
