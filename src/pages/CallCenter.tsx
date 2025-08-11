import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, Phone, PhoneOff } from "lucide-react";
import { AdminContainer } from "@/components/layouts/AdminContainer";

const CallCenter = () => {
  const [isInCall, setIsInCall] = useState(false);

  const toggleCall = () => {
    setIsInCall(!isInCall);
    // TODO: Implement actual call functionality
  };

  return (
    <DashboardLayout>
      <AdminContainer>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Call Center</h1>
          <p className="text-muted-foreground">Connect your telephony provider to enable calling.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Call Center disabled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Demo controls and sample calls have been removed. Integrate your provider to activate this module.</p>
          </CardContent>
        </Card>
      </AdminContainer>
    </DashboardLayout>
  );
};

export default CallCenter;
