import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProvider } from "@/contexts/UserContext";
import { AgentProvider, useAgent } from "@/contexts/AgentContext";

export default function ClientAgents() {
  useEffect(() => {
    document.title = "Client Agents | ConneqtCentral";
  }, []);

  return (
    <UserProvider>
      <AgentProvider>
        <DashboardLayout>
          <main className="p-6 space-y-6">
            <header>
              <h1 className="text-2xl font-bold text-foreground">Client Agents</h1>
              <p className="text-muted-foreground">Each client gets a dedicated agent. Select one to manage.</p>
            </header>

            <ClientAgentsList />
          </main>
        </DashboardLayout>
      </AgentProvider>
    </UserProvider>
  );
}

function ClientAgentsList() {
  const { clientAgents, addClientAgent } = useAgent();

  const createDemo = () => {
    addClientAgent({
      name: "New Client Agent",
      persona: "General business assistant.",
      systemPrompt: "Be helpful and concise.",
      channels: { chat: true, voice: false },
      tools: { createTicket: true },
      knowledgeSources: [],
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={createDemo}>Add Client Agent</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clientAgents.map((agent) => (
          <Card key={agent.id} className="shadow-sm">
            <CardHeader>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>{agent.persona}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Chat: {agent.channels.chat ? "On" : "Off"} • Voice: {agent.channels.voice ? "On" : "Off"}
              </div>
              <Button asChild variant="secondary">
                <Link to={`/ai-agents/clients/${agent.id}`}>Manage</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
