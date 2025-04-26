
import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  Bot,
  Mic,
  MicOff,
  BarChart3,
  PhoneCall,
  Globe,
  Settings,
  FileText,
  LayoutDashboard,
  Layers,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";

const AIGuardian = () => {
  const [message, setMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I'm the AI Guardian assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
        timestamp: new Date()
      }
    ]);
    
    // Clear input
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've processed your request and can help you with that immediately.",
        "Based on your business rules, I would recommend the following solution...",
        "I've checked your account history and found the information you're looking for.",
        "I've connected to your CRM system and updated your customer record with this information."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          content: randomResponse,
          timestamp: new Date()
        }
      ]);
    }, 1200);
  };

  const toggleVoice = () => {
    setIsSpeaking(!isSpeaking);
    // TODO: Implement voice functionality
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">AI Agent Control Center</h1>
              <p className="text-gray-500">Experience and control our autonomous AI agent system</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">System Active</span>
              </div>
              <Button
                variant="outline"
                onClick={toggleVoice}
                className="flex items-center gap-2"
              >
                {isSpeaking ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isSpeaking ? "Stop Voice" : "Start Voice"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat</span>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    <span>Voice Call</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="mt-0">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        AI Agent Conversation
                      </CardTitle>
                      <CardDescription>
                        Demonstration of autonomous customer interaction
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
                        {messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                msg.role === "user"
                                  ? "bg-blue-500 text-white"
                                  : "bg-white border border-gray-200"
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {msg.role === "ai" && (
                                  <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                                )}
                                <div>
                                  <p className={`text-sm ${msg.role === "ai" ? "text-gray-800" : ""}`}>
                                    {msg.content}
                                  </p>
                                  <p className={`text-xs mt-1 ${msg.role === "ai" ? "text-gray-500" : "text-blue-200"}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage}>
                          Send
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="voice" className="mt-0">
                  <Card className="h-[600px]">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PhoneCall className="h-5 w-5 text-blue-600" />
                        Voice Interaction
                      </CardTitle>
                      <CardDescription>
                        Real-time voice processing demonstration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-[480px]">
                      <div className="mb-8 text-center">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                          <Mic className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium">AI Voice Assistant</h3>
                        <p className="text-gray-500 mt-1">Click the button below to start speaking</p>
                      </div>
                      <Button size="lg" className="gap-2">
                        <Mic className="h-5 w-5" />
                        Start Voice Demo
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-0">
                  <Card className="h-[600px]">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        AI Performance Analytics
                      </CardTitle>
                      <CardDescription>
                        Real-time metrics and insights
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Resolution Rate</h4>
                          <div className="text-2xl font-bold">96%</div>
                          <div className="h-2 bg-gray-100 rounded mt-2">
                            <div className="h-full bg-green-500 rounded" style={{ width: "96%" }}></div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Average Response Time</h4>
                          <div className="text-2xl font-bold">1.2s</div>
                          <div className="flex items-center text-green-600 text-xs mt-2">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Excellent
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Human Escalations</h4>
                          <div className="text-2xl font-bold">4%</div>
                          <div className="flex items-center text-green-600 text-xs mt-2">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Below threshold (5%)
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Customer Satisfaction</h4>
                          <div className="text-2xl font-bold">4.8/5</div>
                          <div className="flex items-center text-green-600 text-xs mt-2">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Above target (4.5)
                          </div>
                        </div>
                      </div>

                      <h4 className="font-medium mb-2">AI Agent Activity</h4>
                      <div className="bg-white p-4 rounded-lg border mb-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Web Chat</span>
                            <div className="w-2/3 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: "78%" }}></div>
                            </div>
                            <span className="text-sm font-medium">78%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Voice Calls</span>
                            <div className="w-2/3 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: "45%" }}></div>
                            </div>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Email</span>
                            <div className="w-2/3 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-purple-500 h-full rounded-full" style={{ width: "62%" }}></div>
                            </div>
                            <span className="text-sm font-medium">62%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Social Media</span>
                            <div className="w-2/3 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-pink-500 h-full rounded-full" style={{ width: "34%" }}></div>
                            </div>
                            <span className="text-sm font-medium">34%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">AI Agent Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autonomous Mode</Label>
                      <p className="text-xs text-gray-500">AI operates without oversight</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Capabilities</Label>
                      <p className="text-xs text-gray-500">Enable text-to-speech</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Learning Mode</Label>
                      <p className="text-xs text-gray-500">Improve from interactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Human Fallback</Label>
                      <p className="text-xs text-gray-500">Escalate complex issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Advanced Settings
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Connected Systems</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">CRM System</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Knowledge Base</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">ERP Platform</span>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Limited</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">Payment System</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">Not Connected</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    Connect Systems
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Conversation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure AI
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Emergency Override
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default AIGuardian;
