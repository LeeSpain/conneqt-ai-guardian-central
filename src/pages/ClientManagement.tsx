import { useState } from 'react';
import { Client, Ticket } from '@/types/client';
import { ConnectBusinessDialog } from '@/components/client/ConnectBusinessDialog';
import { BusinessDetails } from '@/components/client/BusinessDetails';
import { ClientList } from '@/components/client/ClientList';
import { TicketList } from '@/components/client/TicketList';
import { ClientContactInfo } from '@/components/client/ClientContactInfo';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { LockIcon, Users, Check, Settings } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

// Mock data for clients
const mockClients: Client[] = [
  {
    id: 1,
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    status: "Active",
    lastContact: "Today",
    tickets: 3,
    businessDetails: {
      businessName: "Acme Corporation",
      registrationNumber: "ACM123456",
      phoneNumbers: ["+1234567890"],
    },
  },
  { id: 2, name: "Globex Inc", email: "info@globex.com", status: "Active", lastContact: "Yesterday", tickets: 1 },
  { id: 3, name: "Initech", email: "support@initech.com", status: "Inactive", lastContact: "3 days ago", tickets: 0 },
  { id: 4, name: "Massive Dynamic", email: "hello@massivedynamic.com", status: "Active", lastContact: "1 week ago", tickets: 2 },
  { id: 5, name: "Umbrella Corp", email: "contact@umbrella.com", status: "Pending", lastContact: "2 weeks ago", tickets: 5 },
];

// Mock tickets data
const mockTickets: Ticket[] = [
  { id: 101, clientId: 1, subject: "Account access issue", status: "Open", priority: "High", created: "2 hours ago" },
  { id: 102, clientId: 1, subject: "Billing inquiry", status: "In Progress", priority: "Medium", created: "1 day ago" },
  { id: 103, clientId: 1, subject: "Feature request", status: "Closed", priority: "Low", created: "1 week ago" },
  { id: 104, clientId: 2, subject: "Integration problem", status: "Open", priority: "Medium", created: "3 days ago" },
  { id: 105, clientId: 4, subject: "Data migration help", status: "In Progress", priority: "High", created: "2 days ago" },
  { id: 106, clientId: 4, subject: "API documentation", status: "Closed", priority: "Low", created: "2 weeks ago" },
  { id: 107, clientId: 5, subject: "Onboarding assistance", status: "Open", priority: "High", created: "1 day ago" },
  { id: 108, clientId: 5, subject: "Security concern", status: "Open", priority: "Critical", created: "4 hours ago" },
  { id: 109, clientId: 5, subject: "Performance issue", status: "In Progress", priority: "Medium", created: "5 days ago" },
  { id: 110, clientId: 5, subject: "Feature enhancement", status: "Open", priority: "Low", created: "1 week ago" },
  { id: 111, clientId: 5, subject: "Bug report", status: "Closed", priority: "Medium", created: "2 weeks ago" },
];

const ClientManagement = () => {
  const { toast } = useToast();
  
  // State management
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClientData, setNewClientData] = useState({ name: '', email: '' });
  const [subscriptionTier, setSubscriptionTier] = useState<'starter' | 'professional' | 'enterprise'>('starter');
  const [isConnectBusinessOpen, setIsConnectBusinessOpen] = useState(false);
  
  // Event handlers
  const changeSubscriptionTier = (tier: 'starter' | 'professional' | 'enterprise') => {
    setSubscriptionTier(tier);
    toast({
      title: "Subscription Changed",
      description: `You are now viewing the ${tier} dashboard experience.`,
    });
  };

  const handleAddClient = () => {
    if (!newClientData.name || !newClientData.email) {
      toast({
        title: "Validation Error",
        description: "Please provide both name and email for the new client.",
        variant: "destructive",
      });
      return;
    }

    const newClient: Client = {
      id: clients.length + 1,
      name: newClientData.name,
      email: newClientData.email,
      status: "Active",
      lastContact: "Just now",
      tickets: 0
    };

    setClients([...clients, newClient]);
    setNewClientData({ name: '', email: '' });
    
    toast({
      title: "Client Added",
      description: `${newClientData.name} has been added successfully.`,
    });
  };

  const handleDeleteClient = (clientId: number) => {
    // In a real app, you'd want a confirmation dialog here
    setClients(clients.filter(client => client.id !== clientId));
    
    // Also remove associated tickets
    setTickets(tickets.filter(ticket => ticket.clientId !== clientId));
    
    toast({
      title: "Client Deleted",
      description: "The client has been removed from your account.",
    });
  };

  const handleAddTicket = (clientId: number, subject: string, priority: Ticket['priority']) => {
    const newTicket: Ticket = {
      id: tickets.length + 1,
      clientId,
      subject,
      status: "Open",
      priority,
      created: "Just now"
    };

    setTickets([...tickets, newTicket]);
    
    // Update ticket count for the client
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, tickets: client.tickets + 1 } : client
    ));
    
    toast({
      title: "Ticket Created",
      description: `New ${priority} priority ticket created.`,
    });
  };

  const handleConnectBusiness = (businessDetails: {
    businessName: string;
    registrationNumber: string;
    phoneNumbers: string[];
  }) => {
    if (selectedClient) {
      // Update the selected client with business details
      const updatedClients = clients.map(client => 
        client.id === selectedClient.id 
          ? { 
              ...client, 
              businessDetails: {
                businessName: businessDetails.businessName,
                registrationNumber: businessDetails.registrationNumber,
                phoneNumbers: businessDetails.phoneNumbers,
              }
            } 
          : client
      );
      
      setClients(updatedClients);
      setSelectedClient(null);
      
      toast({
        title: "Business Connected",
        description: `Successfully connected ${businessDetails.businessName} to ${selectedClient.name}.`,
      });
    } else {
      // In a real app, this would be connected to your backend
      toast({
        title: "Business Connected",
        description: `Successfully connected ${businessDetails.businessName} to the platform.`,
      });
    }
    
    setIsConnectBusinessOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Tabs defaultValue="clients" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:w-auto mb-8">
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="automation" disabled={subscriptionTier === 'starter'}>
                {subscriptionTier === 'starter' ? (
                  <>
                    <LockIcon className="h-4 w-4 mr-1" /> Automation
                  </>
                ) : 'Automation'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Clients</CardTitle>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Client</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Client</DialogTitle>
                          <DialogDescription>
                            Create a new client account to manage their services.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="client-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Client Name
                            </label>
                            <Input 
                              id="client-name" 
                              placeholder="Enter client company name" 
                              value={newClientData.name}
                              onChange={(e) => setNewClientData({...newClientData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="client-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Contact Email
                            </label>
                            <Input 
                              id="client-email" 
                              type="email" 
                              placeholder="contact@company.com"
                              value={newClientData.email}
                              onChange={(e) => setNewClientData({...newClientData, email: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" type="button" onClick={() => setNewClientData({ name: '', email: '' })}>
                            Cancel
                          </Button>
                          <Button type="submit" onClick={handleAddClient}>
                            Add Client
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <ClientList
                    clients={clients}
                    subscriptionTier={subscriptionTier}
                    onViewDetails={setSelectedClient}
                    onDeleteClient={handleDeleteClient}
                    onAddTicket={(clientId) => handleAddTicket(clientId, "New Support Request", "Low")}
                    onConnectBusiness={(client) => {
                      setSelectedClient(client);
                      setIsConnectBusinessOpen(true);
                    }}
                  />
                </CardContent>
              </Card>

              {selectedClient && (
                <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{selectedClient.name}</DialogTitle>
                      <DialogDescription>
                        Client ID: #{selectedClient.id} • {selectedClient.email}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="tickets">Tickets</TabsTrigger>
                        {subscriptionTier !== 'starter' && (
                          <TabsTrigger value="history">History</TabsTrigger>
                        )}
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ClientContactInfo client={selectedClient} />
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Tickets Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Total Tickets:</span>
                                  <span>{selectedClient.tickets}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Open Tickets:</span>
                                  <span>
                                    {tickets.filter(t => t.clientId === selectedClient.id && t.status === 'Open').length}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">In Progress:</span>
                                  <span>
                                    {tickets.filter(t => t.clientId === selectedClient.id && t.status === 'In Progress').length}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {selectedClient.businessDetails && (
                            <Card className="md:col-span-2">
                              <CardHeader className="pb-2">
                                <BusinessDetails details={selectedClient.businessDetails} />
                              </CardHeader>
                            </Card>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tickets" className="space-y-4 pt-4">
                        <TicketList tickets={tickets.filter(ticket => ticket.clientId === selectedClient.id)} />
                      </TabsContent>
                      
                      {subscriptionTier !== 'starter' && (
                        <TabsContent value="history" className="space-y-4 pt-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm font-medium">Interaction History</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <div className="space-y-4">
                                <div className="flex gap-4 border-b pb-4">
                                  <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <Users className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Account Created</p>
                                    <p className="text-muted-foreground">Client was added to the system</p>
                                    <p className="text-xs text-muted-foreground mt-1">3 months ago</p>
                                  </div>
                                </div>
                                <div className="flex gap-4 border-b pb-4">
                                  <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">First Ticket Resolved</p>
                                    <p className="text-muted-foreground">Billing inquiry was answered and resolved</p>
                                    <p className="text-xs text-muted-foreground mt-1">2 months ago</p>
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="bg-amber-100 text-amber-800 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <Settings className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Service Configuration</p>
                                    <p className="text-muted-foreground">Updated client's service settings</p>
                                    <p className="text-xs text-muted-foreground mt-1">2 weeks ago</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      )}
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <ConnectBusinessDialog
        open={isConnectBusinessOpen}
        onClose={() => setIsConnectBusinessOpen(false)}
        onConnect={handleConnectBusiness}
      />
    </DashboardLayout>
  );
};

export default ClientManagement;
