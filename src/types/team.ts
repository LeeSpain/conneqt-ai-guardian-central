export type UserRole = "Owner" | "Manager" | "Staff" | "Viewer";

export type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
  lastActive: string;
  permissions: {
    canViewClients: boolean;
    canEditClients: boolean;
    canDeleteClients: boolean;
    canViewReports: boolean;
    canManageTeam: boolean;
    canViewSettings: boolean;
    canEditSettings: boolean;
  };
};