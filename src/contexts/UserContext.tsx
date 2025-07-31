import React, { createContext, useContext, useState } from 'react';
import { UserRole, TeamMember } from '@/types/team';

interface UserContextType {
  currentUser: TeamMember | null;
  setCurrentUser: (user: TeamMember | null) => void;
  hasPermission: (permission: keyof TeamMember['permissions']) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock current user - in real app this would come from auth
const mockCurrentUser: TeamMember = {
  id: 1,
  name: "John Smith",
  email: "john@company.com",
  role: "Owner",
  status: "Active",
  joinedDate: "2024-01-15",
  lastActive: "2024-01-31 14:30",
  permissions: {
    canViewClients: true,
    canEditClients: true,
    canDeleteClients: true,
    canViewReports: true,
    canManageTeam: true,
    canViewSettings: true,
    canEditSettings: true,
  },
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(mockCurrentUser);

  const hasPermission = (permission: keyof TeamMember['permissions']): boolean => {
    return currentUser?.permissions[permission] ?? false;
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};