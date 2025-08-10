import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User } from "lucide-react";
import { AgentProvider, useAgent } from "@/contexts/AgentContext";

// Public-facing Builder Agent chat
export default function BuilderChat() {
  useEffect(() => {
    document.title = "Builder Agent Chat | ConneqtCentral";
    // Meta description
    const desc = "Chat with our Builder Agent to scope your needs—safe, redacted, and fast.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    // Canonical
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
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-4 space-y-6">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Builder Agent Chat</h1>
            <p className="text-muted-foreground">Public-facing assistant for prospects. Shares only redacted, high‑level info upstream.</p>
          </header>
          <BuilderChatInner />
        </section>
      </main>
      <Footer />
    </AgentProvider>
  );
}

export function BuilderChatInner() {
  const { getClientAgent, masterAgent } = useAgent();
  const builder = getClientAgent("builder");

  const allowlistKeys = builder?.privacy?.allowlistKeys ?? [];

  type Cmd = { key: string; title: string; description: string; content: string };
  const commands: Cmd[] = useMemo(() => {
    const b = builder?.name ?? "Builder Agent";
    const allowList = allowlistKeys.length
      ? allowlistKeys.join(", ")
      : "industry, teamSize, callVolume, complexity, coverage, integrations, compliance, selectedServices, companyOverview.summary, companyOverview.keyPoints";
    return [
      {
        key: "intake",
        title: "Start intake",
        description: "Collect high‑level requirements",
        content: `Great—I'll capture only high‑level details to scope your solution.

Quick intake questions:
1) Industry and brief overview
2) Team size and roles interacting with us
3) Estimated monthly call/chat/email volume
4) Channels needed (voice, chat, email, SMS, social)
5) Coverage hours and languages
6) Tools to integrate (CRM, helpdesk, billing, calendar)
7) Compliance needs (HIPAA, SOC 2, GDPR, others)
8) Top 3 goals and success criteria
9) Target timeline (pilot and full roll‑out)
10) Budget range (rough is okay)

Reply to any subset and I'll adapt.`,
      },
      {
        key: "pricing",
        title: "Pricing overview",
        description: "Explain pricing model",
        content: `Here's a high‑level pricing overview (non‑binding):
- Essentials: starting from $499/mo for light volume and core channels
- Growth: from $1,999/mo for multi‑channel, routing, and analytics
- Scale: custom for high volume, SLAs, and advanced workflows
Pricing depends on volume, complexity, compliance, and integrations. After intake, I can estimate a range.`,
      },
      {
        key: "features",
        title: "Capabilities",
        description: "List core capabilities",
        content: `Core capabilities we can bring:
- Omnichannel intake (voice, chat, email, SMS)
- Smart routing, triage, and prioritization
- Appointment scheduling and reminders
- Knowledge + FAQ automation
- Ticketing and CRM updates
- Reporting and live analytics
- Secure redaction and policy controls
Tell me your use case and I'll map features.`,
      },
      {
        key: "integrations",
        title: "Integrations",
        description: "Common integrations",
        content: `Popular integrations we support:
CRM: HubSpot, Salesforce, Pipedrive
Helpdesk: Zendesk, Freshdesk, Intercom
Billing: Stripe, Chargebee
Calendar: Google, Microsoft 365
Other: Webhooks, custom APIs
Share your stack and I'll outline the path.`,
      },
      {
        key: "compliance",
        title: "Compliance",
        description: "Security and compliance",
        content: `Security & compliance:
- Data minimization with on‑by‑default redaction
- HIPAA‑ready configurations (upon request)
- SOC 2–aligned controls and auditing
- Regional data controls and retention policies
- PII masking for emails/phones/URLs in public intake
We design to your standards; tell me your needs.`,
      },
      {
        key: "summary",
        title: "Redacted summary",
        description: "Summarize for handoff",
        content: `Here’s a redacted, high‑level summary to share upstream to ${masterAgent.name}:
- Industry / overview: <filled from conversation>
- Volume & channels: <filled>
- Coverage & languages: <filled>
- Integrations: <filled>
- Compliance: <filled>
- Goals & timeline: <filled>
No emails/phones/URLs are shared. We only include allowlisted fields.`,
      },
      {
        key: "handoff",
        title: "Handoff to Master",
        description: "Explain what’s shared",
        content: `With your OK, I’ll notify ${masterAgent.name} with a minimal, redacted context.
We share only allowlisted keys:
${allowList}
You can say “Proceed with handoff” when ready.`,
      },
      {
        key: "timeline",
        title: "Implementation",
        description: "Typical timeline",
        content: `Typical implementation:
- Week 1: Intake, access, and sandbox
- Weeks 2–3: Workflow setup, integrations, testing
- Week 4: Pilot launch and training
- Week 5+: Iterate, optimize, and scale
We can compress/expand based on urgency.`,
      },
      {
        key: "quote",
        title: "Next steps for quote",
        description: "How to get a quote",
        content: `To prepare a formal quote we’ll need:
- Intake answers (/intake)
- Integration list (/integrations)
- Compliance needs (/compliance)
- Target go‑live date
Once I have this, I’ll generate a range and coordinate next steps.`,
      },
      {
        key: "contact",
        title: "Contact options",
        description: "How to connect",
        content: `Prefer not to share personal info here. You can:
- Ask me to /handoff and I’ll alert the Master Agent with a redacted brief
- Or share a public website/contact page URL (I’ll capture only the domain)`,
      },
    ];
  }, [builder, masterAgent.name, allowlistKeys]);

  const quickCmdKeys = [
    "intake",
    "pricing",
    "features",
    "integrations",
    "compliance",
    "handoff",
    "summary",
  ] as const;

  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([
    {
      id: "greet",
      role: "assistant",
      content:
        builder
          ? `Hi! I'm ${builder.name}. I help scope your needs and pass only safe basics to ${masterAgent.name}. How can I help?`
          : `Hi! I'm your Builder Agent. How can I help?`,
    },
  ]);
  const [input, setInput] = useState("");

  // Recompute greeting if builder loads later
  useEffect(() => {
    if (!builder) return;
    setMessages((prev) =>
      prev[0]?.id === "greet"
        ? [
            {
              id: "greet",
              role: "assistant",
              content: `Hi! I'm ${builder.name}. I help scope your needs and pass only safe basics to ${masterAgent.name}. How can I help?`,
            },
            ...prev.slice(1),
          ]
        : prev
    );
  }, [builder, masterAgent.name]);

const send = () => {
  if (!input.trim()) return;
  const text = input.trim();
  const u = { id: `u-${Date.now()}`, role: "user" as const, content: text };

  // Slash commands
  if (text.startsWith("/")) {
    const key = text.slice(1).split(/\s+/)[0].toLowerCase();
    if (key === "help") {
      const help = `Available commands:\n` +
        commands.map((c) => `/${c.key} — ${c.title}: ${c.description}`).join("\n");
      const a = { id: `a-${Date.now() + 1}`, role: "assistant" as const, content: help };
      setMessages((prev) => [...prev, u, a]);
      setInput("");
      return;
    }
    const cmd = commands.find((c) => c.key === key);
    const a = {
      id: `a-${Date.now() + 1}`,
      role: "assistant" as const,
      content: cmd
        ? cmd.content
        : `I don't recognize that command. Try /help for a list of commands.`,
    };
    setMessages((prev) => [...prev, u, a]);
    setInput("");
    return;
  }

  // Regular free‑text message
  const a = {
    id: `a-${Date.now() + 1}`,
    role: "assistant" as const,
    content: builder
      ? `Got it! I'm ${builder.name}. If you're exploring, try /intake to start scoping, or /help to see everything I can do.`
      : `Got it! Try /intake to start scoping, or /help for available commands.`,
  };
  setMessages((prev) => [...prev, u, a]);
  setInput("");
};

  return (
    <Card className="min-h-[60vh]">
      <CardHeader>
        <CardTitle>Conversation</CardTitle>
        <CardDescription>
          Persona: <span className="text-foreground">{builder?.persona ?? "Prospect scoping assistant"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[48vh] overflow-auto rounded-md border p-4 bg-background space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
              <span className="text-xs text-muted-foreground mr-2">{m.role}</span>
              <span className={`inline-flex items-start gap-2 rounded-md px-3 py-2 max-w-[80%] ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {m.role === "assistant" ? <Bot className="w-4 h-4 mt-0.5 text-primary" /> : <User className="w-4 h-4 mt-0.5" />}
                <span className="whitespace-pre-wrap">{m.content}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground">Quick commands:</span>
            {quickCmdKeys.map((k) => (
              <Button key={k} variant="secondary" size="sm" onClick={() => {
                const cmdText = `/${k}`;
                const u = { id: `u-${Date.now()}`, role: "user" as const, content: cmdText };
                const cmd = commands.find((c) => c.key === k);
                const a = { id: `a-${Date.now() + 1}`, role: "assistant" as const, content: cmd ? cmd.content : "" };
                setMessages((prev) => [...prev, u, a]);
              }}>{`/${k}`}</Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Tip: type /help to see all commands.</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            aria-label="Message the Builder Agent"
          />
          <Button onClick={send}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
