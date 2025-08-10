import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentProvider, useAgent } from "@/contexts/AgentContext";
import { BuilderChatInner } from "./BuilderChat";

export default function BuilderAgentDashboard() {
  useEffect(() => {
    document.title = "Builder Agent Dashboard | ConneqtCentral";
    const desc = "Manage the Builder Agent: chat, training, and commands.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  return (
    <AgentProvider>
      <DashboardLayout>
        <main className="p-6 space-y-6">
          <header>
            <h1 className="text-2xl font-bold text-foreground">Builder Agent</h1>
            <p className="text-muted-foreground">Public-facing intake and customer service expert for prospects, with redaction.</p>
          </header>
          <BuilderAgentTabs />
        </main>
      </DashboardLayout>
    </AgentProvider>
  );
}

function BuilderAgentTabs() {
  return (
    <Tabs defaultValue="chat" className="w-full">
      <TabsList>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="training">Training</TabsTrigger>
        <TabsTrigger value="commands">Commands</TabsTrigger>
      </TabsList>
      <TabsContent value="chat">
        <Card>
          <CardHeader>
            <CardTitle>Live Chat Preview</CardTitle>
            <CardDescription>Simulate how prospects interact with the Builder Agent.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <BuilderChatInner />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="training">
        <TrainingManager />
      </TabsContent>
      <TabsContent value="commands">
        <CommandsCatalog />
      </TabsContent>
    </Tabs>
  );
}

function TrainingManager() {
  const { getTrainingForClient, addTraining, publishTraining } = useAgent();
  const items = getTrainingForClient("builder");

  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("faq");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return;
    addTraining({
      scope: "client",
      clientId: "builder",
      title,
      type: type as any,
      description,
      content,
      tags: ["builder"],
      author: "Builder Admin",
      notes: "Initial draft",
    });
    setTitle("");
    setDescription("");
    setContent("");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Training</CardTitle>
          <CardDescription>Content here shapes the Builder Agent’s behavior for prospects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Select value={type} onValueChange={setType}>
            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="faq">FAQ</SelectItem>
              <SelectItem value="sop">SOP</SelectItem>
              <SelectItem value="script">Script</SelectItem>
              <SelectItem value="policy">Policy</SelectItem>
              <SelectItem value="intent">Intent</SelectItem>
              <SelectItem value="callflow">Call Flow</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Short description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} />
          <div className="flex justify-end">
            <Button onClick={handleAdd}>Save Training</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Training Library</CardTitle>
          <CardDescription>Client-scoped items for the Builder Agent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">No training yet. Add your first item on the left.</p>
          )}
          {items.map((t) => (
            <div key={t.id} className="rounded-md border p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{t.title} <span className="text-xs text-muted-foreground">({t.type})</span></div>
                  {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => publishTraining(t.id)}>Publish latest</Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {t.versions[t.versions.length - 1]?.content}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function CommandsCatalog() {
  const { masterAgent, getClientAgent } = useAgent();
  const builder = getClientAgent("builder");
  const allowlistKeys = builder?.privacy?.allowlistKeys ?? [];

  const commands = useMemo(() => {
    const allowList = allowlistKeys.length ? allowlistKeys.join(", ") : "industry, teamSize, callVolume, complexity, coverage, integrations, compliance, selectedServices";
    return [
      { key: "intake", title: "Start intake", description: "Collect high‑level requirements" },
      { key: "pricing", title: "Pricing overview", description: "Explain pricing model" },
      { key: "features", title: "Capabilities", description: "List core capabilities" },
      { key: "integrations", title: "Integrations", description: "Common integrations" },
      { key: "compliance", title: "Compliance", description: "Security and compliance" },
      { key: "timeline", title: "Implementation", description: "Typical timeline" },
      { key: "quote", title: "Next steps for quote", description: "How to get a quote" },
      { key: "contact", title: "Contact options", description: "How to connect" },
      // Customer service expert additions
      { key: "support", title: "Support policy", description: "SLAs, channels, and escalation" },
      { key: "sla", title: "SLA details", description: "Response/resolve targets" },
      { key: "triage", title: "Triage flow", description: "How issues are routed" },
      { key: "escalation", title: "Escalation paths", description: "When and how we escalate" },
      { key: "summary", title: "Redacted summary", description: `Shares allowlisted fields only: ${allowList}` },
      { key: "handoff", title: "Handoff to Master", description: `Notify ${masterAgent.name} with minimal brief` },
    ];
  }, [allowlistKeys, masterAgent.name]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commands</CardTitle>
        <CardDescription>These slash commands are supported in the Builder chat.</CardDescription>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {commands.map((c) => (
          <div key={c.key} className="rounded-md border p-3">
            <div className="font-medium">/{c.key} — {c.title}</div>
            <div className="text-sm text-muted-foreground">{c.description}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
