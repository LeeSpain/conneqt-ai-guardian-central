import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UserProvider } from "@/contexts/UserContext";
import { AgentProvider, useAgent } from "@/contexts/AgentContext";
import { OpenAIService } from "@/utils/OpenAIService";
import { AdminContainer } from "@/components/layouts/AdminContainer";

 type Msg = { id: string; role: "user" | "assistant"; content: string };

export default function AgentConsole() {
  useEffect(() => {
    document.title = "Agent Console | ConneqtCentral";
  }, []);

  return (
    <UserProvider>
      <AgentProvider>
        <DashboardLayout>
          <AdminContainer>
            <header>
              <h1 className="text-2xl font-bold text-foreground">Agent Console</h1>
              <p className="text-muted-foreground">Test conversations. Uses OpenAI when configured (local demo fallback otherwise).</p>
            </header>
            <ConsoleInner />
          </AdminContainer>
        </DashboardLayout>
      </AgentProvider>
    </UserProvider>
  );
}

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function ConsoleInner() {
  const { masterAgent, getClientAgent, getTrainingForClient, getTrainingForMaster, buildSystemPrompt } = useAgent();
  const query = useQuery();
  const clientId = query.get("clientId");
  const clientAgent = clientId ? getClientAgent(clientId) : undefined;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      role: "assistant",
      content: clientAgent
        ? `Hi! I'm ${clientAgent.name}. I inherit policies from ${masterAgent.name}. How can I help?`
        : `Hi! I'm ${masterAgent.name}. Ask me anything.`,
    },
  ]);
  const training = clientAgent ? getTrainingForClient(clientAgent.id) : getTrainingForMaster();
  const [showTraining, setShowTraining] = useState(false);
  const top3 = training.slice(0, 3);

  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", content: text };
    const placeholder: Msg = { id: `a-${Date.now() + 1}`, role: "assistant", content: "Thinking…" };
    setMessages((prev) => [...prev, userMsg, placeholder]);
    setInput("");

    const apiKey = OpenAIService.getApiKey();
    if (!apiKey) {
      setMessages((prev) => prev.map((m) => (m.id === placeholder.id ? { ...m, content: clientAgent
        ? `Demo reply from ${clientAgent.name}. (Master fallback: ${masterAgent.name}).`
        : `Demo reply from ${masterAgent.name}.` } : m)));
      return;
    }

    try {
      const system = clientAgent ? buildSystemPrompt(clientAgent.id) : buildSystemPrompt("master");
      const recent = messages.slice(-20).map((m) => ({ role: m.role, content: m.content })) as any[];
      const openAiMessages = [
        { role: "system", content: system },
        ...recent,
        { role: "user", content: text },
      ];
      const completion = await OpenAIService.chat(openAiMessages);
      setMessages((prev) => prev.map((m) => (m.id === placeholder.id ? { ...m, content: completion || "(no response)" } : m)));
    } catch (e: any) {
      setMessages((prev) => prev.map((m) => (m.id === placeholder.id ? { ...m, content: `Error: ${e?.message || "Failed to call AI"}` } : m)));
    }
  };

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2 flex flex-col min-h-[60vh]">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="flex-1 rounded-md border p-4 space-y-3 overflow-auto bg-background">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                <span className="text-xs text-muted-foreground mr-2">{m.role}</span>
                <span className="inline-block rounded-md px-3 py-2 bg-muted text-foreground max-w-[80%]">
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button onClick={send}>Send</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Context</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div><strong>Active Agent:</strong> {clientAgent ? clientAgent.name : masterAgent.name}</div>
          <div><strong>Persona:</strong> {clientAgent ? clientAgent.persona : masterAgent.persona}</div>
          <div><strong>Channels:</strong> Chat {clientAgent ? clientAgent.channels.chat : masterAgent.channels.chat ? "On" : "Off"} • Voice {clientAgent ? clientAgent.channels.voice : masterAgent.channels.voice ? "On" : "Off"}</div>
          <div className="pt-2 border-t mt-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Show training</span>
              <Switch checked={showTraining} onCheckedChange={setShowTraining} />
            </div>
            {showTraining && (
              <ul className="mt-2 list-disc pl-4">
                {top3.map((t) => (
                  <li key={t.id}><span className="text-foreground">{t.title}</span> <span className="text-xs">• {t.type.toUpperCase()}</span></li>
                ))}
                {top3.length === 0 && <li>No training available.</li>}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
