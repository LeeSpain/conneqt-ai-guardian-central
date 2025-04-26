import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart3, 
  Users, 
  AlertCircle, 
  Clock, 
  Activity, 
  CalendarCheck, 
  Pill,  // Changed from Pills to Pill
  Heart,
  PhoneCall,
  Shield,
  Languages,
  Settings,
  ArrowUp,
  ArrowDown,
  Gauge
} from 'lucide-react';

const HealthcareDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for the dashboard
  const healthMetrics = {
    medicationAdherence: 87,
    glucoseLevels: "Normal",
    emergencyResponses: 12,
    customerSatisfaction: 92
  };

  // Alerts data
  const alerts = [
    { id: "MED-4502", type: "Missed Medication", patient: "John D.", time: "10 min ago", priority: "high" },
    { id: "GLU-3201", type: "Glucose Level Alert", patient: "Maria S.", time: "25 min ago", priority: "medium" },
    { id: "SRV-2109", type: "Service Request", patient: "Robert T.", time: "1 hour ago", priority: "low" },
    { id: "EMG-1803", type: "Emergency Call", patient: "Eleanor P.", time: "2 hours ago", priority: "high" },
  ];

  // Upcoming appointments
  const appointments = [
    { patient: "David Wilson", type: "Medication Review", time: "Today, 2:00 PM", status: "confirmed" },
    { patient: "Sarah Johnson", type: "Glucose Monitor Setup", time: "Today, 3:30 PM", status: "confirmed" },
    { patient: "Michael Brown", type: "Emergency Pendant Test", time: "Tomorrow, 10:00 AM", status: "pending" },
    { patient: "Lisa Garcia", type: "Customer Service Follow-up", time: "Tomorrow, 1:15 PM", status: "confirmed" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Healthcare Dashboard</h1>
              <p className="text-gray-500">Comprehensive view of patient care and services</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Add Patient
              </Button>
              <Button className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configure Services
              </Button>
            </div>
          </div>

          {/* Main Tabs Navigation */}
          <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="medication" className="flex items-center gap-2">
                <Pill className="w-4 h-4" />
                <span className="hidden sm:inline">Medication</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Health Monitoring</span>
              </TabsTrigger>
              <TabsTrigger value="service" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span className="hidden sm:inline">Customer Service</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="mt-0">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Medication Adherence</p>
                        <h3 className="text-2xl font-bold mt-2">{healthMetrics.medicationAdherence}%</h3>
                        <p className="text-sm text-green-600 flex items-center mt-2">
                          <ArrowUp className="w-4 h-4 mr-1" /> 5% increase
                        </p>
                      </div>
                      <Pill className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Glucose Levels</p>
                        <h3 className="text-2xl font-bold mt-2">{healthMetrics.glucoseLevels}</h3>
                        <p className="text-sm text-green-600 flex items-center mt-2">
                          <ArrowUp className="w-4 h-4 mr-1" /> Stable
                        </p>
                      </div>
                      <Activity className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Emergency Responses</p>
                        <h3 className="text-2xl font-bold mt-2">{healthMetrics.emergencyResponses}</h3>
                        <p className="text-sm text-red-600 flex items-center mt-2">
                          <ArrowUp className="w-4 h-4 mr-1" /> 2 new today
                        </p>
                      </div>
                      <Shield className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Customer Satisfaction</p>
                        <h3 className="text-2xl font-bold mt-2">{healthMetrics.customerSatisfaction}%</h3>
                        <p className="text-sm text-green-600 flex items-center mt-2">
                          <ArrowUp className="w-4 h-4 mr-1" /> 3% increase
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts and Appointments Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Alerts Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Critical Alerts
                    </CardTitle>
                    <CardDescription>
                      Urgent attention required for these patients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alerts.map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`flex items-center justify-between p-3 rounded-md ${
                            alert.priority === "high" ? "bg-red-50 border-l-4 border-red-500" : 
                            alert.priority === "medium" ? "bg-yellow-50 border-l-4 border-yellow-500" :
                            "bg-blue-50 border-l-4 border-blue-500"
                          }`}
                        >
                          <div>
                            <p className="font-medium">{alert.type}</p>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <span>{alert.patient}</span>
                              <span>•</span>
                              <span>{alert.time}</span>
                            </div>
                          </div>
                          <Button size="sm" variant={alert.priority === "high" ? "destructive" : "outline"}>
                            Respond
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Alerts
                    </Button>
                  </CardContent>
                </Card>

                {/* Appointments Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CalendarCheck className="w-5 h-5 text-blue-500" />
                      Upcoming Appointments
                    </CardTitle>
                    <CardDescription>
                      Today and tomorrow's scheduled appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appointments.map((appointment, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <span>{appointment.type}</span>
                              <span>•</span>
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full 
                            ${appointment.status === "confirmed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Manage Schedule
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Service Status Overview */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Service Status</CardTitle>
                  <CardDescription>Current status of all healthcare services</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Agents</TableHead>
                        <TableHead>Languages</TableHead>
                        <TableHead>Load</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "Medication Management", status: "Operational", agents: "12/15 Active", languages: "EN, ES, NL", load: "Medium" },
                        { name: "Glucose Monitoring", status: "Operational", agents: "8/10 Active", languages: "EN, ES", load: "Low" },
                        { name: "Customer Service", status: "High Volume", agents: "24/25 Active", languages: "EN, ES, NL", load: "High" },
                        { name: "Emergency Response", status: "Operational", agents: "5/5 Active", languages: "EN, ES, NL", load: "Medium" },
                      ].map((service, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              service.status === "Operational" ? "bg-green-100 text-green-800" : 
                              service.status === "High Volume" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-red-100 text-red-800"
                            }`}>
                              {service.status}
                            </span>
                          </TableCell>
                          <TableCell>{service.agents}</TableCell>
                          <TableCell className="flex items-center">
                            <Languages className="w-4 h-4 mr-2" />
                            {service.languages}
                          </TableCell>
                          <TableCell>{service.load}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medication Tab Content */}
            <TabsContent value="medication">
              <Card>
                <CardHeader>
                  <CardTitle>Medication Management</CardTitle>
                  <CardDescription>
                    Monitor and manage patient medication schedules and adherence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Medication management content would go here, including:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Automated dispensing monitoring</li>
                    <li>Medication pouch verification</li>
                    <li>Medication schedule management</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Monitoring Tab Content */}
            <TabsContent value="health">
              <Card>
                <CardHeader>
                  <CardTitle>Health Monitoring</CardTitle>
                  <CardDescription>
                    Track patient vitals and health trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Health monitoring content would go here, including:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Glucose level monitoring</li>
                    <li>Health trend analysis</li>
                    <li>Intervention management</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customer Service Tab Content */}
            <TabsContent value="service">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Service Operations</CardTitle>
                  <CardDescription>
                    Manage multilingual support and technical assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Customer service content would go here, including:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Multilingual support center</li>
                    <li>Technical support</li>
                    <li>Service request management</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthcareDashboard;
