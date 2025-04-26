
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Activity, Heart, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const glucoseData = [
  { time: '6:00', value: 120 },
  { time: '9:00', value: 140 },
  { time: '12:00', value: 115 },
  { time: '15:00', value: 125 },
  { time: '18:00', value: 130 },
  { time: '21:00', value: 110 },
];

export const HealthMonitoring = () => {
  const healthAlerts = [
    { patient: "Maria S.", type: "High Glucose", level: "245 mg/dL", status: "Critical" },
    { patient: "James P.", type: "Low Glucose", level: "65 mg/dL", status: "Warning" },
    { patient: "Lisa M.", type: "Stable", level: "110 mg/dL", status: "Normal" },
  ];

  return (
    <div className="space-y-6">
      {/* Glucose Monitoring Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Glucose Level Trends
          </CardTitle>
          <CardDescription>24-hour glucose monitoring data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Health Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Health Alerts
          </CardTitle>
          <CardDescription>Current patient health status alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Alert Type</TableHead>
                <TableHead>Reading</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthAlerts.map((alert, index) => (
                <TableRow key={index}>
                  <TableCell>{alert.patient}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.level}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.status === 'Critical' ? 'bg-red-100 text-red-800' :
                      alert.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant={alert.status === 'Critical' ? 'destructive' : 'outline'}>
                      Respond
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
