import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { AddTeamMemberDialog } from "@/components/team/AddTeamMemberDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, Users, Shield, Clock, Lock } from "lucide-react";
import { TeamMember } from "@/types/team";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { useUserRole } from "@/hooks/useUserRole";

// Mock team data
const mockTeamMembers: TeamMember[] = [
  {
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
      canViewAgents: true,
      canManageAgents: true,
      canOperateAgents: true,
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Manager",
    status: "Active",
    joinedDate: "2024-01-20",
    lastActive: "2024-01-31 13:45",
    permissions: {
      canViewClients: true,
      canEditClients: true,
      canDeleteClients: false,
      canViewReports: true,
      canManageTeam: true,
      canViewSettings: true,
      canEditSettings: false,
      canViewAgents: true,
      canManageAgents: true,
      canOperateAgents: true,
    },
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike@company.com",
    role: "Staff",
    status: "Active",
    joinedDate: "2024-01-25",
    lastActive: "2024-01-31 12:15",
    permissions: {
      canViewClients: true,
      canEditClients: true,
      canDeleteClients: false,
      canViewReports: false,
      canManageTeam: false,
      canViewSettings: false,
      canEditSettings: false,
      canViewAgents: true,
      canManageAgents: false,
      canOperateAgents: false,
    },
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@company.com",
    role: "Viewer",
    status: "Pending",
    joinedDate: "2024-01-30",
    lastActive: "-",
    permissions: {
      canViewClients: true,
      canEditClients: false,
      canDeleteClients: false,
      canViewReports: false,
      canManageTeam: false,
      canViewSettings: false,
      canEditSettings: false,
      canViewAgents: false,
      canManageAgents: false,
      canOperateAgents: false,
    },
  },
];

const TeamManagementContent = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { canAccessFeature, getRestrictedMessage } = useUserRole();

  const canManageTeam = canAccessFeature('team');

  const handleAddTeamMember = (newMember: Omit<TeamMember, "id">) => {
    const member: TeamMember = {
      ...newMember,
      id: Math.max(...teamMembers.map(m => m.id)) + 1,
    };
    setTeamMembers([...teamMembers, member]);
  };

  const handleRemoveTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleUpdateTeamMember = (id: number, updates: Partial<TeamMember>) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const activeMembers = teamMembers.filter(m => m.status === "Active").length;
  const pendingMembers = teamMembers.filter(m => m.status === "Pending").length;

  if (!canManageTeam) {
    return (
      <div className="p-6 space-y-6">
        <DashboardHeader />
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            {getRestrictedMessage('team management')}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members, roles, and permissions
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Team Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold text-foreground">{teamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold text-foreground">{activeMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Invites</p>
                <p className="text-2xl font-bold text-foreground">{pendingMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onRemove={handleRemoveTeamMember}
                onUpdate={handleUpdateTeamMember}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <AddTeamMemberDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddTeamMember}
      />
    </div>
  );
};

export default function TeamManagement() {
  return (
    <UserProvider>
      <DashboardLayout>
        <TeamManagementContent />
      </DashboardLayout>
    </UserProvider>
  );
}