import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const { getClientAgent, updateClientAgent, getTrainingForClient, addTraining, updateTraining, publishTraining, archiveTraining } = useAgent();
  const agent = getClientAgent(clientId);
  const [newTraining, setNewTraining] = useState<{ title: string; type: string; description: string; content: string }>({ title: "", type: "document", description: "", content: "" });

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

  const items = getTrainingForClient(agent.id);
  const inherited = items.filter((t) => t.scope === "master");
  const local = items.filter((t) => t.scope === "client" && t.clientId === agent.id);

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
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="telephony">Telephony</TabsTrigger>
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

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training</CardTitle>
              <CardDescription>Inherited from Master and client-specific overrides.</CardDescription>
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
                    if(!newTraining.title || !newTraining.content) return;
                    addTraining({ scope:"client", clientId: agent.id, title:newTraining.title, type:newTraining.type as any, description:newTraining.description, content:newTraining.content });
                    setNewTraining({ title:"", type:"document", description:"", content:""});
                  }}>Add Client Training</Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Inherited from Master</h3>
                  <div className="mt-2 space-y-2">
                    {inherited.map((t)=>(
                      <div key={t.id} className="border rounded-md p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.title} <span className="text-xs text-muted-foreground">• {t.type.toUpperCase()}</span></div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{(t.versions.find(v=>v.id===t.publishedVersionId) ?? t.versions[t.versions.length-1])?.content}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={()=>addTraining({ scope:"client", clientId: agent.id, title:t.title, type:t.type as any, description:t.description, content:(t.versions.find(v=>v.id===t.publishedVersionId) ?? t.versions[t.versions.length-1])?.content || "" })}>Copy to client</Button>
                        </div>
                      </div>
                    ))}
                    {inherited.length===0 && <p className="text-sm text-muted-foreground">No inherited items.</p>}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">Client Training</h3>
                  <div className="mt-2 space-y-2">
                    {local.map((t)=>(
                      <div key={t.id} className="border rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">{t.title} <span className="text-xs text-muted-foreground">• {t.type.toUpperCase()}</span></div>
                            <div className="text-xs text-muted-foreground">{t.description}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="secondary" onClick={()=>publishTraining(t.id)}>Publish</Button>
                            <Button variant="destructive" onClick={()=>archiveTraining(t.id, true)}>Archive</Button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                          {(t.versions.find(v=>v.id===t.publishedVersionId) ?? t.versions[t.versions.length-1])?.content}
                        </div>
                        <div className="mt-3 grid gap-2">
                          <label className="text-xs text-muted-foreground">New Version Content</label>
                          <Textarea rows={4} placeholder="Enter new version content..." onBlur={(e)=>{ const val=(e.target as HTMLTextAreaElement).value; if(val.trim()){ updateTraining(t.id,{ newContent: val }); (e.target as HTMLTextAreaElement).value=""; } }} />
                        </div>
                      </div>
                    ))}
                    {local.length===0 && <p className="text-sm text-muted-foreground">No client training yet.</p>}
                  </div>
                </div>
              </div>
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

        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>Enable languages for this client agent.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              {(["en","es","nl"] as const).map((code) => (
                <div key={code} className="flex items-center gap-2">
                  <Switch
                    checked={(agent.languages ?? ["en"]).includes(code)}
                    onCheckedChange={(v) => {
                      const current = agent.languages ?? ["en"];
                      const next = v
                        ? Array.from(new Set([...current, code]))
                        : current.filter((c) => c !== code);
                      updateClientAgent(agent.id, { languages: next });
                    }}
                  />
                  <span>{code === "en" ? "English (EN)" : code === "es" ? "Spanish (ES)" : "Dutch (NL)"}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telephony">
          <Card>
            <CardHeader>
              <CardTitle>Telephony</CardTitle>
              <CardDescription>Overrides for this agent only.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm text-muted-foreground">Provider</label>
                <Select
                  value={agent.telephony?.provider ?? "twilio"}
                  onValueChange={(val) =>
                    updateClientAgent(agent.id, {
                      telephony: {
                        ...(agent.telephony ?? { inboundNumbers: [], outboundCallerId: "", ivrEnabled: false, recordingEnabled: true }),
                        provider: val,
                      },
                    })
                  }
                >
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
                <Input
                  value={agent.telephony?.outboundCallerId ?? ""}
                  onChange={(e) =>
                    updateClientAgent(agent.id, {
                      telephony: {
                        ...(agent.telephony ?? { provider: "twilio", inboundNumbers: [], ivrEnabled: false, recordingEnabled: true }),
                        outboundCallerId: e.target.value,
                      },
                    })
                  }
                  placeholder="+1XXXXXXXXXX"
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={agent.telephony?.recordingEnabled ?? true}
                    onCheckedChange={(v) =>
                      updateClientAgent(agent.id, {
                        telephony: {
                          ...(agent.telephony ?? { provider: "twilio", inboundNumbers: [], outboundCallerId: "", ivrEnabled: false }),
                          recordingEnabled: v,
                        },
                      })
                    }
                  />
                  <span>Call Recording</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={agent.telephony?.ivrEnabled ?? false}
                    onCheckedChange={(v) =>
                      updateClientAgent(agent.id, {
                        telephony: {
                          ...(agent.telephony ?? { provider: "twilio", inboundNumbers: [], outboundCallerId: "", recordingEnabled: true }),
                          ivrEnabled: v,
                        },
                      })
                    }
                  />
                  <span>IVR Enabled</span>
                </div>
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
