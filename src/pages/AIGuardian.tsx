
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceCallDemo from '@/components/solution/VoiceCallDemo';
import LiveAnalytics from '@/components/solution/LiveAnalytics';
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
  AlertCircle,
  CheckCircle2,
  XCircle,
  Play,
  ArrowRight,
  Target,
  Zap,
  Users,
  Rocket,
  Brain,
  Shield,
  Phone
} from "lucide-react";

const demoScenarios = [
  {
    id: 'healthcare',
    name: 'Healthcare Assistant',
    description: 'HIPAA-compliant patient support',
    icon: '🏥',
    messages: [
      { role: "ai", content: "Hello! I'm your AI healthcare assistant. I can help with appointment scheduling, prescription inquiries, and general health questions. How can I assist you today?" },
      { role: "user", content: "I need to schedule an appointment with Dr. Smith for next week" },
      { role: "ai", content: "I'd be happy to help you schedule with Dr. Smith. I see he has availability on Tuesday at 2:30 PM and Thursday at 10:15 AM next week. Which would work better for you?" },
      { role: "user", content: "Tuesday works great" },
      { role: "ai", content: "Perfect! I've scheduled your appointment with Dr. Smith for Tuesday at 2:30 PM. You'll receive a confirmation email shortly with pre-visit instructions and forms to complete online." }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Support',
    description: 'Order tracking and product support',
    icon: '🛍️',
    messages: [
      { role: "ai", content: "Hi! I'm your e-commerce support assistant. I can help with order tracking, returns, product information, and account questions. What can I help you with?" },
      { role: "user", content: "Where is my order #12345?" },
      { role: "ai", content: "Let me check that for you! Order #12345 is currently out for delivery and should arrive by 3 PM today. You'll receive a text notification when it's 2-3 stops away. Is this the correct delivery address: 123 Main St?" },
      { role: "user", content: "Yes, that's correct. Thank you!" },
      { role: "ai", content: "You're welcome! Your package should arrive soon. If you have any issues with delivery or need to make changes, just let me know. Is there anything else I can help you with today?" }
    ]
  },
  {
    id: 'saas',
    name: 'SaaS Technical Support',
    description: 'API help and user onboarding',
    icon: '💻',
    messages: [
      { role: "ai", content: "Hello! I'm your technical support AI. I can help with API integration, troubleshooting, feature explanations, and account setup. What technical challenge are you facing?" },
      { role: "user", content: "I'm getting a 429 error when calling your API" },
      { role: "ai", content: "A 429 error indicates you've hit the rate limit. I can see you're on the Starter plan with 1,000 requests per hour. You can upgrade to Pro for 10,000/hour, or I can temporarily increase your limit. Would you like me to upgrade you or provide a temporary increase?" },
      { role: "user", content: "Can you upgrade me to Pro?" },
      { role: "ai", content: "Absolutely! I've upgraded your account to Pro. Your new rate limit is 10,000 requests per hour, and you now have access to priority support and advanced analytics. The change is effective immediately." }
    ]
  }
];

const AIGuardian = () => {
  const [message, setMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState("demo");
  const [selectedScenario, setSelectedScenario] = useState(demoScenarios[0]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(selectedScenario.messages.slice(0, 1));
  
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const playNextMessage = () => {
    if (currentMessageIndex < selectedScenario.messages.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        const nextIndex = currentMessageIndex + 1;
        setMessages(selectedScenario.messages.slice(0, nextIndex + 1));
        setCurrentMessageIndex(nextIndex);
        setIsTyping(false);
      }, 1500);
    }
  };

  const resetDemo = () => {
    setMessages(selectedScenario.messages.slice(0, 1));
    setCurrentMessageIndex(0);
    setIsTyping(false);
  };

  const selectScenario = (scenario: any) => {
    setSelectedScenario(scenario);
    setMessages(scenario.messages.slice(0, 1));
    setCurrentMessageIndex(0);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    playNextMessage();
    setMessage("");
  };

  const toggleVoice = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-conneqt-blue to-blue-600 bg-clip-text text-transparent">
                Experience AI Guardian in Action
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              See how our industry-specific AI agents handle real customer interactions with precision, 
              empathy, and seamless integration capabilities.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Demo Environment</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>25+ Languages</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Tabs defaultValue="demo" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="demo" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    <span>Live Demo</span>
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Interactive Chat</span>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    <span>Voice AI</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Performance</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="demo" className="mt-0">
                  <div className="space-y-6">
                    {/* Scenario Selection */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="text-primary" size={20} />
                          Choose Your Industry Demo
                        </CardTitle>
                        <CardDescription>
                          See how AI Guardian handles industry-specific customer interactions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          {demoScenarios.map((scenario) => (
                            <Button
                              key={scenario.id}
                              variant={selectedScenario.id === scenario.id ? "default" : "outline"}
                              className="h-auto p-4 flex flex-col items-center"
                              onClick={() => selectScenario(scenario)}
                            >
                              <div className="text-2xl mb-2">{scenario.icon}</div>
                              <div className="font-medium">{scenario.name}</div>
                              <div className="text-xs opacity-70 text-center">{scenario.description}</div>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Demo Conversation */}
                    <Card className="h-[500px] flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Bot className="h-5 w-5 text-primary" />
                            {selectedScenario.name} Demo
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={resetDemo}>
                              Reset
                            </Button>
                            <Button size="sm" onClick={playNextMessage} disabled={currentMessageIndex >= selectedScenario.messages.length - 1}>
                              <Play className="w-4 h-4 mr-1" />
                              Next
                            </Button>
                          </div>
                        </div>
                        <CardDescription>
                          Watch a realistic conversation flow between customer and AI
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-md">
                          {messages.map((msg, index) => (
                            <div
                              key={index}
                              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background border"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {msg.role === "ai" && (
                                    <Bot className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                                  )}
                                  {msg.role === "user" && (
                                    <Users className="w-4 h-4 mt-1 flex-shrink-0 text-primary-foreground" />
                                  )}
                                  <div>
                                    <p className="text-sm">{msg.content}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="bg-background border rounded-lg p-3 max-w-[80%]">
                                <div className="flex items-center gap-2">
                                  <Bot className="w-4 h-4 text-primary" />
                                  <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="chat" className="mt-0">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        Interactive AI Chat
                      </CardTitle>
                      <CardDescription>
                        Ask questions and see real AI responses
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-md">
                        <div className="bg-background border rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Bot className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                            <p className="text-sm">
                              Hello! I'm an AI assistant demonstration. I can help answer questions about our platform, 
                              explain features, or show you how I handle different types of customer inquiries. What would you like to know?
                            </p>
                          </div>
                        </div>
                        <div ref={messagesEndRef} />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Input
                          placeholder="Ask me anything about AI Guardian..."
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
                  <div className="space-y-6">
                    <VoiceCallDemo 
                      scenario="customer-support"
                      industry={selectedScenario.id || 'healthcare'}
                    />
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <PhoneCall className="h-5 w-5 text-primary" />
                          Voice AI Capabilities
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                            <h4 className="font-medium mb-2">Ultra-Fast Processing</h4>
                            <p className="text-sm text-muted-foreground">Sub-second response times with natural speech patterns</p>
                          </div>
                          <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                            <h4 className="font-medium mb-2">Global Language Support</h4>
                            <p className="text-sm text-muted-foreground">25+ languages with cultural context awareness</p>
                          </div>
                          <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                            <h4 className="font-medium mb-2">Context Memory</h4>
                            <p className="text-sm text-muted-foreground">Remembers conversation history and customer preferences</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <Button size="lg" className="mr-3">
                            <Phone className="w-5 h-5 mr-2" />
                            Try Live Voice Demo
                          </Button>
                          <Button variant="outline" size="lg">
                            Schedule Voice Call Test
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-0">
                  <LiveAnalytics />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Rocket className="text-primary" size={20} />
                    Get Started
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to="/solution-builder">
                      <Target className="w-4 h-4 mr-2" />
                      Build Your Solution
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/quote">
                      <FileText className="w-4 h-4 mr-2" />
                      Get Quote
                    </Link>
                  </Button>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to="/subscription-services">
                      View All Plans
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* AI Capabilities */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">AI Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Multi-language Support</Label>
                      <p className="text-xs text-muted-foreground">25+ languages</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Processing</Label>
                      <p className="text-xs text-muted-foreground">Real-time speech</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Context Memory</Label>
                      <p className="text-xs text-muted-foreground">Conversation history</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Integration Hub</Label>
                      <p className="text-xs text-muted-foreground">API connections</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">AI Engine</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Voice Processing</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Integrations</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Live Support</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Available</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Success Metrics */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="text-primary" size={20} />
                    Platform Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">96.8%</div>
                    <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">€2.1M</div>
                    <div className="text-sm text-muted-foreground">Annual Savings Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">847K</div>
                    <div className="text-sm text-muted-foreground">Interactions This Month</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AIGuardian;
