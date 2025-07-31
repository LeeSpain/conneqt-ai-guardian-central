import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Mail, Calendar, Clock, Shield, Trash2 } from "lucide-react";
import { TeamMember, UserRole } from "@/types/team";

interface TeamMemberCardProps {
  member: TeamMember;
  onRemove: (id: number) => void;
  onUpdate: (id: number, updates: Partial<TeamMember>) => void;
}

export const TeamMemberCard = ({ member, onRemove, onUpdate }: TeamMemberCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "Owner": return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";
      case "Manager": return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
      case "Staff": return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300";
      case "Viewer": return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300";
      case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      case "Pending": return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300";
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    // Update permissions based on role
    const rolePermissions = {
      Owner: {
        canViewClients: true,
        canEditClients: true,
        canDeleteClients: true,
        canViewReports: true,
        canManageTeam: true,
        canViewSettings: true,
        canEditSettings: true,
      },
      Manager: {
        canViewClients: true,
        canEditClients: true,
        canDeleteClients: false,
        canViewReports: true,
        canManageTeam: true,
        canViewSettings: true,
        canEditSettings: false,
      },
      Staff: {
        canViewClients: true,
        canEditClients: true,
        canDeleteClients: false,
        canViewReports: false,
        canManageTeam: false,
        canViewSettings: false,
        canEditSettings: false,
      },
      Viewer: {
        canViewClients: true,
        canEditClients: false,
        canDeleteClients: false,
        canViewReports: false,
        canManageTeam: false,
        canViewSettings: false,
        canEditSettings: false,
      },
    };

    onUpdate(member.id, {
      role: newRole,
      permissions: rolePermissions[newRole],
    });
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <Badge className={getRoleColor(member.role)}>
                  {member.role}
                </Badge>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(member.joinedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Last active: {member.lastActive}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Select value={member.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Done
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Shield className="w-4 h-4 mr-2" />
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onRemove(member.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};