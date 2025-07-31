import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Phone,
  PhoneCall,
  Clock,
  User,
  Bot,
  CheckCircle
} from 'lucide-react';

interface VoiceCallProps {
  scenario: string;
  industry: string;
}

const voiceScenarios = {
  healthcare: [
    { speaker: 'customer', text: "Hi, I need to schedule an appointment with Dr. Johnson for next week.", timestamp: 0, duration: 3 },
    { speaker: 'ai', text: "Hello! I'd be happy to help you schedule with Dr. Johnson. Let me check his availability for next week.", timestamp: 3, duration: 4 },
    { speaker: 'ai', text: "I see he has openings on Tuesday at 2:30 PM and Thursday at 10:15 AM. Which works better for you?", timestamp: 7, duration: 5 },
    { speaker: 'customer', text: "Tuesday at 2:30 would be perfect.", timestamp: 12, duration: 2 },
    { speaker: 'ai', text: "Excellent! I've scheduled your appointment with Dr. Johnson for Tuesday at 2:30 PM. You'll receive a confirmation email with pre-visit instructions.", timestamp: 14, duration: 6 }
  ],
  ecommerce: [
    { speaker: 'customer', text: "I placed an order yesterday but haven't received any updates. Can you help?", timestamp: 0, duration: 4 },
    { speaker: 'ai', text: "I'll be happy to check on your order status. Can you provide your order number or the email address used for the purchase?", timestamp: 4, duration: 5 },
    { speaker: 'customer', text: "The order number is 12345.", timestamp: 9, duration: 2 },
    { speaker: 'ai', text: "Thank you! I found your order. It's currently being prepared for shipment and will be dispatched within the next 2 hours. You'll receive tracking information via email once it ships.", timestamp: 11, duration: 7 }
  ],
  saas: [
    { speaker: 'customer', text: "I'm getting a 403 error when trying to access the API. Can you help?", timestamp: 0, duration: 3 },
    { speaker: 'ai', text: "I can help troubleshoot that API issue. A 403 error typically indicates an authentication or permission problem. Let me check your account.", timestamp: 3, duration: 6 },
    { speaker: 'ai', text: "I see the issue - your API key was recently regenerated for security. I'm sending you the new key via email right now.", timestamp: 9, duration: 5 },
    { speaker: 'customer', text: "That was fast! The new key works perfectly. Thank you!", timestamp: 14, duration: 3 },
    { speaker: 'ai', text: "You're welcome! For future reference, API keys are automatically rotated every 90 days for security. Is there anything else I can help with?", timestamp: 17, duration: 6 }
  ]
};

const VoiceCallDemo = ({ scenario, industry }: VoiceCallProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);

  const conversation = voiceScenarios[industry as keyof typeof voiceScenarios] || voiceScenarios.healthcare;
  const totalDuration = conversation[conversation.length - 1].timestamp + conversation[conversation.length - 1].duration;

  const play = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 0.1;
        
        // Find current speaker
        const current = conversation.find(msg => 
          newTime >= msg.timestamp && newTime < msg.timestamp + msg.duration
        );
        setCurrentSpeaker(current?.speaker || null);

        if (newTime >= totalDuration) {
          setIsPlaying(false);
          setCurrentSpeaker(null);
          clearInterval(interval);
          return 0;
        }
        return newTime;
      });
    }, 100);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    setCurrentSpeaker(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhoneCall className="text-primary" size={20} />
          Voice Call Demo - {industry.charAt(0).toUpperCase() + industry.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Call Interface */}
        <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto transition-all ${
              currentSpeaker === 'ai' ? 'bg-primary animate-pulse' : 
              currentSpeaker === 'customer' ? 'bg-blue-500 animate-pulse' : 
              'bg-muted'
            }`}>
              {currentSpeaker === 'ai' ? (
                <Bot className="w-8 h-8 text-white" />
              ) : currentSpeaker === 'customer' ? (
                <User className="w-8 h-8 text-white" />
              ) : (
                <Phone className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            
            <div className="text-lg font-medium mb-2">
              {currentSpeaker === 'ai' ? 'AI Assistant Speaking' :
               currentSpeaker === 'customer' ? 'Customer Speaking' :
               'Ready to Start Call'}
            </div>
            
            <div className="text-sm text-muted-foreground mb-4">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-muted rounded-full mx-auto mb-6">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </Button>
              
              <Button
                size="sm"
                onClick={isPlaying ? pause : play}
                disabled={currentTime >= totalDuration}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Conversation Transcript */}
        <div className="space-y-3">
          <h4 className="font-medium">Live Transcript:</h4>
          <div className="bg-background border rounded-lg p-4 max-h-64 overflow-y-auto">
            {conversation.map((message, index) => {
              const isActive = currentTime >= message.timestamp && currentTime < message.timestamp + message.duration;
              const isPast = currentTime > message.timestamp + message.duration;
              
              return (
                <div 
                  key={index}
                  className={`flex items-start gap-3 mb-3 transition-opacity ${
                    isPast ? 'opacity-60' : isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.speaker === 'ai' ? 'bg-primary' : 'bg-blue-500'
                  }`}>
                    {message.speaker === 'ai' ? (
                      <Bot className="w-3 h-3 text-white" />
                    ) : (
                      <User className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {message.speaker === 'ai' ? 'AI Assistant' : 'Customer'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                      {isPast && <CheckCircle className="w-3 h-3 text-green-600" />}
                    </div>
                    <p className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                      {message.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-muted/50 rounded">
            <div className="text-lg font-bold text-primary">{formatTime(totalDuration)}</div>
            <div className="text-xs text-muted-foreground">Total Duration</div>
          </div>
          <div className="p-3 bg-muted/50 rounded">
            <div className="text-lg font-bold text-green-600">100%</div>
            <div className="text-xs text-muted-foreground">Resolution Rate</div>
          </div>
          <div className="p-3 bg-muted/50 rounded">
            <div className="text-lg font-bold text-blue-600">0</div>
            <div className="text-xs text-muted-foreground">Escalations</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline">Natural speech patterns</Badge>
          <Badge variant="outline">Context awareness</Badge>
          <Badge variant="outline">Real-time processing</Badge>
          <Badge variant="outline">Multi-language support</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCallDemo;