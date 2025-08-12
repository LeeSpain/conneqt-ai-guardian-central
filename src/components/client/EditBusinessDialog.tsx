import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BusinessDetails } from "@/types/client";

type EditBusinessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: BusinessDetails;
  onSave: (details: BusinessDetails) => void;
};

export const EditBusinessDialog: React.FC<EditBusinessDialogProps> = ({ open, onOpenChange, initial, onSave }) => {
  const [businessName, setBusinessName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (open) {
      setBusinessName(initial?.businessName ?? "");
      setRegistrationNumber(initial?.registrationNumber ?? "");
      setPhoneNumbers((initial?.phoneNumbers ?? []).join(", "));
      setAddress(initial?.address ?? "");
    }
  }, [open, initial]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const details: BusinessDetails = {
      businessName: businessName.trim(),
      registrationNumber: registrationNumber.trim() || undefined,
      phoneNumbers: phoneNumbers
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      address: address.trim() || undefined,
    };
    onSave(details);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Business Profile</DialogTitle>
          <DialogDescription>
            Keep your business information current for smoother support and billing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number (optional)</Label>
            <Input id="registrationNumber" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumbers">Contact Numbers</Label>
            <Input id="phoneNumbers" placeholder="e.g., +1 555-111-2222, +1 555-333-4444" value={phoneNumbers} onChange={(e) => setPhoneNumbers(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address (optional)</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
