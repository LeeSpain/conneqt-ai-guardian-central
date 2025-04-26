
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/types/client";

type ClientContactInfoProps = {
  client: Client;
};

export const ClientContactInfo = ({ client }: ClientContactInfoProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span>{client.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
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
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Contact:</span>
            <span>{client.lastContact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
