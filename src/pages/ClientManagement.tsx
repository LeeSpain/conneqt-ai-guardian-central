import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  FileText, 
  Settings, 
  Trash, 
  PenLine, 
  Filter, 
  Check, 
  X, 
  ArrowUpDown,
  Database,
  Plus
} from 'lucide-react';

// Type definitions
type Client = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  lastContact: string;
  tickets: number;
};

type Ticket = {
  id: number;
  clientId: number;
  subject: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  created: string;
};

// Mock data for clients
const mockClients: Client[] = [
  { id: 1, name: "Acme Corp", email: "contact@acmecorp.com", status: "Active", lastContact: "Today", tickets: 3 },
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
  useScrollToTop();
  const { toast } = useToast();
  
  // State for clients and tickets
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClientData, setNewClientData] = useState({ name: '', email: '' });
  
  // Simulating a subscription tier - in a real app, this would come from auth context or API
  const [subscriptionTier, setSubscriptionTier] = useState<'starter' | 'professional' | 'enterprise'>('starter');
  
  // Function to change subscription tier (for demo purposes)
  const changeSubscriptionTier = (tier: 'starter' | 'professional' | 'enterprise') => {
    setSubscriptionTier(tier);
    toast({
      title: "Subscription Changed",
      description: `You are now viewing the ${tier} dashboard experience.`,
    });
  };

  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get client's tickets
  const getClientTickets = (clientId: number) => {
    return tickets.filter(ticket => ticket.clientId === clientId);
  };

  // Handle adding a new client
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

  // Handle deleting a client
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

  // Handle adding a new ticket
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Current Plan: <span className="font-medium text-conneqt-blue">
                    {subscriptionTier === 'starter' && 'Starter'}
                    {subscriptionTier === 'professional' && 'Professional'}
                    {subscriptionTier === 'enterprise' && 'Enterprise'}
                  </span>
                </p>
              </div>
              
              {/* Demo buttons to change subscription tier */}
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button 
                  variant={subscriptionTier === 'starter' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => changeSubscriptionTier('starter')}
                >
                  Starter View
                </Button>
                <Button 
                  variant={subscriptionTier === 'professional' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => changeSubscriptionTier('professional')}
                >
                  Professional View
                </Button>
                <Button 
                  variant={subscriptionTier === 'enterprise' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => changeSubscriptionTier('enterprise')}
                >
                  Enterprise View
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Client Management Tabs */}
          <Tabs defaultValue="clients" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:w-auto mb-8">
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="automation" disabled={subscriptionTier === 'starter'}>
                {subscriptionTier === 'starter' ? '🔒 Automation' : 'Automation'}
              </TabsTrigger>
            </TabsList>
            
            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Your Clients</CardTitle>
                    <CardDescription>
                      Manage all your client accounts in one place
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Client
                      </Button>
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
                          <Label htmlFor="client-name">Client Name</Label>
                          <Input 
                            id="client-name" 
                            placeholder="Enter client company name" 
                            value={newClientData.name}
                            onChange={(e) => setNewClientData({...newClientData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client-email">Contact Email</Label>
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
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search clients..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hidden md:flex">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      {subscriptionTier !== 'starter' && (
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <FileText className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">
                            <div className="flex items-center space-x-2">
                              <span>Client</span>
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Email</TableHead>
                          <TableHead className="hidden md:table-cell">Last Contact</TableHead>
                          <TableHead>Tickets</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClients.length > 0 ? (
                          filteredClients.map((client) => (
                            <TableRow key={client.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-conneqt-blue text-white">
                                      {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  {client.name}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    client.status === 'Active' ? 'default' : 
                                    client.status === 'Pending' ? 'outline' : 'secondary'
                                  }
                                  className={
                                    client.status === 'Active' ? 'bg-green-500' : 
                                    client.status === 'Pending' ? 'border-orange-400 text-orange-500' : ''
                                  }
                                >
                                  {client.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                              <TableCell className="hidden md:table-cell">{client.lastContact}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-mono">
                                  {client.tickets}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem 
                                      onClick={() => setSelectedClient(client)}
                                      className="cursor-pointer"
                                    >
                                      <FileText className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    {subscriptionTier !== 'starter' && (
                                      <>
                                        <DropdownMenuItem className="cursor-pointer">
                                          <PenLine className="mr-2 h-4 w-4" />
                                          Edit Client
                                        </DropdownMenuItem>
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <DropdownMenuItem
                                              onSelect={(e) => e.preventDefault()}
                                              className="cursor-pointer"
                                            >
                                              <UserPlus className="mr-2 h-4 w-4" />
                                              Add Ticket
                                            </DropdownMenuItem>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Create New Ticket</DialogTitle>
                                              <DialogDescription>
                                                Create a support ticket for {client.name}
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                              <div className="space-y-2">
                                                <Label htmlFor="ticket-subject">Subject</Label>
                                                <Input id="ticket-subject" placeholder="Brief description of the issue" />
                                              </div>
                                              <div className="space-y-2">
                                                <Label>Priority</Label>
                                                <div className="flex space-x-2">
                                                  <Button 
                                                    type="button" 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleAddTicket(client.id, "New Support Request", "Low")}
                                                  >
                                                    Low
                                                  </Button>
                                                  <Button 
                                                    type="button" 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleAddTicket(client.id, "New Support Request", "Medium")}
                                                  >
                                                    Medium
                                                  </Button>
                                                  <Button 
                                                    type="button" 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleAddTicket(client.id, "New Support Request", "High")}
                                                  >
                                                    High
                                                  </Button>
                                                  <Button 
                                                    type="button" 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => handleAddTicket(client.id, "New Support Request", "Critical")}
                                                  >
                                                    Critical
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          </DialogContent>
                                        </Dialog>
                                      </>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handleDeleteClient(client.id)}
                                      className="text-red-600 cursor-pointer"
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete Client
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No clients found. Try adjusting your search or add a new client.
                            </TableCell>
                          </TableRow>
                        )}
                        
                        {/* Client limit notification based on tier */}
                        {subscriptionTier === 'starter' && clients.length >= 5 && (
                          <TableRow>
                            <TableCell colSpan={6} className="bg-amber-50">
                              <p className="text-amber-800 text-sm py-2 text-center">
                                You've reached the client limit for the Starter plan. 
                                <Button 
                                  variant="link" 
                                  className="text-conneqt-blue px-1" 
                                  onClick={() => window.location.href = '/subscriptions'}
                                >
                                  Upgrade your plan
                                </Button>
                                to add more clients.
                              </p>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Client Details Dialog */}
              {selectedClient && (
                <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-conneqt-blue text-white">
                            {selectedClient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {selectedClient.name}
                      </DialogTitle>
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
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Email:</span>
                                  <span>{selectedClient.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <Badge 
                                    variant={
                                      selectedClient.status === 'Active' ? 'default' : 
                                      selectedClient.status === 'Pending' ? 'outline' : 'secondary'
                                    }
                                    className={
                                      selectedClient.status === 'Active' ? 'bg-green-500' : 
                                      selectedClient.status === 'Pending' ? 'border-orange-400 text-orange-500' : ''
                                    }
                                  >
                                    {selectedClient.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Last Contact:</span>
                                  <span>{selectedClient.lastContact}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
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
                                  <span>{getClientTickets(selectedClient.id).filter(t => t.status === 'Open').length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">In Progress:</span>
                                  <span>{getClientTickets(selectedClient.id).filter(t => t.status === 'In Progress').length}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {subscriptionTier === 'enterprise' && (
                            <>
                              <Card className="md:col-span-2">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-muted-foreground">
                                    This client has been active for 3 months. They typically respond within 2 hours during business days.
                                    Most common issues are related to account access and billing questions.
                                    Based on recent interactions, satisfaction score is estimated at 92%.
                                  </p>
                                </CardContent>
                              </Card>
                            </>
                          )}
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setSelectedClient(null)}>
                            Close
                          </Button>
                          {subscriptionTier !== 'starter' && (
                            <Button>
                              <PenLine className="mr-2 h-4 w-4" />
                              Edit Client
                            </Button>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tickets" className="space-y-4 pt-4">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Created</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {getClientTickets(selectedClient.id).length > 0 ? (
                                getClientTickets(selectedClient.id).map((ticket) => (
                                  <TableRow key={ticket.id}>
                                    <TableCell>#{ticket.id}</TableCell>
                                    <TableCell>{ticket.subject}</TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant={
                                          ticket.status === 'Open' ? 'default' : 
                                          ticket.status === 'In Progress' ? 'outline' : 'secondary'
                                        }
                                        className={
                                          ticket.status === 'Open' ? 'bg-blue-500' : 
                                          ticket.status === 'In Progress' ? 'border-orange-400 text-orange-500' : ''
                                        }
                                      >
                                        {ticket.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant="outline"
                                        className={
                                          ticket.priority === 'Low' ? 'border-green-400 text-green-600' :
                                          ticket.priority === 'Medium' ? 'border-blue-400 text-blue-600' :
                                          ticket.priority === 'High' ? 'border-orange-400 text-orange-600' :
                                          'border-red-500 text-red-600'
                                        }
                                      >
                                        {ticket.priority}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{ticket.created}</TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                    No tickets found for this client.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
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
              
              {/* Quick Actions for Professional & Enterprise */}
              {subscriptionTier !== 'starter' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and automated workflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                        <UserPlus className="h-6 w-6 mb-2" />
                        <span>Bulk Import</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                        <FileText className="h-6 w-6 mb-2" />
                        <span>Generate Report</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto flex flex-col items-center justify-center py-4"
                        disabled={subscriptionTier !== 'enterprise'}
                      >
                        <Database className="h-6 w-6 mb-2" />
                        <span>Sync Data</span>
                        {subscriptionTier !== 'enterprise' && (
                          <span className="text-xs mt-1 text-muted-foreground">Enterprise only</span>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto flex flex-col items-center justify-center py-4"
                        disabled={subscriptionTier !== 'enterprise'}
                      >
                        <Settings className="h-6 w-6 mb-2" />
                        <span>Automation</span>
                        {subscriptionTier !== 'enterprise' && (
                          <span className="text-xs mt-1 text-muted-foreground">Enterprise only</span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Tickets Tab */}
            <TabsContent value="tickets" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>All Tickets</CardTitle>
                    <CardDescription>
                      Manage support tickets across all clients
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button>New Ticket</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead className="hidden md:table-cell">Subject</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Priority</TableHead>
                          <TableHead className="hidden md:table-cell">Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tickets.map((ticket) => {
                          const client = clients.find(c => c.id === ticket.clientId);
