import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Mic, Phone, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface DemoChatProps {
  industry: string;
  scenario: string;
}

const industryResponses = {
  healthcare: {
    'Appointment Scheduling': [
      "Hello! I'm your AI assistant. I can help you schedule an appointment. What type of visit do you need?",
      "I can check availability for next week. What's your preferred day and time?",
      "Perfect! I've found an opening on Tuesday at 2:30 PM with Dr. Smith. Shall I book this for you?",
      "Appointment confirmed! You'll receive a confirmation email shortly with pre-visit instructions."
    ],
    'Prescription Inquiries': [
      "Hi! I can help with prescription questions. Can you provide your patient ID or date of birth for verification?",
      "Thank you. I see your prescription for blood pressure medication. What would you like to know?",
      "Your refill is due in 3 days. I can process the renewal now and it will be ready for pickup tomorrow.",
      "Refill processed! Your pharmacy will have it ready by 10 AM tomorrow. Is there anything else I can help with?"
    ]
  },
  ecommerce: {
    'Order Tracking': [
      "Hello! I'm here to help track your order. Can you provide your order number or email address?",
      "I found your order #12345. It's currently in transit and should arrive by Thursday.",
      "Your package is out for delivery today! You'll receive a text when it's 2-3 stops away.",
      "Great! Is there anything else I can help you with regarding your order or other purchases?"
    ],
    'Product Support': [
      "Hi! I can help with product questions. What item are you having trouble with?",
      "I see you're asking about the wireless headphones. What specific issue are you experiencing?",
      "Try holding the power button for 10 seconds to reset. This resolves 80% of connection issues.",
      "Perfect! If you have any other questions, I'm here to help. You can also access our video tutorials online."
    ]
  },
  saas: {
    'Onboarding Support': [
      "Welcome! I'm here to help you get started. Have you completed the initial account setup?",
      "Great! Let's set up your first project. What type of workflow are you looking to automate?",
      "I'll guide you through creating your first automation. We'll start with a simple email trigger.",
      "Excellent! Your automation is live. You can monitor its performance in the dashboard."
    ],
    'Technical Troubleshooting': [
      "I can help troubleshoot API issues. What error message are you seeing?",
      "That's a rate limiting error. You can increase your API limits in the billing section.",
      "I've temporarily increased your rate limit. For permanent increases, upgrade to our Pro plan.",
      "All set! Your API calls should work normally now. Need help with anything else?"
    ]
  }
};

const DemoChat = ({ industry, scenario }: DemoChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responses = industryResponses[industry as keyof typeof industryResponses]?.[scenario] || [
    "Hello! I'm your AI assistant. How can I help you today?",
    "I understand your request. Let me process that for you.",
    "Here's the information you requested. Is there anything else I can help with?",
    "Thank you for using our service! Have a great day!"
  ];

  useEffect(() => {
    // Start with AI greeting
    addAIMessage(responses[0]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addAIMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Add AI response after delay
    if (currentStep < responses.length - 1) {
      setTimeout(() => {
        addAIMessage(responses[currentStep + 1]);
        setCurrentStep(prev => prev + 1);
      }, 1500);
    }
  };

  const resetDemo = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsTyping(false);
    addAIMessage(responses[0]);
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <MessageCircle className="text-primary" size={20} />
            Live Demo: {scenario}
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Bot size={12} className="mr-1" />
              AI Powered
            </Badge>
            <Button variant="ghost" size="sm" onClick={resetDemo}>
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'ai' && (
                    <Bot size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  )}
                  {message.type === 'user' && (
                    <User size={16} className="text-primary-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-primary" />
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isTyping || !inputValue.trim()}>
            <Send size={16} />
          </Button>
          <Button size="icon" variant="outline">
            <Mic size={16} />
          </Button>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center mt-3">
          <Badge variant="secondary" className="text-xs">
            <Phone size={12} className="mr-1" />
            Voice AI also available
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoChat;