import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserProvider } from "@/contexts/UserContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Settings, Shield, Bell, Users, Database, Key } from "lucide-react";
import { AdminContainer } from "@/components/layouts/AdminContainer";

function PlatformSettingsContent() {
  const { toast } = useToast();
  const { canAccessFeature, hasPermission, currentUser } = useUserRole();

  if (!canAccessFeature('settings')) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              You don't have permission to access platform settings. Contact your administrator for access.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your platform settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
        <AdminContainer>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
              <p className="text-muted-foreground">
                Configure your platform preferences and security settings
              </p>
            </div>
            <Button onClick={handleSaveSettings}>
              <Settings className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="users" disabled={!hasPermission('canManageTeam')}>Users</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Basic platform configuration and preferences
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
                      <Input id="timezone" defaultValue="UTC" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input 
                      id="notification-email" 
                      type="email" 
                      defaultValue="admin@conneqtcentral.com" 
                    />
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

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Configure security and authentication settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Authentication</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Require 2FA for all team members
                          </p>
                        </div>
                        <Switch id="two-factor" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="session-timeout">Auto Session Timeout</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out inactive users
                          </p>
                        </div>
                        <Switch id="session-timeout" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Data Protection</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="encryption">End-to-End Encryption</Label>
                          <p className="text-sm text-muted-foreground">
                            Encrypt all data transmissions
                          </p>
                        </div>
                        <Switch id="encryption" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="audit-logs">Audit Logging</Label>
                          <p className="text-sm text-muted-foreground">
                            Log all user activities
                          </p>
                        </div>
                        <Switch id="audit-logs" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-clients">New Client Registrations</Label>
                        <Switch id="new-clients" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ticket-updates">Ticket Updates</Label>
                        <Switch id="ticket-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-alerts">System Alerts</Label>
                        <Switch id="system-alerts" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Push Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="browser-notifications">Browser Notifications</Label>
                        <Switch id="browser-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mobile-notifications">Mobile Notifications</Label>
                        <Switch id="mobile-notifications" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Integrations
                  </CardTitle>
                  <CardDescription>
                    Connect external services and manage API keys
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Connected Services</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <Database className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Supabase</p>
                            <p className="text-sm text-muted-foreground">Database & Authentication</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                            <Key className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">OpenAI API</p>
                            <p className="text-sm text-muted-foreground">AI Language Models</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">Connected</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">API Management</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="api-rate-limiting">API Rate Limiting</Label>
                        <Switch id="api-rate-limiting" defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="api-key">Platform API Key</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="api-key" 
                            type="password" 
                            defaultValue="sk-..." 
                            className="flex-1"
                          />
                          <Button variant="outline">Regenerate</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage team members and their access levels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Current User</h4>
                      <p className="text-sm text-muted-foreground">
                        {currentUser?.name} ({currentUser?.email})
                      </p>
                    </div>
                    <Badge variant="outline">{currentUser?.role}</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Role Permissions</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span>View Clients</span>
                        <Badge variant={hasPermission('canViewClients') ? 'default' : 'secondary'}>
                          {hasPermission('canViewClients') ? 'Allowed' : 'Restricted'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Edit Clients</span>
                        <Badge variant={hasPermission('canEditClients') ? 'default' : 'secondary'}>
                          {hasPermission('canEditClients') ? 'Allowed' : 'Restricted'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Delete Clients</span>
                        <Badge variant={hasPermission('canDeleteClients') ? 'default' : 'secondary'}>
                          {hasPermission('canDeleteClients') ? 'Allowed' : 'Restricted'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>View Reports</span>
                        <Badge variant={hasPermission('canViewReports') ? 'default' : 'secondary'}>
                          {hasPermission('canViewReports') ? 'Allowed' : 'Restricted'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Manage Team</span>
                        <Badge variant={hasPermission('canManageTeam') ? 'default' : 'secondary'}>
                          {hasPermission('canManageTeam') ? 'Allowed' : 'Restricted'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Edit Settings</span>
                        <Badge variant={hasPermission('canEditSettings') ? 'default' : 'secondary'}>
                          {hasPermission('canEditSettings') ? 'Allowed' : 'Restricted'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {hasPermission('canManageTeam') && (
                    <div className="pt-4">
                      <Button className="w-full">
                        <Users className="w-4 h-4 mr-2" />
                        Go to Team Management
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AdminContainer>
    </DashboardLayout>
  );
}

export default function PlatformSettings() {
  return (
    <UserProvider>
      <PlatformSettingsContent />
    </UserProvider>
  );
}