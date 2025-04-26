
export type BusinessDetails = {
  businessName: string;
  registrationNumber?: string;
  phoneNumbers: string[];
  address?: string;
};

export type Client = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  lastContact: string;
  tickets: number;
  businessDetails?: BusinessDetails;
};

export type Ticket = {
  id: number;
  clientId: number;
  subject: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  created: string;
};
