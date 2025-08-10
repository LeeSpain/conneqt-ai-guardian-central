import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserProvider } from "@/contexts/UserContext";
import { AgentProvider } from "@/contexts/AgentContext";
import { BrainCircuit, Users, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OpenAIService } from "@/utils/OpenAIService";

export default function AIAgents() {
  const [openAiKey, setOpenAiKey] = useState(OpenAIService.getApiKey() ?? "");
  const { toast } = useToast();

  useEffect(() => {
    document.title = "AI Agents Hub | ConneqtCentral";
  }, []);

  return (
    <UserProvider>
      <AgentProvider>
        <DashboardLayout>
          <main className="p-6 space-y-6">
            <header>
              <h1 className="text-2xl font-bold text-foreground">AI Agents Hub</h1>
              <p className="text-muted-foreground">Manage the Master Agent and client-specific agents.</p>
            </header>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5"/> Builder Agent</CardTitle>
                  <CardDescription>Public-facing chat for prospects. Gathers only safe basics.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-end">
                  <div className="text-sm text-muted-foreground">Frontend chat, inherits Master policies</div>
                  <Button asChild>
                    <Link to="/ai-agents/builder">Open</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5"/> Master Agent</CardTitle>
                  <CardDescription>Configure the global brain and policies.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-end">
                  <div className="text-sm text-muted-foreground">Persona, knowledge, tools, channels</div>
                  <Button asChild>
                    <Link to="/ai-agents/master">Open</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Client Agents</CardTitle>
                  <CardDescription>One dedicated agent per client account.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-end">
                  <div className="text-sm text-muted-foreground">Overrides, knowledge, channels</div>
                  <Button asChild>
                    <Link to="/ai-agents/clients">Manage</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5"/> Agent Console</CardTitle>
                  <CardDescription>Test and preview agent behavior.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-end">
                  <div className="text-sm text-muted-foreground">Chat and tool call visualization</div>
                  <Button variant="secondary" asChild>
                    <Link to="/ai-agents/console">Open Console</Link>
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Settings & Integrations (Admin only - hidden from public flows) */}
            <section className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>OpenAI Integration</CardTitle>
                  <CardDescription>Admin-only: Set your OpenAI API key to enable live LLM responses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-2">
                    <label className="text-sm text-muted-foreground">OpenAI API Key</label>
                    <Input
                      type="password"
                      value={openAiKey}
                      onChange={(e) => setOpenAiKey(e.target.value)}
                      placeholder="sk-..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={async ()=>{
                      OpenAIService.saveApiKey(openAiKey.trim());
                      window.dispatchEvent(new StorageEvent('storage', { key: 'openai_api_key' }));
                      toast({ title: "API key saved" });
                    }}>Save Key</Button>
                    <Button variant="secondary" onClick={async ()=>{
                      const ok = await OpenAIService.testApiKey(openAiKey.trim());
                      toast({ title: ok ? "Key works" : "Key failed", description: ok ? "We can reach OpenAI." : "Please verify your key." });
                    }}>Test Key</Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </DashboardLayout>
      </AgentProvider>
    </UserProvider>
  );
}
