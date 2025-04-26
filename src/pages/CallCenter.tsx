
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, Phone, PhoneOff } from "lucide-react";

const CallCenter = () => {
  const [isInCall, setIsInCall] = useState(false);

  const toggleCall = () => {
    setIsInCall(!isInCall);
    // TODO: Implement actual call functionality
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Call Center</h1>
            <Button
              variant={isInCall ? "destructive" : "default"}
              onClick={toggleCall}
              className="flex items-center gap-2"
            >
              {isInCall ? <PhoneOff className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
              {isInCall ? "End Call" : "Start Call"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Active Call</CardTitle>
                </CardHeader>
                <CardContent>
                  {isInCall ? (
                    <div className="text-center">
                      <div className="text-xl font-semibold mb-2">Call in progress</div>
                      <div className="text-gray-500">00:00:00</div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      No active call
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <div className="font-medium">Client {i}</div>
                          <div className="text-sm text-gray-500">2 hours ago</div>
                        </div>
                        <PhoneCall className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default CallCenter;
