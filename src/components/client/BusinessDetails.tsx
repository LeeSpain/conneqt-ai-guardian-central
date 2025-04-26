
import { Phone } from "lucide-react";
import { BusinessDetails as BusinessDetailsType } from "@/types/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BusinessDetailsProps = {
  details: BusinessDetailsType;
};

export const BusinessDetails = ({ details }: BusinessDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Business Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Business Name:</span>
            <span>{details.businessName}</span>
          </div>
          {details.registrationNumber && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Registration Number:</span>
              <span>{details.registrationNumber}</span>
            </div>
          )}
          <div className="space-y-1">
            <span className="text-muted-foreground">Contact Numbers:</span>
            {details.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-2 justify-end">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{phone}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
