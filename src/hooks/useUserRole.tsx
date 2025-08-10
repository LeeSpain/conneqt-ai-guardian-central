import { UserRole } from '@/types/team';
import { useUser } from '@/contexts/UserContext';

export const useUserRole = () => {
  const { currentUser, hasPermission } = useUser();

  const isOwner = currentUser?.role === 'Owner';
  const isManager = currentUser?.role === 'Manager';
  const isStaff = currentUser?.role === 'Staff';
  const isViewer = currentUser?.role === 'Viewer';

  const canAccessFeature = (feature: 'clients' | 'reports' | 'team' | 'settings' | 'agents') => {
    switch (feature) {
      case 'clients':
        return hasPermission('canViewClients');
      case 'reports':
        return hasPermission('canViewReports');
      case 'team':
        return hasPermission('canManageTeam');
      case 'settings':
        return hasPermission('canViewSettings');
      case 'agents':
        return hasPermission('canViewAgents');
      default:
        return false;
    }
  };

  const getRestrictedMessage = (feature: string) => {
    return `You don't have permission to access ${feature}. Contact your administrator for access.`;
  };

  return {
    currentUser,
    hasPermission,
    isOwner,
    isManager,
    isStaff,
    isViewer,
    canAccessFeature,
    getRestrictedMessage,
  };
};