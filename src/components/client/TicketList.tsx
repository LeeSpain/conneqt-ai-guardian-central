
import { Ticket } from "@/types/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TicketListProps = {
  tickets: Ticket[];
};

export const TicketList = ({ tickets }: TicketListProps) => {
  return (
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
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
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
  );
};
