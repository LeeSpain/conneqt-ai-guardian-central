
import { useState } from "react";
import { Client } from "@/types/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserRole } from "@/hooks/useUserRole";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  FileText,
  Database,
  MoreVertical,
  PenLine,
  UserPlus,
  Trash,
} from "lucide-react";

type ClientListProps = {
  clients: Client[];
  subscriptionTier: string;
  onViewDetails: (client: Client) => void;
  onDeleteClient: (id: number) => void;
  onAddTicket: (clientId: number) => void;
  onConnectBusiness: (client: Client) => void;
};

export const ClientList = ({
  clients,
  subscriptionTier,
  onViewDetails,
  onDeleteClient,
  onAddTicket,
  onConnectBusiness,
}: ClientListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { hasPermission } = useUserRole();

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Database className="mr-2 h-4 w-4" />
            Connect Business
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Client</TableHead>
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
                        <DropdownMenuItem onClick={() => onViewDetails(client)} className="cursor-pointer">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {subscriptionTier !== 'starter' && (
                          <>
                            <DropdownMenuItem className="cursor-pointer">
                              <PenLine className="mr-2 h-4 w-4" />
                              Edit Client
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAddTicket(client.id)} className="cursor-pointer">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Add Ticket
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onConnectBusiness(client)} className="cursor-pointer">
                              <Database className="mr-2 h-4 w-4" />
                              Connect Business
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDeleteClient(client.id)} 
                          className="text-red-600 cursor-pointer"
                          disabled={!hasPermission('canDeleteClients')}
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
