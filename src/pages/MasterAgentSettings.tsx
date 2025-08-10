import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { UserProvider } from "@/contexts/UserContext";
import { AgentProvider, useAgent } from "@/contexts/AgentContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MasterAgentSettings() {
  useEffect(() => {
    document.title = "Master Agent Settings | ConneqtCentral";
  }, []);

  return (
    <UserProvider>
      <AgentProvider>
        <DashboardLayout>
          <main className="p-6 space-y-6">
            <header>
              <h1 className="text-2xl font-bold text-foreground">Master Agent</h1>
              <p className="text-muted-foreground">Configure the global brain, knowledge, tools, and channels inherited by client agents.</p>
            </header>

            <AgentTabs />
          </main>
        </DashboardLayout>
      </AgentProvider>
    </UserProvider>
  );
}

function AgentTabs() {
  const { masterAgent, updateMasterAgent } = useAgent();
  const [name, setName] = useState(masterAgent.name);
  const [persona, setPersona] = useState(masterAgent.persona);
  const [systemPrompt, setSystemPrompt] = useState(masterAgent.systemPrompt);
  const [chatEnabled, setChatEnabled] = useState(masterAgent.channels.chat);
  const [voiceEnabled, setVoiceEnabled] = useState(masterAgent.channels.voice);

  // Languages
  const [languages, setLanguages] = useState<string[]>(masterAgent.languages ?? ["en"]);
  const toggleLang = (code: string) =>
    setLanguages((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));

  // Telephony
  const [telProvider, setTelProvider] = useState(masterAgent.telephony?.provider ?? "twilio");
  const [outboundCallerId, setOutboundCallerId] = useState(masterAgent.telephony?.outboundCallerId ?? "");
  const [recordingEnabled, setRecordingEnabled] = useState(masterAgent.telephony?.recordingEnabled ?? true);
  const [ivrEnabled, setIvrEnabled] = useState(masterAgent.telephony?.ivrEnabled ?? true);

  // Integrations
  const [crm, setCrm] = useState(masterAgent.integrations?.crm ?? "");
  const [helpdesk, setHelpdesk] = useState(masterAgent.integrations?.helpdesk ?? "");
  const [billing, setBilling] = useState(masterAgent.integrations?.billing ?? "");
  const [calendar, setCalendar] = useState(masterAgent.integrations?.calendar ?? "");
const save = () => {
  updateMasterAgent({
    name,
    persona,
    systemPrompt,
    channels: { chat: chatEnabled, voice: voiceEnabled },
  });
};

const saveLanguages = () => {
  updateMasterAgent({ languages });
};

const saveTelephony = () => {
  updateMasterAgent({
    telephony: {
      provider: telProvider,
      inboundNumbers: masterAgent.telephony?.inboundNumbers ?? [],
      outboundCallerId,
      ivrEnabled,
      recordingEnabled,
    },
  });
};

const saveIntegrations = () => {
  updateMasterAgent({
    integrations: { crm, helpdesk, billing, calendar },
  });
};

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
        <TabsTrigger value="channels">Channels</TabsTrigger>
        <TabsTrigger value="languages">Languages</TabsTrigger>
        <TabsTrigger value="telephony">Telephony</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="policies">Policies</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Define the Master Agent's identity and default behavior.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">Persona</label>
              <Input value={persona} onChange={(e) => setPersona(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">System Prompt</label>
              <Textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={6} />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={chatEnabled} onCheckedChange={setChatEnabled} />
                <span>Chat Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                <span>Voice Enabled</span>
              </div>
            </div>
            <Button onClick={save}>Save</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="knowledge">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge</CardTitle>
            <CardDescription>Shared knowledge sources available to all client agents.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-sm text-muted-foreground">
              {masterAgent.knowledgeSources.map((k) => (
                <li key={k.id}>{k.title} • {k.type.toUpperCase()}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tools">
        <Card>
          <CardHeader>
            <CardTitle>Tools</CardTitle>
            <CardDescription>Toggle built-in tools available platform-wide.</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            {Object.keys(masterAgent.tools).map((t) => (
              <div key={t} className="flex items-center justify-between border rounded-md p-3">
                <span className="capitalize">{t}</span>
                <Switch
                  checked={!!masterAgent.tools[t]}
                  onCheckedChange={(v) =>
                    updateMasterAgent({ tools: { ...masterAgent.tools, [t]: v } })
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
            <CardDescription>Enable or disable chat/voice channels.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={chatEnabled} onCheckedChange={setChatEnabled} />
              <span>Chat</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
              <span>Voice</span>
            </div>
            <Button onClick={save}>Save</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="policies">
        <Card>
          <CardHeader>
            <CardTitle>Policies</CardTitle>
            <CardDescription>Define guardrails and escalation thresholds (demo).</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Add policy editor here in a later phase.
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>High-level KPIs (demo).</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Charts coming soon.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
