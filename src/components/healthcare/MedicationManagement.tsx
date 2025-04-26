
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pill, AlertCircle, Clock, CalendarCheck } from 'lucide-react';

export const MedicationManagement = () => {
  const medicationStats = {
    dispensingAccuracy: "98.5%",
    verificationRate: "99.2%",
    pendingVerifications: 12,
    nextRefills: 8
  };

  const medicationSchedules = [
    { patient: "John D.", medication: "Metformin", schedule: "8:00 AM", status: "Dispensed" },
    { patient: "Sarah M.", medication: "Insulin", schedule: "7:30 AM", status: "Pending" },
    { patient: "Robert K.", medication: "Lisinopril", schedule: "9:00 AM", status: "Delayed" },
  ];

  return (
    <div className="space-y-6">
      {/* Dispensing Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Dispensing Accuracy</p>
                <h3 className="text-2xl font-bold mt-2">{medicationStats.dispensingAccuracy}</h3>
              </div>
              <Pill className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">AI Verification Rate</p>
                <h3 className="text-2xl font-bold mt-2">{medicationStats.verificationRate}</h3>
              </div>
              <AlertCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Verifications</p>
                <h3 className="text-2xl font-bold mt-2">{medicationStats.pendingVerifications}</h3>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medication Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarCheck className="w-5 h-5" />
            Active Medication Schedules
          </CardTitle>
          <CardDescription>Real-time medication dispensing status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicationSchedules.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>{schedule.patient}</TableCell>
                  <TableCell>{schedule.medication}</TableCell>
                  <TableCell>{schedule.schedule}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      schedule.status === 'Dispensed' ? 'bg-green-100 text-green-800' :
                      schedule.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {schedule.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
