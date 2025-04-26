
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Bot, Mic, MicOff } from "lucide-react";

const AIGuardian = () => {
  const [message, setMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // TODO: Implement message handling
    setMessage("");
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
            <h1 className="text-2xl font-semibold">AI Guardian Assistant</h1>
            <Button
              variant="outline"
              onClick={toggleVoice}
              className="flex items-center gap-2"
            >
              {isSpeaking ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isSpeaking ? "Stop Voice" : "Start Voice"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Chat with AI Guardian
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
                    {/* Chat messages will go here */}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Start Client Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    View Call History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Assistant Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      <span className="text-green-500">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Response Time</span>
                      <span>~2 seconds</span>
                    </div>
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

export default AIGuardian;
