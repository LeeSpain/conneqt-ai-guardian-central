
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Minus } from "lucide-react";

const PlansComparison = () => {
  const features = [
    {
      feature: "Number of Users",
      starter: "1 user",
      professional: "Up to 3 users",
      enterprise: "Up to 10 users"
    },
    {
      feature: "Support Level",
      starter: "Basic support",
      professional: "Priority support",
      enterprise: "24/7 Dedicated support"
    },
    {
      feature: "AI Features",
      starter: "Basic AI insights",
      professional: "Advanced AI analytics",
      enterprise: "Custom AI solutions"
    },
    {
      feature: "Integration Options",
      starter: "Limited",
      professional: true,
      enterprise: true
    },
    {
      feature: "Custom Branding",
      starter: false,
      professional: true,
      enterprise: true
    },
    {
      feature: "API Access",
      starter: false,
      professional: "Limited endpoints",
      enterprise: "Full access"
    }
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-green-500 mx-auto" />
      ) : (
        <Minus className="h-4 w-4 text-gray-300 mx-auto" />
      );
    }
    return value;
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[300px]">Feature</TableHead>
            <TableHead className="text-center">Starter</TableHead>
            <TableHead className="text-center">Professional</TableHead>
            <TableHead className="text-center">Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((item) => (
            <TableRow key={item.feature} className="hover:bg-gray-50">
              <TableCell className="font-medium">{item.feature}</TableCell>
              <TableCell className="text-center">{renderValue(item.starter)}</TableCell>
              <TableCell className="text-center">{renderValue(item.professional)}</TableCell>
              <TableCell className="text-center">{renderValue(item.enterprise)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlansComparison;
