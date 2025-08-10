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
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
export default function MasterAgentSettings() {
  useEffect(() => {
    document.title = "Master Agent Settings | ConneqtCentral";
  }, []);

  return (
    <UserProvider>
      <AgentProvider>
        <DashboardLayout>
          <main className="p-6 space-y-6">
            <header className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Master Agent</h1>
                <p className="text-muted-foreground">Configure the global brain, knowledge, tools, and channels inherited by client agents.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="secondary">
                  <Link to="/ai-agents/console">Open Console</Link>
                </Button>
                <Button asChild>
                  <Link to="/ai-agents/clients">Manage Client Agents</Link>
                </Button>
              </div>
            </header>

            <AgentTabs />
          </main>
        </DashboardLayout>
      </AgentProvider>
    </UserProvider>
  );
}

function AgentTabs() {
  const { masterAgent, updateMasterAgent, getTrainingForMaster, addTraining, updateTraining, publishTraining, archiveTraining, duplicateTraining } = useAgent();
  const [name, setName] = useState(masterAgent.name);
  const [persona, setPersona] = useState(masterAgent.persona);
  const [systemPrompt, setSystemPrompt] = useState(masterAgent.systemPrompt);
  const [chatEnabled, setChatEnabled] = useState(masterAgent.channels.chat);
  const [voiceEnabled, setVoiceEnabled] = useState(masterAgent.channels.voice);
  const [voiceProvider, setVoiceProvider] = useState(masterAgent.voice?.provider ?? "elevenlabs");
  const [voiceId, setVoiceId] = useState(masterAgent.voice?.voiceId ?? "");

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
const { toast } = useToast();
  const [newTraining, setNewTraining] = useState<{ title: string; type: string; description: string; content: string }>({ title: "", type: "document", description: "", content: "" });
const save = () => {
  updateMasterAgent({
    name,
    persona,
    systemPrompt,
    channels: { chat: chatEnabled, voice: voiceEnabled },
    voice: { provider: voiceProvider, voiceId },
  });
  toast({ title: "Master Agent updated", description: "Profile, channels and voice saved." });
};

const saveLanguages = () => {
  updateMasterAgent({ languages });
  toast({ title: "Languages updated", description: languages.join(", ") || "None" });
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
  toast({ title: "Telephony updated", description: `${telProvider.toUpperCase()} • Caller ID ${outboundCallerId || "unset"}` });
};

const saveIntegrations = () => {
  updateMasterAgent({
    integrations: { crm, helpdesk, billing, calendar },
  });
  toast({ title: "Integrations updated", description: [crm||"—",helpdesk||"—",billing||"—",calendar||"—"].join(" • ") });
};

  const masterTraining = getTrainingForMaster();

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
        <TabsTrigger value="training">Training</TabsTrigger>
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

      <TabsContent value="training">
        <Card>
          <CardHeader>
            <CardTitle>Training</CardTitle>
            <CardDescription>Documents, FAQs, SOPs, scripts, call flows and policies used to train the agent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">Title</label>
                <Input value={newTraining.title} onChange={(e)=>setNewTraining({...newTraining,title:e.target.value})}/>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">Type</label>
                <Select value={newTraining.type} onValueChange={(v)=>setNewTraining({...newTraining,type:v})}>
                  <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="sop">SOP</SelectItem>
                    <SelectItem value="script">Script</SelectItem>
                    <SelectItem value="callflow">Call Flow</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="intent">Intent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 grid gap-2">
                <label className="text-sm text-muted-foreground">Description</label>
                <Input value={newTraining.description} onChange={(e)=>setNewTraining({...newTraining,description:e.target.value})}/>
              </div>
              <div className="sm:col-span-2 grid gap-2">
                <label className="text-sm text-muted-foreground">Content</label>
                <Textarea rows={6} value={newTraining.content} onChange={(e)=>setNewTraining({...newTraining,content:e.target.value})}/>
              </div>
              <div className="sm:col-span-2">
                <Button onClick={()=>{
                  if(!newTraining.title || !newTraining.content){ toast({ title: "Please add title and content" }); return; }
                  addTraining({ scope:"master", title:newTraining.title, type:newTraining.type as any, description:newTraining.description, content:newTraining.content });
                  setNewTraining({ title:"", type:"document", description:"", content:""});
                  toast({ title:"Training added", description:"Master training item created."});
                }}>Add Training</Button>
              </div>
            </div>

            <div className="space-y-3">
              {masterTraining.map((t)=>(
                <div key={t.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{t.title} <span className="text-xs text-muted-foreground">• {t.type.toUpperCase()}</span></div>
                      <div className="text-xs text-muted-foreground">{t.description}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={()=>publishTraining(t.id)}>Publish</Button>
                      <Button variant="outline" onClick={()=>duplicateTraining(t.id)}>Duplicate</Button>
                      <Button variant="destructive" onClick={()=>archiveTraining(t.id, true)}>Archive</Button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {(t.versions.find(v=>v.id===t.publishedVersionId) ?? t.versions[t.versions.length-1])?.content}
                  </div>
                  <div className="mt-3 grid gap-2">
                    <label className="text-xs text-muted-foreground">New Version Content</label>
                    <Textarea rows={4} placeholder="Enter new version content..." onBlur={(e)=>{ const val=(e.target as HTMLTextAreaElement).value; if(val.trim()){ updateTraining(t.id,{ newContent: val }); (e.target as HTMLTextAreaElement).value=""; toast({ title:"Draft version added" }); } }} />
                  </div>
                </div>
              ))}
              {masterTraining.length === 0 && <p className="text-sm text-muted-foreground">No training yet.</p>}
            </div>
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
            <CardDescription>Enable or disable chat/voice channels and configure voice.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={chatEnabled} onCheckedChange={setChatEnabled} />
                <span>Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                <span>Voice</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">Voice Provider</label>
                <Select value={voiceProvider} onValueChange={setVoiceProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                    <SelectItem value="azure">Azure TTS</SelectItem>
                    <SelectItem value="gcp">Google Cloud TTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">Voice ID</label>
                <Input value={voiceId} onChange={(e) => setVoiceId(e.target.value)} placeholder="e.g. TX3LPaxmHKxFdv7VOQHJ" />
              </div>
            </div>
            <Button onClick={save}>Save</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="languages">
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>Enable languages for the Master Agent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {["en","es","nl"].map((code) => (
                <div key={code} className="flex items-center gap-2">
                  <Switch
                    checked={languages.includes(code)}
                    onCheckedChange={(v) => {
                      const next = v ? Array.from(new Set([...languages, code])) : languages.filter((c) => c !== code);
                      setLanguages(next);
                    }}
                  />
                  <span>{code === "en" ? "English (EN)" : code === "es" ? "Spanish (ES)" : "Dutch (NL)"}</span>
                </div>
              ))}
            </div>
            <Button onClick={saveLanguages}>Save Languages</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="telephony">
        <Card>
          <CardHeader>
            <CardTitle>Telephony</CardTitle>
            <CardDescription>Configure provider and call options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">Provider</label>
              <Select value={telProvider} onValueChange={setTelProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="vonage">Vonage</SelectItem>
                  <SelectItem value="plivo">Plivo</SelectItem>
                  <SelectItem value="sip">SIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">Outbound Caller ID</label>
              <Input value={outboundCallerId} onChange={(e) => setOutboundCallerId(e.target.value)} placeholder="+1XXXXXXXXXX" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={recordingEnabled} onCheckedChange={setRecordingEnabled} />
                <span>Call Recording</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={ivrEnabled} onCheckedChange={setIvrEnabled} />
                <span>IVR Enabled</span>
              </div>
            </div>
            <Button onClick={saveTelephony}>Save Telephony</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect CRM, Helpdesk, Billing, Calendar.</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">CRM</label>
              <Select value={crm} onValueChange={setCrm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select CRM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="hubspot">HubSpot</SelectItem>
                  <SelectItem value="salesforce">Salesforce</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">Helpdesk</label>
              <Select value={helpdesk} onValueChange={setHelpdesk}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Helpdesk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="zendesk">Zendesk</SelectItem>
                  <SelectItem value="freshdesk">Freshdesk</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">Billing</label>
              <Select value={billing} onValueChange={setBilling}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Billing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="chargebee">Chargebee</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground">Calendar</label>
              <Select value={calendar} onValueChange={setCalendar}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Calendar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="microsoft">Microsoft 365</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Button onClick={saveIntegrations}>Save Integrations</Button>
            </div>
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
