import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TeamMember, UserRole } from "@/types/team";

interface AddTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (member: Omit<TeamMember, "id">) => void;
}

export const AddTeamMemberDialog = ({ open, onOpenChange, onAdd }: AddTeamMemberDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff" as UserRole,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: Omit<TeamMember, "id"> = {
      ...formData,
      status: "Pending",
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: "-",
      permissions: rolePermissions[formData.role],
    };

    onAdd(newMember);
    setFormData({ name: "", email: "", role: "Staff" });
    onOpenChange(false);
  };

  const currentPermissions = rolePermissions[formData.role];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Invite a new team member to join your organization
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Role Permissions Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Role Permissions</CardTitle>
              <CardDescription>
                {formData.role} role will have the following permissions:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={currentPermissions.canViewClients} disabled />
                  <span className={currentPermissions.canViewClients ? "text-foreground" : "text-muted-foreground"}>
                    View Clients
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={currentPermissions.canEditClients} disabled />
                  <span className={currentPermissions.canEditClients ? "text-foreground" : "text-muted-foreground"}>
                    Edit Clients
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={currentPermissions.canDeleteClients} disabled />
                  <span className={currentPermissions.canDeleteClients ? "text-foreground" : "text-muted-foreground"}>
                    Delete Clients
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={currentPermissions.canViewReports} disabled />
                  <span className={currentPermissions.canViewReports ? "text-foreground" : "text-muted-foreground"}>
                    View Reports
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={currentPermissions.canManageTeam} disabled />
                  <span className={currentPermissions.canManageTeam ? "text-foreground" : "text-muted-foreground"}>
                    Manage Team
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={currentPermissions.canEditSettings} disabled />
                  <span className={currentPermissions.canEditSettings ? "text-foreground" : "text-muted-foreground"}>
                    Edit Settings
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};