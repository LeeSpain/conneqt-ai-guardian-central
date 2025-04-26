
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Phone } from "lucide-react";

type ConnectBusinessDialogProps = {
  open: boolean;
  onClose: () => void;
  onConnect: (businessDetails: { 
    businessName: string; 
    registrationNumber: string; 
    phoneNumbers: string[];
  }) => void;
};

export const ConnectBusinessDialog = ({ open, onClose, onConnect }: ConnectBusinessDialogProps) => {
  const [businessDetails, setBusinessDetails] = useState({
    businessName: "",
    registrationNumber: "",
    phoneNumbers: [""],
  });

  const addPhoneNumber = () => {
    setBusinessDetails({
      ...businessDetails,
      phoneNumbers: [...businessDetails.phoneNumbers, ""],
    });
  };

  const updatePhoneNumber = (index: number, value: string) => {
    const newPhoneNumbers = [...businessDetails.phoneNumbers];
    newPhoneNumbers[index] = value;
    setBusinessDetails({
      ...businessDetails,
      phoneNumbers: newPhoneNumbers,
    });
  };

  const handleSubmit = () => {
    onConnect(businessDetails);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Existing Business</DialogTitle>
          <DialogDescription>
            Link your existing business to our platform and manage your clients
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessDetails.businessName}
              onChange={(e) => setBusinessDetails({
                ...businessDetails,
                businessName: e.target.value,
              })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="registrationNumber">Business Registration Number</Label>
            <Input
              id="registrationNumber"
              value={businessDetails.registrationNumber}
              onChange={(e) => setBusinessDetails({
                ...businessDetails,
                registrationNumber: e.target.value,
              })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Phone Numbers</Label>
            {businessDetails.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <Phone className="w-4 h-4 mt-2.5 text-gray-500" />
                <Input
                  value={phone}
                  onChange={(e) => updatePhoneNumber(index, e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={addPhoneNumber}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Phone Number
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Connect Business</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
