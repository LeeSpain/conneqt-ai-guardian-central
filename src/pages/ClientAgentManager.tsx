import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { UserProvider } from "@/contexts/UserContext";
import { AgentProvider, useAgent } from "@/contexts/AgentContext";

export default function ClientAgentManager() {
  const { clientId } = useParams<{ clientId: string }>();

  useEffect(() => {
    document.title = `Manage Agent ${clientId} | ConneqtCentral`;
  }, [clientId]);

  return (
    <UserProvider>
      <AgentProvider>
        <DashboardLayout>
          <main className="p-6 space-y-6">
            <AgentManager clientId={clientId!} />
          </main>
        </DashboardLayout>
      </AgentProvider>
    </UserProvider>
  );
}

function AgentManager({ clientId }: { clientId: string }) {
  const { getClientAgent, updateClientAgent } = useAgent();
  const agent = getClientAgent(clientId);

  if (!agent) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Agent not found</h1>
        <Button asChild>
          <Link to="/ai-agents/clients">Back to list</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{agent.name}</h1>
          <p className="text-muted-foreground">Customize this client's dedicated agent.</p>
        </div>
        <Button asChild variant="secondary">
          <Link to={`/ai-agents/console?clientId=${agent.id}`}>Test this agent</Link>
        </Button>
      </header>

      <Tabs defaultValue="settings" className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Override persona and behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">Name</label>
                <Input value={agent.name} onChange={(e) => updateClientAgent(agent.id, { name: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">Persona</label>
                <Input value={agent.persona} onChange={(e) => updateClientAgent(agent.id, { persona: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">System Prompt</label>
                <Textarea value={agent.systemPrompt} onChange={(e) => updateClientAgent(agent.id, { systemPrompt: e.target.value })} rows={6} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge</CardTitle>
              <CardDescription>Client-specific sources (demo).</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground">
                {agent.knowledgeSources.map((k) => (
                  <li key={k.id}>{k.title} • {k.type.toUpperCase()}</li>
                ))}
                {agent.knowledgeSources.length === 0 && (
                  <li>No sources yet. Ingest documents or URLs in a later phase.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
              <CardDescription>Enable/disable tools for this agent.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {Object.keys(agent.tools).map((t) => (
                <div key={t} className="flex items-center justify-between border rounded-md p-3">
                  <span className="capitalize">{t}</span>
                  <Switch
                    checked={!!agent.tools[t]}
                    onCheckedChange={(v) =>
                      updateClientAgent(agent.id, { tools: { ...agent.tools, [t]: v } })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>Channels</CardTitle>
              <CardDescription>Control chat/voice availability.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={agent.channels.chat} onCheckedChange={(v) => updateClientAgent(agent.id, { channels: { ...agent.channels, chat: v } })} />
                <span>Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={agent.channels.voice} onCheckedChange={(v) => updateClientAgent(agent.id, { channels: { ...agent.channels, voice: v } })} />
                <span>Voice</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>KPIs coming soon.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Charts placeholder</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
